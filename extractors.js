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
      return {
        status: "needs-docx-reader",
        text: "",
        method: "docx",
      };
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
