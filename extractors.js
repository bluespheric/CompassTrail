async function extractTextFromMaterial(material) {
  if (!material) {
    throw new Error("Material is missing.");
  }

  if (material.type === "text") {
    return {
      status: "ready",
      text: material.text || "",
      method: "pasted-text",
    };
  }

  if (material.type === "document" && material.file) {
    const filename = material.file.name.toLowerCase();

    if (filename.endsWith(".txt")) {
      const text = await material.file.text();

      return {
        status: "ready",
        text,
        method: "plain-text",
      };
    }

    if (filename.endsWith(".docx")) {
      return await extractDocxText(material.file);
    }
  }

  if (material.type === "pdf" && material.file) {
    return await extractPdfText(material.file);
  }

  if (material.type === "photo") {
    return {
      status: "needs-ocr",
      text: "",
      method: "ocr",
    };
  }

  return {
    status: "unsupported",
    text: "",
    method: "unknown",
  };
}

async function extractDocxText(file) {
  if (!window.mammoth) {
    throw new Error("DOCX reader is not available.");
  }

  try {
    const arrayBuffer = await file.arrayBuffer();

    const result = await window.mammoth.extractRawText({
      arrayBuffer,
    });

    const text = (result.value || "").trim();

    if (!text) {
      return {
        status: "empty",
        text: "",
        method: "docx",
        messages: result.messages || [],
      };
    }

    return {
      status: "ready",
      text,
      method: "docx",
      messages: result.messages || [],
    };
  } catch (error) {
    console.error("DOCX extraction failed:", error);

    return {
      status: "error",
      text: "",
      method: "docx",
    };
  }
}

async function extractPdfText(file) {
  if (!window.pdfjsLib) {
    throw new Error("PDF reader is not available.");
  }

  try {
    const arrayBuffer = await file.arrayBuffer();

    const loadingTask = window.pdfjsLib.getDocument({
      data: arrayBuffer,
    });

    const pdf = await loadingTask.promise;

    const pages = [];
    let totalCharacters = 0;

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber += 1
    ) {
      const page = await pdf.getPage(pageNumber);

      const textContent = await page.getTextContent();

      const pageText = buildPageText(textContent.items);

      totalCharacters += pageText.replace(/\s/g, "").length;

      pages.push({
        pageNumber,
        text: pageText,
      });
    }

    const combinedText = pages
      .map((page) => {
        return [
          `--- Page ${page.pageNumber} ---`,
          page.text,
        ].join("\n");
      })
      .join("\n\n")
      .trim();

    if (
      !combinedText ||
      totalCharacters < 20
    ) {
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
    console.error("PDF extraction failed:", error);

    return {
      status: "error",
      text: "",
      method: "pdf",
    };
  }
}

function buildPageText(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  const lines = [];
  let currentLine = [];
  let lastY = null;

  for (const item of items) {
    if (
      !item ||
      typeof item.str !== "string"
    ) {
      continue;
    }

    const text = item.str.trim();

    if (!text) {
      continue;
    }

    const transform = item.transform || [];
    const y = transform[5];

    if (
      lastY !== null &&
      typeof y === "number" &&
      Math.abs(y - lastY) > 4
    ) {
      if (currentLine.length > 0) {
        lines.push(
          currentLine.join(" ")
        );

        currentLine = [];
      }
    }

    currentLine.push(text);

    if (typeof y === "number") {
      lastY = y;
    }

    if (item.hasEOL) {
      if (currentLine.length > 0) {
        lines.push(
          currentLine.join(" ")
        );

        currentLine = [];
      }

      lastY = null;
    }
  }

  if (currentLine.length > 0) {
    lines.push(
      currentLine.join(" ")
    );
  }

  return lines.join("\n").trim();
}
