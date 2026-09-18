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
    }, 20000);

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
    throw new Error("Tesseract is not available.");
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

/*
  options:
  {
    manualCorners: null | [{x,y}, ...],
    useOriginal: false
  }
*/
async function readPhotoText(file, options = {}) {
  const {
    manualCorners = null,
    useOriginal = false,
  } = options;

  const originalUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(originalUrl);

    const prepared = await prepareDocumentImage(
      image,
      manualCorners,
      useOriginal
    );

    const worker = await getOcrWorker();

    const result = await worker.recognize(
      prepared.processedImage
    );

    const text =
      (result.data.text || "").trim();

    return {
      status: text ? "ready" : "empty",
      text,
      method: useOriginal
        ? "photo-ocr-original"
        : "photo-ocr",

      processedImage:
        prepared.processedImage,

      originalImage:
        prepared.originalImage,

      perspectiveCorrected:
        prepared.perspectiveCorrected,

      usedOriginal:
        prepared.usedOriginal,

      detectedCorners:
        prepared.detectedCorners,

      confidence:
        typeof result.data.confidence ===
          "number"
          ? result.data.confidence
          : null,

      originalWidth:
        image.naturalWidth,

      originalHeight:
        image.naturalHeight,
    };
  } catch (error) {
    console.error(
      "Photo OCR failed:",
      error
    );

    return {
      status: "error",
      text: "",
      method: useOriginal
        ? "photo-ocr-original"
        : "photo-ocr",
    };
  } finally {
    URL.revokeObjectURL(originalUrl);
  }
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
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
  });
}

async function prepareDocumentImage(
  image,
  manualCorners = null,
  useOriginal = false
) {
  const cv = await getOpenCv();

  const originalCanvas =
    document.createElement("canvas");

  originalCanvas.width =
    image.naturalWidth;

  originalCanvas.height =
    image.naturalHeight;

  const originalContext =
    originalCanvas.getContext("2d");

  originalContext.drawImage(
    image,
    0,
    0
  );

  const originalImage =
    originalCanvas.toDataURL(
      "image/jpeg",
      0.92
    );

  /*
    IMPORTANT:
    If the learner chooses the original photo,
    do not crop, warp, threshold or straighten it.
    OCR receives the original image.
  */
  if (useOriginal) {
    return {
      originalImage,
      processedImage: originalImage,
      perspectiveCorrected: false,
      usedOriginal: true,
      detectedCorners: [
        { x: 0, y: 0 },
        {
          x: image.naturalWidth,
          y: 0,
        },
        {
          x: image.naturalWidth,
          y: image.naturalHeight,
        },
        {
          x: 0,
          y: image.naturalHeight,
        },
      ],
    };
  }

  const maxDimension = 1800;

  let scale = 1;

  const largestDimension =
    Math.max(
      image.naturalWidth,
      image.naturalHeight
    );

  if (largestDimension > maxDimension) {
    scale =
      maxDimension /
      largestDimension;
  }

  const workingCanvas =
    document.createElement("canvas");

  workingCanvas.width =
    Math.max(
      1,
      Math.round(
        image.naturalWidth * scale
      )
    );

  workingCanvas.height =
    Math.max(
      1,
      Math.round(
        image.naturalHeight * scale
      )
    );

  const workingContext =
    workingCanvas.getContext("2d");

  workingContext.drawImage(
    image,
    0,
    0,
    workingCanvas.width,
    workingCanvas.height
  );

  const src =
    cv.imread(workingCanvas);

  try {
    let corners = null;

    if (manualCorners) {
      corners =
        manualCorners.map(
          (point) => ({
            x: point.x * scale,
            y: point.y * scale,
          })
        );
    } else {
      corners =
        detectDocumentCorners(
          cv,
          src
        );
    }

    if (
      corners &&
      corners.length === 4
    ) {
      const warped =
        warpDocument(
          cv,
          src,
          corners
        );

      try {
        const processedImage =
          enhanceImageForOcr(
            cv,
            warped
          );

        return {
          originalImage,
          processedImage,
          perspectiveCorrected: true,
          usedOriginal: false,

          detectedCorners:
            corners.map(
              (point) => ({
                x: point.x / scale,
                y: point.y / scale,
              })
            ),
        };
      } finally {
        warped.delete();
      }
    }

    return {
      originalImage,

      processedImage:
        enhanceImageForOcr(
          cv,
          src
        ),

      perspectiveCorrected: false,
      usedOriginal: false,

      detectedCorners: [
        { x: 0, y: 0 },
        {
          x: image.naturalWidth,
          y: 0,
        },
        {
          x: image.naturalWidth,
          y: image.naturalHeight,
        },
        {
          x: 0,
          y: image.naturalHeight,
        },
      ],
    };
  } finally {
    src.delete();
  }
}

function detectDocumentCorners(
  cv,
  source
) {
  const gray = new cv.Mat();
  const blurred = new cv.Mat();
  const edges = new cv.Mat();
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  try {
    cv.cvtColor(
      source,
      gray,
      cv.COLOR_RGBA2GRAY
    );

    cv.GaussianBlur(
      gray,
      blurred,
      new cv.Size(5, 5),
      0
    );

    cv.Canny(
      blurred,
      edges,
      50,
      160
    );

    cv.findContours(
      edges,
      contours,
      hierarchy,
      cv.RETR_LIST,
      cv.CHAIN_APPROX_SIMPLE
    );

    let bestPoints = null;
    let bestArea = 0;

    const minimumArea =
      source.rows *
      source.cols *
      0.12;

    for (
      let index = 0;
      index < contours.size();
      index += 1
    ) {
      const contour =
        contours.get(index);

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
        bestArea = area;

        bestPoints =
          extractContourPoints(
            approx
          );
      }

      approx.delete();
      contour.delete();
    }

    if (
      !bestPoints ||
      bestPoints.length !== 4
    ) {
      return null;
    }

    return orderPoints(
      bestPoints
    );
  } finally {
    gray.delete();
    blurred.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();
  }
}

function orderPoints(points) {
  if (
    !Array.isArray(points) ||
    points.length !== 4
  ) {
    return points;
  }

  // Return: top-left, top-right,
  // bottom-right, bottom-left.
  // Sum/difference ordering is more stable than
  // splitting only by Y when a page is strongly skewed.
  const bySum =
    [...points].sort(
      (a, b) =>
        (a.x + a.y) -
        (b.x + b.y)
    );

  const topLeft =
    bySum[0];

  const bottomRight =
    bySum[bySum.length - 1];

  const remaining =
    points.filter(
      (point) =>
        point !== topLeft &&
        point !== bottomRight
    );

  remaining.sort(
    (a, b) =>
      (a.y - a.x) -
      (b.y - b.x)
  );

  const topRight =
    remaining[0];

  const bottomLeft =
    remaining[1];

  return [
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
  ];
}

function warpDocument(
  cv,
  source,
  corners
) {
  const [
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
  ] = corners;

  const widthTop =
    distance(
      topLeft,
      topRight
    );

  const widthBottom =
    distance(
      bottomLeft,
      bottomRight
    );

  const heightLeft =
    distance(
      topLeft,
      bottomLeft
    );

  const heightRight =
    distance(
      topRight,
      bottomRight
    );

  const width =
    Math.max(
      1,
      Math.round(
        Math.max(
          widthTop,
          widthBottom
        )
      )
    );

  const height =
    Math.max(
      1,
      Math.round(
        Math.max(
          heightLeft,
          heightRight
        )
      )
    );

  const sourcePoints =
    cv.matFromArray(
      4,
      1,
      cv.CV_32FC2,
      [
        topLeft.x,
        topLeft.y,

        topRight.x,
        topRight.y,

        bottomRight.x,
        bottomRight.y,

        bottomLeft.x,
        bottomLeft.y,
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

  const transform =
    cv.getPerspectiveTransform(
      sourcePoints,
      destinationPoints
    );

  const output =
    new cv.Mat();

  cv.warpPerspective(
    source,
    output,
    transform,
    new cv.Size(
      width,
      height
    ),
    cv.INTER_LINEAR,
    cv.BORDER_CONSTANT,
    new cv.Scalar(
      255,
      255,
      255,
      255
    )
  );

  sourcePoints.delete();
  destinationPoints.delete();
  transform.delete();

  return output;
}

function enhanceImageForOcr(
  cv,
  source
) {
  const gray = new cv.Mat();
  const output = new cv.Mat();

  const canvas =
    document.createElement(
      "canvas"
    );

  try {
    if (
      source.channels() === 4
    ) {
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
      output,
      255,
      cv.ADAPTIVE_THRESH_GAUSSIAN_C,
      cv.THRESH_BINARY,
      31,
      13
    );

    cv.imshow(
      canvas,
      output
    );

    return canvas.toDataURL(
      "image/png"
    );
  } finally {
    gray.delete();
    output.delete();
  }
}

function extractContourPoints(
  contour
) {
  const points = [];

  for (
    let index = 0;
    index <
    contour.data32S.length;
    index += 2
  ) {
    points.push({
      x:
        contour.data32S[
          index
        ],

      y:
        contour.data32S[
          index + 1
        ],
    });
  }

  return points;
}

function distance(a, b) {
  return Math.hypot(
    b.x - a.x,
    b.y - a.y
  );
}

window.addEventListener(
  "pagehide",
  () => {
    if (ocrWorker) {
      try {
        ocrWorker.terminate();
      } catch (error) {
        console.warn(
          "OCR worker could not be closed cleanly.",
          error
        );
      }

      ocrWorker = null;
    }
  }
);

