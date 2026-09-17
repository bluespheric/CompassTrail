const beginJourneyButtons = [
  ...document.querySelectorAll(".primary-button"),
  ...document.querySelectorAll(".home-card button"),
];

beginJourneyButtons.forEach((button) => {
  const label = button.textContent.trim();

  if (
    label === "Begin My Journey" ||
    label === "Create a Journey"
  ) {
    button.addEventListener(
      "click",
      showJourneyStartScreen
    );
  }
});

const materialBasket = [];

let lastRemovedMaterial = null;
let lastRemovedIndex = null;

function showJourneyStartScreen() {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="journey-start-title">
      <p class="eyebrow">Begin My Journey</p>

      <h2 id="journey-start-title">
        What are you bringing with you?
      </h2>

      <p class="hero-text">
        Start with whatever you already need to learn, finish,
        understand or organise.
      </p>

      <div class="home-grid journey-start-grid">
        ${journeyOption(
          "✍️",
          "Write It Myself",
          "Tell Compass Trail what you need to work on.",
          "write"
        )}

        ${journeyOption(
          "📷",
          "Add Photos",
          "Bring one or more photos of worksheets, notes or pages.",
          "photo"
        )}

        ${journeyOption(
          "📄",
          "Add PDFs",
          "Bring one or more PDF files into your Material Basket.",
          "pdf"
        )}

        ${journeyOption(
          "🗂️",
          "Add Documents",
          "Bring documents such as DOCX or TXT files.",
          "document"
        )}

        ${journeyOption(
          "📋",
          "Paste Text",
          "Paste instructions, notes or learning material.",
          "paste"
        )}

        ${journeyOption(
          "🧺",
          "Build My Material Basket",
          "Mix photos, PDFs, documents and text in one Journey.",
          "mixed"
        )}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="back-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById("back-home-button")
    .addEventListener("click", () => {
      window.location.reload();
    });

  document
    .querySelectorAll(".journey-option")
    .forEach((option) => {
      option.addEventListener("click", () => {
        showMaterialBasket(
          option.dataset.journeyInput
        );
      });
    });
}

function journeyOption(
  icon,
  title,
  description,
  type
) {
  return `
    <button
      class="home-card journey-option"
      data-journey-input="${type}"
    >
      <span
        class="card-icon"
        aria-hidden="true"
      >
        ${icon}
      </span>

      <h3>${title}</h3>

      <p>${description}</p>
    </button>
  `;
}

function showMaterialBasket(
  selectedType = "mixed"
) {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="material-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          My Material Basket
        </p>

        <h2 id="material-title">
          Bring everything you need.
        </h2>

        <p class="hero-text">
          Add one thing or mix different materials together.
          You can change your basket later.
        </p>
      </div>

      <section
        class="material-actions"
        aria-label="Add learning material"
      >
        ${materialAction(
          "📷",
          "Add Photos",
          "JPG, PNG or WebP",
          "add-photo-button"
        )}

        ${materialAction(
          "📄",
          "Add PDFs",
          "PDF files",
          "add-pdf-button"
        )}

        ${materialAction(
          "🗂️",
          "Add Documents",
          "DOCX or TXT",
          "add-document-button"
        )}

        ${materialAction(
          "📋",
          "Paste Text",
          "Instructions or notes",
          "paste-text-button"
        )}
      </section>

      <input
        type="file"
        id="photo-input"
        accept="image/jpeg,image/png,image/webp"
        multiple
        hidden
      />

      <input
        type="file"
        id="pdf-input"
        accept="application/pdf"
        multiple
        hidden
      />

      <input
        type="file"
        id="document-input"
        accept=".docx,.txt,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        multiple
        hidden
      />

      <section
        class="basket-section"
        aria-labelledby="basket-title"
      >
        <div class="basket-header">
          <div>
            <p class="eyebrow">
              Your Basket
            </p>

            <h3 id="basket-title">
              Materials
            </h3>
          </div>

          <span
            id="material-count"
            class="material-count"
          >
            0 items
          </span>
        </div>

        <div id="undo-area"></div>

        <div
          id="material-list"
          class="material-list"
        ></div>

        <div
          id="empty-basket"
          class="empty-basket"
        >
          <span aria-hidden="true">
            🧺
          </span>

          <h4>
            Your basket is empty.
          </h4>

          <p>
            Add a photo, PDF, document or some text
            when you're ready.
          </p>
        </div>
      </section>

      <div
        class="hero-actions basket-navigation"
      >
        <button
          type="button"
          class="secondary-button"
          id="back-choice-button"
        >
          Back
        </button>

        <button
          type="button"
          class="primary-button"
          id="build-path-button"
        >
          Build My Path
        </button>
      </div>
    </section>
  `;

  connectMaterialBasketEvents();
  renderMaterialBasket();

  if (selectedType === "photo") {
    document
      .getElementById("photo-input")
      .click();
  }

  if (selectedType === "pdf") {
    document
      .getElementById("pdf-input")
      .click();
  }

  if (selectedType === "document") {
    document
      .getElementById("document-input")
      .click();
  }

  if (
    selectedType === "paste" ||
    selectedType === "write"
  ) {
    showPasteTextPanel();
  }
}

function materialAction(
  icon,
  title,
  subtitle,
  id
) {
  return `
    <button
      type="button"
      class="material-action"
      id="${id}"
    >
      <span aria-hidden="true">
        ${icon}
      </span>

      <strong>
        ${title}
      </strong>

      <span>
        ${subtitle}
      </span>
    </button>
  `;
}

function connectMaterialBasketEvents() {
  const photoInput =
    document.getElementById("photo-input");

  const pdfInput =
    document.getElementById("pdf-input");

  const documentInput =
    document.getElementById("document-input");

  document
    .getElementById("add-photo-button")
    .addEventListener(
      "click",
      () => photoInput.click()
    );

  document
    .getElementById("add-pdf-button")
    .addEventListener(
      "click",
      () => pdfInput.click()
    );

  document
    .getElementById("add-document-button")
    .addEventListener(
      "click",
      () => documentInput.click()
    );

  document
    .getElementById("paste-text-button")
    .addEventListener(
      "click",
      showPasteTextPanel
    );

  photoInput.addEventListener(
    "change",
    (event) => {
      addFilesToBasket(
        event.target.files,
        "photo"
      );

      event.target.value = "";
    }
  );

  pdfInput.addEventListener(
    "change",
    (event) => {
      addFilesToBasket(
        event.target.files,
        "pdf"
      );

      event.target.value = "";
    }
  );

  documentInput.addEventListener(
    "change",
    (event) => {
      addFilesToBasket(
        event.target.files,
        "document"
      );

      event.target.value = "";
    }
  );

  document
    .getElementById("back-choice-button")
    .addEventListener(
      "click",
      showJourneyStartScreen
    );

  document
    .getElementById("build-path-button")
    .addEventListener(
      "click",
      showPathPreview
    );
}

function addFilesToBasket(
  fileList,
  type
) {
  [...fileList].forEach((file) => {
    materialBasket.push({
      id: crypto.randomUUID(),
      type,
      name: file.name,
      size: file.size,
      file,

      previewUrl:
        type === "photo"
          ? URL.createObjectURL(file)
          : null,

      extractedText: "",
      extractionStatus: "not-reviewed",
      photoResult: null,
    });
  });

  renderMaterialBasket();
}

function showPasteTextPanel() {
  const existingPanel =
    document.getElementById(
      "paste-text-panel"
    );

  if (existingPanel) {
    existingPanel
      .querySelector("textarea")
      .focus();

    return;
  }

  const basketSection =
    document.querySelector(
      ".basket-section"
    );

  const panel =
    document.createElement("section");

  panel.id = "paste-text-panel";
  panel.className = "paste-text-panel";

  panel.innerHTML = `
    <label for="pasted-material">
      <strong>
        Paste your text
      </strong>

      <span>
        Add instructions, notes or any text
        you want to use in this Journey.
      </span>
    </label>

    <textarea
      id="pasted-material"
      rows="8"
      placeholder="Paste or write your text here..."
    ></textarea>

    <div class="paste-actions">
      <button
        type="button"
        class="secondary-button"
        id="cancel-paste-button"
      >
        Cancel
      </button>

      <button
        type="button"
        class="primary-button"
        id="save-paste-button"
      >
        Add to Basket
      </button>
    </div>
  `;

  basketSection.before(panel);

  document
    .getElementById("cancel-paste-button")
    .addEventListener(
      "click",
      () => panel.remove()
    );

  document
    .getElementById("save-paste-button")
    .addEventListener(
      "click",
      () => {
        const textarea =
          document.getElementById(
            "pasted-material"
          );

        const text =
          textarea.value.trim();

        if (!text) {
          textarea.focus();
          return;
        }

        materialBasket.push({
          id: crypto.randomUUID(),
          type: "text",
          name: createTextMaterialName(text),
          text,
          extractedText: text,
          extractionStatus: "not-reviewed",
        });

        panel.remove();
        renderMaterialBasket();
      }
    );

  document
    .getElementById("pasted-material")
    .focus();
}

function createTextMaterialName(text) {
  const firstLine =
    text
      .split("\n")[0]
      .trim();

  const shortened =
    firstLine.slice(0, 45);

  if (!shortened) {
    return "Pasted text";
  }

  return shortened.length <
    firstLine.length
    ? `${shortened}…`
    : shortened;
}

function renderMaterialBasket() {
  const list =
    document.getElementById(
      "material-list"
    );

  const emptyBasket =
    document.getElementById(
      "empty-basket"
    );

  const count =
    document.getElementById(
      "material-count"
    );

  const buildButton =
    document.getElementById(
      "build-path-button"
    );

  if (
    !list ||
    !emptyBasket ||
    !count ||
    !buildButton
  ) {
    return;
  }

  count.textContent =
    `${materialBasket.length} ${
      materialBasket.length === 1
        ? "item"
        : "items"
    }`;

  buildButton.disabled =
    materialBasket.length === 0;

  if (
    materialBasket.length === 0
  ) {
    list.innerHTML = "";
    emptyBasket.hidden = false;

    renderUndoArea();
    return;
  }

  emptyBasket.hidden = true;

  list.innerHTML =
    materialBasket
      .map(
        (material, index) => {
          const reviewStatus =
            material.extractionStatus ===
            "confirmed"
              ? `
                <span class="material-reviewed">
                  ✓ Text checked
                </span>
              `
              : "";

          return `
            <article class="material-card">
              <div
                class="material-card-icon"
                aria-hidden="true"
              >
                ${getMaterialIcon(
                  material.type
                )}
              </div>

              <div class="material-card-content">
                <p class="material-position">
                  Material ${index + 1}
                </p>

                <h4>
                  ${escapeHtml(
                    material.name
                  )}
                </h4>

                <p>
                  ${getMaterialDescription(
                    material
                  )}
                </p>

                ${reviewStatus}

                <div class="material-card-actions">
                  <button
                    type="button"
                    class="small-action-button review-material-button"
                    data-material-id="${material.id}"
                  >
                    Review Text
                  </button>

                  <button
                    type="button"
                    class="small-action-button preview-material-button"
                    data-material-id="${material.id}"
                  >
                    Preview
                  </button>

                  <button
                    type="button"
                    class="small-action-button rename-material-button"
                    data-material-id="${material.id}"
                  >
                    Rename
                  </button>

                  <button
                    type="button"
                    class="small-action-button move-up-button"
                    data-material-id="${material.id}"
                    ${
                      index === 0
                        ? "disabled"
                        : ""
                    }
                  >
                    Move Up
                  </button>

                  <button
                    type="button"
                    class="small-action-button move-down-button"
                    data-material-id="${material.id}"
                    ${
                      index ===
                      materialBasket.length - 1
                        ? "disabled"
                        : ""
                    }
                  >
                    Move Down
                  </button>

                  <button
                    type="button"
                    class="small-action-button remove-material-button"
                    data-material-id="${material.id}"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          `;
        }
      )
      .join("");

  connectMaterialCardEvents();
  renderUndoArea();
}

function connectMaterialCardEvents() {
  document
    .querySelectorAll(
      ".review-material-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          reviewMaterialText(
            button.dataset.materialId
          );
        }
      );
    });

  document
    .querySelectorAll(
      ".preview-material-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          previewMaterial(
            button.dataset.materialId
          );
        }
      );
    });

  document
    .querySelectorAll(
      ".rename-material-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          renameMaterial(
            button.dataset.materialId
          );
        }
      );
    });

  document
    .querySelectorAll(
      ".move-up-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          moveMaterial(
            button.dataset.materialId,
            -1
          );
        }
      );
    });

  document
    .querySelectorAll(
      ".move-down-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          moveMaterial(
            button.dataset.materialId,
            1
          );
        }
      );
    });

  document
    .querySelectorAll(
      ".remove-material-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          removeMaterial(
            button.dataset.materialId
          );
        }
      );
    });
}

function renameMaterial(materialId) {
  const material =
    materialBasket.find(
      (item) =>
        item.id === materialId
    );

  if (!material) {
    return;
  }

  const newName =
    window.prompt(
      "Choose a new name for this material:",
      material.name
    );

  if (newName === null) {
    return;
  }

  const cleanedName =
    newName.trim();

  if (!cleanedName) {
    return;
  }

  material.name =
    cleanedName.slice(0, 120);

  renderMaterialBasket();
}

function moveMaterial(
  materialId,
  direction
) {
  const currentIndex =
    materialBasket.findIndex(
      (item) =>
        item.id === materialId
    );

  if (currentIndex === -1) {
    return;
  }

  const newIndex =
    currentIndex + direction;

  if (
    newIndex < 0 ||
    newIndex >= materialBasket.length
  ) {
    return;
  }

  const [material] =
    materialBasket.splice(
      currentIndex,
      1
    );

  materialBasket.splice(
    newIndex,
    0,
    material
  );

  renderMaterialBasket();
}

function removeMaterial(materialId) {
  const index =
    materialBasket.findIndex(
      (material) =>
        material.id === materialId
    );

  if (index === -1) {
    return;
  }

  lastRemovedMaterial =
    materialBasket[index];

  lastRemovedIndex = index;

  materialBasket.splice(
    index,
    1
  );

  renderMaterialBasket();
}

function renderUndoArea() {
  const undoArea =
    document.getElementById(
      "undo-area"
    );

  if (!undoArea) {
    return;
  }

  if (!lastRemovedMaterial) {
    undoArea.innerHTML = "";
    return;
  }

  undoArea.innerHTML = `
    <div
      class="undo-message"
      role="status"
    >
      <span>
        <strong>
          ${escapeHtml(
            lastRemovedMaterial.name
          )}
        </strong>
        was removed.
      </span>

      <button
        type="button"
        id="undo-remove-button"
      >
        Undo
      </button>
    </div>
  `;

  document
    .getElementById(
      "undo-remove-button"
    )
    .addEventListener(
      "click",
      undoRemoveMaterial
    );
}

function undoRemoveMaterial() {
  if (!lastRemovedMaterial) {
    return;
  }

  const safeIndex =
    lastRemovedIndex === null
      ? materialBasket.length
      : Math.min(
          lastRemovedIndex,
          materialBasket.length
        );

  materialBasket.splice(
    safeIndex,
    0,
    lastRemovedMaterial
  );

  lastRemovedMaterial = null;
  lastRemovedIndex = null;

  renderMaterialBasket();
}

function previewMaterial(materialId) {
  const material =
    materialBasket.find(
      (item) =>
        item.id === materialId
    );

  if (!material) {
    return;
  }

  const main =
    document.querySelector("main");

  let previewContent = "";

  if (
    material.type === "photo" &&
    material.previewUrl
  ) {
    previewContent = `
      <img
        src="${material.previewUrl}"
        alt="Preview of ${escapeHtml(
          material.name
        )}"
        class="material-preview-image"
      />
    `;
  } else if (
    material.type === "text"
  ) {
    previewContent = `
      <div class="text-preview">
        ${escapeHtml(
          material.text
        ).replaceAll(
          "\n",
          "<br>"
        )}
      </div>
    `;
  } else {
    previewContent = `
      <div class="file-preview-placeholder">
        <span aria-hidden="true">
          ${getMaterialIcon(
            material.type
          )}
        </span>

        <h3>
          ${escapeHtml(
            material.name
          )}
        </h3>

        <p>
          Use Review Text to read the usable
          text from this file.
        </p>
      </div>
    `;
  }

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="preview-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Material Preview
        </p>

        <h2 id="preview-title">
          ${escapeHtml(
            material.name
          )}
        </h2>
      </div>

      <div class="material-preview-panel">
        ${previewContent}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="return-to-basket-button"
        >
          Back to My Basket
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "return-to-basket-button"
    )
    .addEventListener(
      "click",
      () => {
        showMaterialBasket();
      }
    );
}

async function reviewMaterialText(
  materialId
) {
  const material =
    materialBasket.find(
      (item) =>
        item.id === materialId
    );

  if (!material) {
    return;
  }

  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="review-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Check What I Found
        </p>

        <h2 id="review-title">
          ${escapeHtml(
            material.name
          )}
        </h2>

        <p class="hero-text">
          Compass Trail is reading this material.
          You will always be able to check and change
          extracted text before it is used.
        </p>
      </div>

      <div class="material-preview-panel">
        <p
          id="extraction-status"
          role="status"
        >
          Reading your material…
        </p>

        <div id="extraction-result"></div>
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="review-back-button"
        >
          Back to My Basket
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "review-back-button"
    )
    .addEventListener(
      "click",
      () => {
        showMaterialBasket();
      }
    );

  try {
    const result =
      await extractTextFromMaterial(
        material
      );

    if (
      material.type === "photo" &&
      (
        result.status === "ready" ||
        result.status === "empty"
      )
    ) {
      material.photoResult =
        result;

      showPhotoPreparationReview(
        material,
        result
      );

      return;
    }

    showExtractionResult(
      material,
      result
    );
  } catch (error) {
    console.error(
      "Material extraction failed:",
      error
    );

    showExtractionResult(
      material,
      {
        status: "error",
      }
    );
  }
}

function showPhotoPreparationReview(
  material,
  result
) {
  const main =
    document.querySelector("main");

  let preparationMessage = "";

  if (result.usedOriginal) {
    preparationMessage =
      "You chose to keep the original photo. No perspective correction was applied.";
  } else if (
    result.perspectiveCorrected
  ) {
    preparationMessage =
      "Compass Trail found the page shape and straightened it.";
  } else {
    preparationMessage =
      "Compass Trail could not confidently find all four page edges, so it prepared the full image instead.";
  }

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="photo-review-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Check the Page
        </p>

        <h2 id="photo-review-title">
          Compass Trail saw your page like this.
        </h2>

        <p class="hero-text">
          ${preparationMessage}
        </p>

        <p class="hero-text">
          You are in control of which version
          Compass Trail reads.
        </p>
      </div>

      <div class="photo-compare-grid">
        <section class="photo-compare-card">
          <p class="eyebrow">
            Original
          </p>

          <img
            src="${result.originalImage}"
            alt="Original uploaded page"
            class="material-preview-image"
          />
        </section>

        <section class="photo-compare-card">
          <p class="eyebrow">
            ${
              result.usedOriginal
                ? "Currently using original"
                : "Prepared for reading"
            }
          </p>

          <img
            src="${result.processedImage}"
            alt="${
              result.usedOriginal
                ? "Original page selected for text recognition"
                : "Prepared page used for text recognition"
            }"
            class="material-preview-image"
          />
        </section>
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="photo-looks-good-button"
        >
          Looks Good
        </button>

        <button
          type="button"
          class="secondary-button"
          id="adjust-corners-button"
        >
          Adjust Corners
        </button>

        ${
          result.usedOriginal
            ? ""
            : `
              <button
                type="button"
                class="secondary-button"
                id="use-original-photo-button"
              >
                Use Original Photo Instead
              </button>
            `
        }

        <button
          type="button"
          class="secondary-button"
          id="photo-review-back-button"
        >
          Back to My Basket
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "photo-looks-good-button"
    )
    .addEventListener(
      "click",
      () => {
        showExtractionResult(
          material,
          result
        );
      }
    );

  document
    .getElementById(
      "adjust-corners-button"
    )
    .addEventListener(
      "click",
      () => {
        showCornerEditor(
          material,
          result
        );
      }
    );

  const originalButton =
    document.getElementById(
      "use-original-photo-button"
    );

  if (originalButton) {
    originalButton.addEventListener(
      "click",
      async () => {
        showPhotoProcessingScreen(
          material.name
        );

        try {
          const originalResult =
            await readPhotoText(
              material.file,
              {
                useOriginal: true,
              }
            );

          material.photoResult =
            originalResult;

          if (
            originalResult.status ===
              "ready" ||
            originalResult.status ===
              "empty"
          ) {
            showPhotoPreparationReview(
              material,
              originalResult
            );

            return;
          }

          showExtractionResult(
            material,
            originalResult
          );
        } catch (error) {
          console.error(
            "Original photo OCR failed:",
            error
          );

          showExtractionResult(
            material,
            {
              status: "error",
            }
          );
        }
      }
    );
  }

  document
    .getElementById(
      "photo-review-back-button"
    )
    .addEventListener(
      "click",
      () => {
        showMaterialBasket();
      }
    );
}

function showCornerEditor(
  material,
  result
) {
  const main =
    document.querySelector("main");

  const imageWidth =
    result.originalWidth;

  const imageHeight =
    result.originalHeight;

  const corners =
    result.detectedCorners &&
    result.detectedCorners.length === 4
      ? result.detectedCorners.map(
          (point) => ({
            x: point.x,
            y: point.y,
          })
        )
      : [
          {
            x: 0,
            y: 0,
          },
          {
            x: imageWidth,
            y: 0,
          },
          {
            x: imageWidth,
            y: imageHeight,
          },
          {
            x: 0,
            y: imageHeight,
          },
        ];

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="corner-editor-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Adjust the Page
        </p>

        <h2 id="corner-editor-title">
          Put each marker on a page corner.
        </h2>

        <p class="hero-text">
          Drag a marker with the mouse or touch,
          or select it and use the arrow keys.
          Shift + arrow moves it a little faster.
        </p>
      </div>

      <div
        id="corner-editor"
        class="corner-editor"
      >
        <img
          id="corner-editor-image"
          src="${result.originalImage}"
          alt="Page for corner adjustment"
        />

        ${cornerHandle(
          "top-left",
          "Top left corner",
          corners[0]
        )}

        ${cornerHandle(
          "top-right",
          "Top right corner",
          corners[1]
        )}

        ${cornerHandle(
          "bottom-right",
          "Bottom right corner",
          corners[2]
        )}

        ${cornerHandle(
          "bottom-left",
          "Bottom left corner",
          corners[3]
        )}
      </div>

      <p class="hero-text">
        The markers only define the page shape.
        Your original image is not changed.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="apply-corners-button"
        >
          Apply & Read Again
        </button>

        <button
          type="button"
          class="secondary-button"
          id="cancel-corners-button"
        >
          Cancel
        </button>
      </div>
    </section>
  `;

  const editor =
    document.getElementById(
      "corner-editor"
    );

  const image =
    document.getElementById(
      "corner-editor-image"
    );

  image.addEventListener(
    "load",
    () => {
      positionCornerHandles(
        editor,
        image,
        corners,
        imageWidth,
        imageHeight
      );
    }
  );

  if (image.complete) {
    positionCornerHandles(
      editor,
      image,
      corners,
      imageWidth,
      imageHeight
    );
  }

  setupCornerDragging(
    editor,
    image,
    corners,
    imageWidth,
    imageHeight
  );

  document
    .getElementById(
      "apply-corners-button"
    )
    .addEventListener(
      "click",
      async () => {
        showPhotoProcessingScreen(
          material.name
        );

        try {
          const newResult =
            await readPhotoText(
              material.file,
              {
                manualCorners:
                  corners,
              }
            );

          material.photoResult =
            newResult;

          if (
            newResult.status ===
              "ready" ||
            newResult.status ===
              "empty"
          ) {
            showPhotoPreparationReview(
              material,
              newResult
            );

            return;
          }

          showExtractionResult(
            material,
            newResult
          );
        } catch (error) {
          console.error(
            "Manual perspective OCR failed:",
            error
          );

          showExtractionResult(
            material,
            {
              status: "error",
            }
          );
        }
      }
    );

  document
    .getElementById(
      "cancel-corners-button"
    )
    .addEventListener(
      "click",
      () => {
        showPhotoPreparationReview(
          material,
          result
        );
      }
    );
}

function cornerHandle(
  key,
  label,
  point
) {
  return `
    <button
      type="button"
      class="corner-handle"
      data-corner="${key}"
      aria-label="${label}"
      data-x="${point.x}"
      data-y="${point.y}"
    >
      <span aria-hidden="true"></span>
    </button>
  `;
}

function positionCornerHandles(
  editor,
  image,
  corners,
  imageWidth,
  imageHeight
) {
  const rect =
    image.getBoundingClientRect();

  const editorRect =
    editor.getBoundingClientRect();

  if (
    !rect.width ||
    !rect.height
  ) {
    return;
  }

  const offsetX =
    rect.left -
    editorRect.left;

  const offsetY =
    rect.top -
    editorRect.top;

  const scaleX =
    rect.width /
    imageWidth;

  const scaleY =
    rect.height /
    imageHeight;

  const handles =
    editor.querySelectorAll(
      ".corner-handle"
    );

  handles.forEach(
    (handle, index) => {
      const point =
        corners[index];

      handle.style.left =
        `${
          offsetX +
          point.x * scaleX
        }px`;

      handle.style.top =
        `${
          offsetY +
          point.y * scaleY
        }px`;
    }
  );
}

function setupCornerDragging(
  editor,
  image,
  corners,
  imageWidth,
  imageHeight
) {
  const handles = [
    ...editor.querySelectorAll(
      ".corner-handle"
    ),
  ];

  handles.forEach(
    (handle, index) => {
      let dragging = false;

      handle.addEventListener(
        "pointerdown",
        (event) => {
          dragging = true;

          handle.setPointerCapture(
            event.pointerId
          );
        }
      );

      handle.addEventListener(
        "pointermove",
        (event) => {
          if (!dragging) {
            return;
          }

          updateCornerFromPointer(
            event
          );
        }
      );

      handle.addEventListener(
        "pointerup",
        () => {
          dragging = false;
        }
      );

      handle.addEventListener(
        "pointercancel",
        () => {
          dragging = false;
        }
      );

      handle.addEventListener(
        "keydown",
        (event) => {
          const step =
            event.shiftKey
              ? 10
              : 2;

          let changed = false;

          if (
            event.key ===
            "ArrowLeft"
          ) {
            corners[index].x -=
              step;

            changed = true;
          }

          if (
            event.key ===
            "ArrowRight"
          ) {
            corners[index].x +=
              step;

            changed = true;
          }

          if (
            event.key ===
            "ArrowUp"
          ) {
            corners[index].y -=
              step;

            changed = true;
          }

          if (
            event.key ===
            "ArrowDown"
          ) {
            corners[index].y +=
              step;

            changed = true;
          }

          if (!changed) {
            return;
          }

          event.preventDefault();

          corners[index].x =
            clamp(
              corners[index].x,
              0,
              imageWidth
            );

          corners[index].y =
            clamp(
              corners[index].y,
              0,
              imageHeight
            );

          positionCornerHandles(
            editor,
            image,
            corners,
            imageWidth,
            imageHeight
          );
        }
      );

      function updateCornerFromPointer(
        event
      ) {
        const imageRect =
          image.getBoundingClientRect();

        const relativeX =
          clamp(
            event.clientX -
              imageRect.left,
            0,
            imageRect.width
          );

        const relativeY =
          clamp(
            event.clientY -
              imageRect.top,
            0,
            imageRect.height
          );

        corners[index].x =
          (
            relativeX /
            imageRect.width
          ) * imageWidth;

        corners[index].y =
          (
            relativeY /
            imageRect.height
          ) * imageHeight;

        positionCornerHandles(
          editor,
          image,
          corners,
          imageWidth,
          imageHeight
        );
      }
    }
  );
}

function showPhotoProcessingScreen(
  materialName
) {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="processing-title"
    >
      <p class="eyebrow">
        Preparing Your Page
      </p>

      <h2 id="processing-title">
        Reading
        ${escapeHtml(
          materialName
        )}
      </h2>

      <p
        class="hero-text"
        role="status"
      >
        Preparing the page and looking for text…
      </p>
    </section>
  `;
}

function showExtractionResult(
  material,
  result
) {
  const main =
    document.querySelector("main");

  if (
    result.status === "ready"
  ) {
    main.innerHTML = `
      <section
        class="material-page"
        aria-labelledby="extracted-title"
      >
        <div class="material-heading">
          <p class="eyebrow">
            Check What I Found
          </p>

          <h2 id="extracted-title">
            ${escapeHtml(
              material.name
            )}
          </h2>

          <p class="hero-text">
            Here’s what I found.
            Have a quick look.
            You can change anything
            that doesn’t look right.
          </p>
        </div>

        <div class="material-preview-panel">
          ${
            result.pageCount
              ? `
                <p>
                  ${result.pageCount}
                  ${
                    result.pageCount === 1
                      ? "page"
                      : "pages"
                  }
                  read.
                </p>
              `
              : ""
          }

          <label for="extracted-text">
            <strong>
              Extracted text
            </strong>
          </label>

          <textarea
            id="extracted-text"
            rows="18"
          >${escapeHtml(
            result.text
          )}</textarea>
        </div>

        <div class="hero-actions">
          <button
            type="button"
            class="primary-button"
            id="confirm-extracted-text"
          >
            Looks Right
          </button>

          ${
            material.type ===
              "photo" &&
            material.photoResult
              ? `
                <button
                  type="button"
                  class="secondary-button"
                  id="adjust-photo-again-button"
                >
                  Adjust Page Again
                </button>
              `
              : ""
          }

          <button
            type="button"
            class="secondary-button"
            id="extracted-back-button"
          >
            Back to My Basket
          </button>
        </div>
      </section>
    `;

    document
      .getElementById(
        "confirm-extracted-text"
      )
      .addEventListener(
        "click",
        () => {
          const editedText =
            document
              .getElementById(
                "extracted-text"
              )
              .value
              .trim();

          material.extractedText =
            editedText;

          material.extractionStatus =
            "confirmed";

          showMaterialBasket();
        }
      );

    const adjustAgainButton =
      document.getElementById(
        "adjust-photo-again-button"
      );

    if (adjustAgainButton) {
      adjustAgainButton.addEventListener(
        "click",
        () => {
          showCornerEditor(
            material,
            material.photoResult
          );
        }
      );
    }

    document
      .getElementById(
        "extracted-back-button"
      )
      .addEventListener(
        "click",
        () => {
          showMaterialBasket();
        }
      );

    return;
  }

  if (
    result.status === "empty"
  ) {
    main.innerHTML = `
      <section class="material-page">
        <div class="material-heading">
          <p class="eyebrow">
            Check What I Found
          </p>

          <h2>
            No readable text found yet.
          </h2>

          <p class="hero-text">
            The page may need a different crop,
            clearer lighting or another reading method.
          </p>
        </div>

        <div class="hero-actions">
          ${
            material.type ===
              "photo" &&
            material.photoResult
              ? `
                <button
                  type="button"
                  class="primary-button"
                  id="empty-adjust-button"
                >
                  Adjust Corners
                </button>
              `
              : ""
          }

          <button
            type="button"
            class="secondary-button"
            id="empty-back-button"
          >
            Back to My Basket
          </button>
        </div>
      </section>
    `;

    const adjustButton =
      document.getElementById(
        "empty-adjust-button"
      );

    if (adjustButton) {
      adjustButton.addEventListener(
        "click",
        () => {
          showCornerEditor(
            material,
            material.photoResult
          );
        }
      );
    }

    document
      .getElementById(
        "empty-back-button"
      )
      .addEventListener(
        "click",
        () => {
          showMaterialBasket();
        }
      );

    return;
  }

  if (
    result.status === "needs-ocr"
  ) {
    main.innerHTML = `
      <section class="hero">
        <p class="eyebrow">
          Visual Reading Needed
        </p>

        <h2>
          This file looks more like
          a scan than selectable text.
        </h2>

        <p class="hero-text">
          It will need the visual OCR path.
        </p>

        <div class="hero-actions">
          <button
            type="button"
            class="secondary-button"
            id="ocr-back-button"
          >
            Back to My Basket
          </button>
        </div>
      </section>
    `;

    document
      .getElementById(
        "ocr-back-button"
      )
      .addEventListener(
        "click",
        () => {
          showMaterialBasket();
        }
      );

    return;
  }

  main.innerHTML = `
    <section class="hero">
      <p class="eyebrow">
        Another Look Needed
      </p>

      <h2>
        I couldn't read this material yet.
      </h2>

      <p class="hero-text">
        Your original file has not been changed.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="error-back-button"
        >
          Back to My Basket
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "error-back-button"
    )
    .addEventListener(
      "click",
      () => {
        showMaterialBasket();
      }
    );
}

function getMaterialIcon(type) {
  const icons = {
    photo: "📷",
    pdf: "📄",
    document: "🗂️",
    text: "📋",
  };

  return icons[type] || "📎";
}

function getMaterialDescription(
  material
) {
  if (
    material.type === "text"
  ) {
    return "Pasted text";
  }

  return `${formatFileSize(
    material.size
  )} · ${getReadableType(
    material.type
  )}`;
}

function getReadableType(type) {
  const labels = {
    photo: "Photo",
    pdf: "PDF",
    document: "Document",
  };

  return labels[type] ||
    "Material";
}

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (
    bytes <
    1024 * 1024
  ) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function showPathPreview() {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="path-preview-title"
    >
      <p class="eyebrow">
        Your Materials Are Ready
      </p>

      <h2 id="path-preview-title">
        Let's find a path through them.
      </h2>

      <p class="hero-text">
        You brought
        ${materialBasket.length}
        ${
          materialBasket.length === 1
            ? "material"
            : "materials"
        }.

        Next, Compass Trail will help
        turn what you brought into
        an editable Journey.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="continue-path-button"
        >
          Keep Going
        </button>

        <button
          type="button"
          class="secondary-button"
          id="return-basket-button"
        >
          Back to My Basket
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "return-basket-button"
    )
    .addEventListener(
      "click",
      () => {
        showMaterialBasket();
      }
    );

  document
    .getElementById(
      "continue-path-button"
    )
    .addEventListener(
      "click",
      showJourneyDetails
    );
}

function showJourneyDetails() {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="journey-details-title"
    >
      <p class="eyebrow">
        One Small Step
      </p>

      <h2 id="journey-details-title">
        What are you working toward?
      </h2>

      <p class="hero-text">
        You don't need to explain everything.
        A few words are enough.
      </p>

      <form
        id="journey-details-form"
        class="journey-form"
      >
        <label for="journey-title">
          <strong>
            What are you working on?
          </strong>

          <span>
            For example:
            science presentation
            or maths homework.
          </span>
        </label>

        <input
          type="text"
          id="journey-title"
          maxlength="100"
          placeholder="My science presentation"
          required
        />

        <label for="journey-goal">
          <strong>
            What would feel good
            to accomplish?
          </strong>

          <span>
            You can leave this blank
            if you're not sure yet.
          </span>
        </label>

        <textarea
          id="journey-goal"
          rows="4"
          maxlength="400"
          placeholder="I want to get the first three slides ready."
        ></textarea>

        <div class="hero-actions">
          <button
            type="submit"
            class="primary-button"
          >
            Build My Path
          </button>

          <button
            type="button"
            class="secondary-button"
            id="details-back-button"
          >
            Back
          </button>
        </div>
      </form>
    </section>
  `;

  document
    .getElementById(
      "details-back-button"
    )
    .addEventListener(
      "click",
      showPathPreview
    );

  document
    .getElementById(
      "journey-details-form"
    )
    .addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const journeyTitle =
          document
            .getElementById(
              "journey-title"
            )
            .value
            .trim();

        const journeyGoal =
          document
            .getElementById(
              "journey-goal"
            )
            .value
            .trim();

        showFirstJourneyPath(
          journeyTitle,
          journeyGoal
        );
      }
    );
}

function showFirstJourneyPath(
  journeyTitle,
  journeyGoal
) {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="first-path-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Your First Path
        </p>

        <h2 id="first-path-title">
          ${escapeHtml(
            journeyTitle
          )}
        </h2>

        ${
          journeyGoal
            ? `
              <p class="hero-text">
                ${escapeHtml(
                  journeyGoal
                )}
              </p>
            `
            : `
              <p class="hero-text">
                You can decide what “done”
                looks like as you go.
              </p>
            `
        }

        <p class="path-note">
          This path is a suggestion.
          Make it yours.
        </p>
      </div>

      <div class="suggested-path">
        ${pathStep(
          1,
          "Take a Look Around",
          "See what you brought and get a feel for the task."
        )}

        ${pathStep(
          2,
          "Find the Clues",
          "Notice what the task is asking you to do."
        )}

        ${pathStep(
          3,
          "Make the Pieces Smaller",
          "Turn the task into a few manageable parts."
        )}

        ${pathStep(
          4,
          "Choose Your First Move",
          "Start with one clear, small action."
        )}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
        >
          Start My Journey
        </button>

        <button
          type="button"
          class="secondary-button"
          id="edit-materials-button"
        >
          Back to My Materials
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "edit-materials-button"
    )
    .addEventListener(
      "click",
      () => {
        showMaterialBasket();
      }
    );
}

function pathStep(
  number,
  title,
  description
) {
  return `
    <article class="path-step">
      <span>
        ${number}
      </span>

      <div>
        <h3>
          ${title}
        </h3>

        <p>
          ${description}
        </p>
      </div>
    </article>
  `;
}

function clamp(
  value,
  min,
  max
) {
  return Math.min(
    Math.max(
      value,
      min
    ),
    max
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}
