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

  if (material.type === "pdf") {
    return {
      status: "needs-pdf-reader",
      text: "",
      method: "pdf",
    };
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
