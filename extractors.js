// Compass Trail — material text extractors
// Local/browser-side extraction only.
// Learners always review/edit extracted text before it is used.

async function extractTextFromMaterial(material) {
  if (!material) {
    throw new Error("Material is missing.");
  }

  // Pasted text
  if (material.type === "text") {
    return {
      status: (material.text || "").trim()
        ? "ready"
        : "empty",
      text: material.text || "",
      method: "pasted-text",
    };
  }

  // TXT and DOCX
  if (
    material.type === "document" &&
    material.file
  ) {
    const filename =
      material.file.name.toLowerCase();

    if (filename.endsWith(".txt")) {
      try {
        const text =
          await material.file.text();

        return {
          status: text.trim()
            ? "ready"
            : "empty",
          text,
          method: "plain-text",
        };
      } catch (error) {
        console.error(
          "TXT extraction failed:",
          error
        );

        return {
          status: "error",
          text: "",
          method: "plain-text",
        };
      }
    }

    if (filename.endsWith(".docx")) {
      return await extractDocxText(
        material.file
      );
    }
  }

  // PDF text layer. Image-only/scanned PDFs return needs-ocr
  // so app.js can offer the explicit scanned-PDF OCR path.
  if (
    material.type === "pdf" &&
    material.file
  ) {
    return await extractPdfText(
      material.file
    );
  }

  // Photo OCR + perspective preparation.
  if (
    material.type === "photo" &&
    material.file
  ) {
    if (
      typeof readPhotoText !==
      "function"
    ) {
      console.error(
        "readPhotoText is not available. Check image-reader.js."
      );

      return {
        status: "error",
        text: "",
        method: "photo-ocr",
      };
    }

    try {
      return await readPhotoText(
        material.file
      );
    } catch (error) {
      console.error(
        "Photo extraction failed:",
        error
      );

      return {
        status: "error",
        text: "",
        method: "photo-ocr",
      };
    }
  }

  return {
    status: "unsupported",
    text: "",
    method: "unknown",
  };
}

async function extractDocxText(file) {
  if (!window.mammoth) {
    throw new Error(
      "DOCX reader is not available."
    );
  }

  try {
    const arrayBuffer =
      await file.arrayBuffer();

    const result =
      await window.mammoth.extractRawText({
        arrayBuffer,
      });

    const text =
      (result.value || "").trim();

    if (!text) {
      return {
        status: "empty",
        text: "",
        method: "docx",
        messages:
          result.messages || [],
      };
    }

    return {
      status: "ready",
      text,
      method: "docx",
      messages:
        result.messages || [],
    };
  } catch (error) {
    console.error(
      "DOCX extraction failed:",
      error
    );

    return {
      status: "error",
      text: "",
      method: "docx",
    };
  }
}

async function extractPdfText(file) {
  if (
    !window.pdfjsLib ||
    typeof window.pdfjsLib.getDocument !==
      "function"
  ) {
    throw new Error(
      "PDF reader is not available."
    );
  }

  try {
    const arrayBuffer =
      await file.arrayBuffer();

    const loadingTask =
      window.pdfjsLib.getDocument({
        data:
          new Uint8Array(
            arrayBuffer
          ),
      });

    const pdf =
      await loadingTask.promise;

    const pages = [];
    let totalCharacters = 0;

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber += 1
    ) {
      const page =
        await pdf.getPage(
          pageNumber
        );

      const textContent =
        await page.getTextContent();

      const pageText =
        buildPageText(
          textContent.items
        );

      totalCharacters +=
        pageText
          .replace(/\s/g, "")
          .length;

      pages.push({
        pageNumber,
        text: pageText,
      });
    }

    const combinedText =
      pages
        .map(
          (page) => [
            `--- Page ${page.pageNumber} ---`,
            page.text,
          ].join("\n")
        )
        .join("\n\n")
        .trim();

    // A scanned PDF can contain a few stray text-layer characters.
    // Very small totals are therefore treated as image-only.
    if (totalCharacters < 12) {
      return {
        status: "needs-ocr",
        text: combinedText,
        method: "pdf-scan",
        pageCount: pdf.numPages,
      };
    }

    return {
      status: "ready",
      text: combinedText,
      method: "pdf-text-layer",
      pageCount: pdf.numPages,
    };
  } catch (error) {
    console.error(
      "PDF extraction failed:",
      error
    );

    return {
      status: "error",
      text: "",
      method: "pdf",
    };
  }
}

function buildPageText(items) {
  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return "";
  }

  const lines = [];
  let currentLine = [];
  let lastY = null;

  for (const item of items) {
    if (
      !item ||
      typeof item.str !==
        "string"
    ) {
      continue;
    }

    const text =
      item.str.trim();

    if (!text) {
      continue;
    }

    const transform =
      item.transform || [];

    const y =
      transform[5];

    if (
      lastY !== null &&
      typeof y === "number" &&
      Math.abs(y - lastY) > 4
    ) {
      if (
        currentLine.length > 0
      ) {
        lines.push(
          currentLine.join(" ")
        );

        currentLine = [];
      }
    }

    currentLine.push(text);

    if (
      typeof y === "number"
    ) {
      lastY = y;
    }

    if (item.hasEOL) {
      if (
        currentLine.length > 0
      ) {
        lines.push(
          currentLine.join(" ")
        );

        currentLine = [];
      }

      lastY = null;
    }
  }

  if (
    currentLine.length > 0
  ) {
    lines.push(
      currentLine.join(" ")
    );
  }

  return lines
    .join("\n")
    .trim();
}
