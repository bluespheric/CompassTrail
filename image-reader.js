let ocrWorker = null;

async function getOpenCv() {
  if (!window.cv) {
    throw new Error("OpenCV is not available.");
  }

  let cv = window.cv;

  if (cv instanceof Promise) {
    cv = await cv;
    window.cv = cv;
  }

  if (cv.Mat) {
    return cv;
  }

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("OpenCV loading timed out."));
    }, 15000);

    cv.onRuntimeInitialized = () => {
      clearTimeout(timeout);
      resolve();
    };
  });

  return window.cv;
}

async function getOcrWorker() {
  if (ocrWorker) {
    return ocrWorker;
  }

  if (!window.Tesseract) {
    throw new Error("OCR reader is not available.");
  }

  ocrWorker = await window.Tesseract.createWorker(
    ["eng", "tur"],
    1,
    {
      logger: (message) => {
        console.log("OCR:", message);
      },
    }
  );

  return ocrWorker;
}

async function readPhotoText(file) {
  const originalUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(originalUrl);

    const corrected = await prepareDocumentImage(image);

    const worker = await getOcrWorker();

    const result = await worker.recognize(
      corrected.dataUrl
    );

    const text = (
      result.data.text || ""
    ).trim();

    if (!text) {
      return {
        status: "empty",
        text: "",
        method: "photo-ocr",
        perspectiveCorrected:
          corrected.perspectiveCorrected,
        processedImage:
          corrected.dataUrl,
      };
    }

    return {
      status: "ready",
      text,
      method: "photo-ocr",
      perspectiveCorrected:
        corrected.perspectiveCorrected,
      processedImage:
        corrected.dataUrl,
    };
  } finally {
    URL.revokeObjectURL(originalUrl);
  }
}

function loadImage(url) {
  return new Promise(
    (resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        resolve(image);
      };

      image.onerror = () => {
        reject(
          new Error(
            "Image could not be loaded."
          )
        );
      };

      image.src = url;
    }
  );
}

async function prepareDocumentImage(image) {
  const cv = await getOpenCv();

  const sourceCanvas =
    document.createElement("canvas");

  sourceCanvas.width =
    image.naturalWidth;

  sourceCanvas.height =
    image.naturalHeight;

  const sourceContext =
    sourceCanvas.getContext("2d");

  sourceContext.drawImage(
    image,
    0,
    0
  );

  const maxDimension = 1800;

  let scale = 1;

  if (
    Math.max(
      sourceCanvas.width,
      sourceCanvas.height
    ) > maxDimension
  ) {
    scale =
      maxDimension /
      Math.max(
        sourceCanvas.width,
        sourceCanvas.height
      );
  }

  const workingCanvas =
    document.createElement("canvas");

  workingCanvas.width =
    Math.round(
      sourceCanvas.width * scale
    );

  workingCanvas.height =
    Math.round(
      sourceCanvas.height * scale
    );

  const workingContext =
    workingCanvas.getContext("2d");

  workingContext.drawImage(
    sourceCanvas,
    0,
    0,
    workingCanvas.width,
    workingCanvas.height
  );

  const src =
    cv.imread(workingCanvas);

  const gray = new cv.Mat();
  const blurred = new cv.Mat();
  const edges = new cv.Mat();
  const contours =
    new cv.MatVector();
  const hierarchy =
    new cv.Mat();

  let warped = null;

  try {
    cv.cvtColor(
      src,
      gray,
      cv.COLOR_RGBA2GRAY
    );

    cv.GaussianBlur(
      gray,
      blurred,
      new cv.Size(5, 5),
      0,
      0,
      cv.BORDER_DEFAULT
    );

    cv.Canny(
      blurred,
      edges,
      60,
      180
    );

    cv.findContours(
      edges,
      contours,
      hierarchy,
      cv.RETR_LIST,
      cv.CHAIN_APPROX_SIMPLE
    );

    let bestContour = null;
    let bestArea = 0;

    const minimumArea =
      src.rows *
      src.cols *
      0.15;

    for (
      let i = 0;
      i < contours.size();
      i += 1
    ) {
      const contour =
        contours.get(i);

      const perimeter =
        cv.arcLength(
          contour,
          true
        );

      const approx =
        new cv.Mat();

      cv.approxPolyDP(
        contour,
        approx,
        0.02 * perimeter,
        true
      );

      const area =
        Math.abs(
          cv.contourArea(
            contour
          )
        );

      if (
        approx.rows === 4 &&
        area > minimumArea &&
        area > bestArea
      ) {
        if (bestContour) {
          bestContour.delete();
        }

        bestContour =
          approx.clone();

        bestArea = area;
      }

      approx.delete();
      contour.delete();
    }

    if (!bestContour) {
      return enhanceForOcr(
        cv,
        src,
        false
      );
    }

    const points =
      extractContourPoints(
        bestContour
      );

    bestContour.delete();

    const ordered =
      orderPoints(points);

    const topWidth =
      distance(
        ordered.topLeft,
        ordered.topRight
      );

    const bottomWidth =
      distance(
        ordered.bottomLeft,
        ordered.bottomRight
      );

    const leftHeight =
      distance(
        ordered.topLeft,
        ordered.bottomLeft
      );

    const rightHeight =
      distance(
        ordered.topRight,
        ordered.bottomRight
      );

    const width = Math.max(
      1,
      Math.round(
        Math.max(
          topWidth,
          bottomWidth
        )
      )
    );

    const height = Math.max(
      1,
      Math.round(
        Math.max(
          leftHeight,
          rightHeight
        )
      )
    );

    const sourcePoints =
      cv.matFromArray(
        4,
        1,
        cv.CV_32FC2,
        [
          ordered.topLeft.x,
          ordered.topLeft.y,

          ordered.topRight.x,
          ordered.topRight.y,

          ordered.bottomRight.x,
          ordered.bottomRight.y,

          ordered.bottomLeft.x,
          ordered.bottomLeft.y,
        ]
      );

    const destinationPoints =
      cv.matFromArray(
        4,
        1,
        cv.CV_32FC2,
        [
          0,
          0,

          width - 1,
          0,

          width - 1,
          height - 1,

          0,
          height - 1,
        ]
      );

    const matrix =
      cv.getPerspectiveTransform(
        sourcePoints,
        destinationPoints
      );

    warped =
      new cv.Mat();

    cv.warpPerspective(
      src,
      warped,
      matrix,
      new cv.Size(
        width,
        height
      ),
      cv.INTER_LINEAR,
      cv.BORDER_CONSTANT,
      new cv.Scalar()
    );

    sourcePoints.delete();
    destinationPoints.delete();
    matrix.delete();

    return enhanceForOcr(
      cv,
      warped,
      true
    );
  } finally {
    src.delete();
    gray.delete();
    blurred.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();

    if (warped) {
      warped.delete();
    }
  }
}

function enhanceForOcr(
  cv,
  source,
  perspectiveCorrected
) {
  const gray =
    new cv.Mat();

  const cleaned =
    new cv.Mat();

  const outputCanvas =
    document.createElement(
      "canvas"
    );

  try {
    if (source.channels() === 4) {
      cv.cvtColor(
        source,
        gray,
        cv.COLOR_RGBA2GRAY
      );
    } else if (
      source.channels() === 3
    ) {
      cv.cvtColor(
        source,
        gray,
        cv.COLOR_RGB2GRAY
      );
    } else {
      source.copyTo(gray);
    }

    cv.adaptiveThreshold(
      gray,
      cleaned,
      255,
      cv.ADAPTIVE_THRESH_GAUSSIAN_C,
      cv.THRESH_BINARY,
      31,
      15
    );

    cv.imshow(
      outputCanvas,
      cleaned
    );

    return {
      dataUrl:
        outputCanvas.toDataURL(
          "image/png"
        ),

      perspectiveCorrected,
    };
  } finally {
    gray.delete();
    cleaned.delete();
  }
}

function extractContourPoints(
  contour
) {
  const points = [];

  for (
    let i = 0;
    i < contour.data32S.length;
    i += 2
  ) {
    points.push({
      x:
        contour.data32S[i],
      y:
        contour.data32S[
          i + 1
        ],
    });
  }

  return points;
}

function orderPoints(points) {
  const sum = (point) =>
    point.x + point.y;

  const difference = (point) =>
    point.y - point.x;

  const topLeft =
    points.reduce(
      (best, point) =>
        sum(point) <
        sum(best)
          ? point
          : best
    );

  const bottomRight =
    points.reduce(
      (best, point) =>
        sum(point) >
        sum(best)
          ? point
          : best
    );

  const topRight =
    points.reduce(
      (best, point) =>
        difference(point) <
        difference(best)
          ? point
          : best
    );

  const bottomLeft =
    points.reduce(
      (best, point) =>
        difference(point) >
        difference(best)
          ? point
          : best
    );

  return {
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
  };
}

function distance(a, b) {
  return Math.sqrt(
    Math.pow(
      b.x - a.x,
      2
    ) +
      Math.pow(
        b.y - a.y,
        2
      )
  );
}
