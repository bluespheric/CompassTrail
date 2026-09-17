const beginJourneyButtons = [
  ...document.querySelectorAll(".primary-button"),
  ...document.querySelectorAll(".home-card button"),
];

beginJourneyButtons.forEach((button) => {
  const label = button.textContent.trim();

  if (label === "Begin My Journey" || label === "Create a Journey") {
    button.addEventListener("click", showJourneyStartScreen);
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
        Start with whatever you already need to learn, finish, understand or organise.
      </p>

      <div class="home-grid journey-start-grid">
        ${journeyOption("✍️", "Write It Myself", "Tell Compass Trail what you need to work on.", "write")}
        ${journeyOption("📷", "Add Photos", "Bring one or more photos of worksheets, notes or pages.", "photo")}
        ${journeyOption("📄", "Add PDFs", "Bring one or more PDF files into your Material Basket.", "pdf")}
        ${journeyOption("🗂️", "Add Documents", "Bring documents such as DOCX or TXT files.", "document")}
        ${journeyOption("📋", "Paste Text", "Paste instructions, notes or learning material.", "paste")}
        ${journeyOption("🧺", "Build My Material Basket", "Mix photos, PDFs, documents and text in one Journey.", "mixed")}
      </div>

      <div class="hero-actions">
        <button type="button" class="secondary-button" id="back-home-button">
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById("back-home-button")
    .addEventListener("click", () => window.location.reload());

  document.querySelectorAll(".journey-option").forEach((option) => {
    option.addEventListener("click", () => {
      showMaterialBasket(option.dataset.journeyInput);
    });
  });
}

function journeyOption(icon, title, description, type) {
  return `
    <button class="home-card journey-option" data-journey-input="${type}">
      <span class="card-icon" aria-hidden="true">${icon}</span>
      <h3>${title}</h3>
      <p>${description}</p>
    </button>
  `;
}

function showMaterialBasket(selectedType = "mixed") {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="material-page" aria-labelledby="material-title">
      <div class="material-heading">
        <p class="eyebrow">My Material Basket</p>

        <h2 id="material-title">Bring everything you need.</h2>

        <p class="hero-text">
          Add one thing or mix different materials together.
          You can change your basket later.
        </p>
      </div>

      <section class="material-actions" aria-label="Add learning material">
        ${materialAction("📷", "Add Photos", "JPG, PNG or WebP", "add-photo-button")}
        ${materialAction("📄", "Add PDFs", "PDF files", "add-pdf-button")}
        ${materialAction("🗂️", "Add Documents", "DOCX or TXT", "add-document-button")}
        ${materialAction("📋", "Paste Text", "Instructions or notes", "paste-text-button")}
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

      <section class="basket-section" aria-labelledby="basket-title">
        <div class="basket-header">
          <div>
            <p class="eyebrow">Your Basket</p>
            <h3 id="basket-title">Materials</h3>
          </div>

          <span id="material-count" class="material-count">0 items</span>
        </div>

        <div id="undo-area"></div>

        <div id="material-list" class="material-list"></div>

        <div id="empty-basket" class="empty-basket">
          <span aria-hidden="true">🧺</span>
          <h4>Your basket is empty.</h4>
          <p>
            Add a photo, PDF, document or some text when you're ready.
          </p>
        </div>
      </section>

      <div class="hero-actions basket-navigation">
        <button type="button" class="secondary-button" id="back-choice-button">
          Back
        </button>

        <button type="button" class="primary-button" id="build-path-button">
          Build My Path
        </button>
      </div>
    </section>
  `;

  connectMaterialBasketEvents();
  renderMaterialBasket();

  if (selectedType === "photo") {
    document.getElementById("photo-input").click();
  }

  if (selectedType === "pdf") {
    document.getElementById("pdf-input").click();
  }

  if (selectedType === "document") {
    document.getElementById("document-input").click();
  }

  if (selectedType === "paste" || selectedType === "write") {
    showPasteTextPanel();
  }
}

function materialAction(icon, title, subtitle, id) {
  return `
    <button type="button" class="material-action" id="${id}">
      <span aria-hidden="true">${icon}</span>
      <strong>${title}</strong>
      <span>${subtitle}</span>
    </button>
  `;
}

function connectMaterialBasketEvents() {
  const photoInput = document.getElementById("photo-input");
  const pdfInput = document.getElementById("pdf-input");
  const documentInput = document.getElementById("document-input");

  document
    .getElementById("add-photo-button")
    .addEventListener("click", () => photoInput.click());

  document
    .getElementById("add-pdf-button")
    .addEventListener("click", () => pdfInput.click());

  document
    .getElementById("add-document-button")
    .addEventListener("click", () => documentInput.click());

  document
    .getElementById("paste-text-button")
    .addEventListener("click", showPasteTextPanel);

  photoInput.addEventListener("change", (event) => {
    addFilesToBasket(event.target.files, "photo");
    event.target.value = "";
  });

  pdfInput.addEventListener("change", (event) => {
    addFilesToBasket(event.target.files, "pdf");
    event.target.value = "";
  });

  documentInput.addEventListener("change", (event) => {
    addFilesToBasket(event.target.files, "document");
    event.target.value = "";
  });

  document
    .getElementById("back-choice-button")
    .addEventListener("click", showJourneyStartScreen);

  document
    .getElementById("build-path-button")
    .addEventListener("click", showPathPreview);
}

function addFilesToBasket(fileList, type) {
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
    });
  });

  renderMaterialBasket();
}

function showPasteTextPanel() {
  const existingPanel = document.getElementById("paste-text-panel");

  if (existingPanel) {
    existingPanel.querySelector("textarea").focus();
    return;
  }

  const basketSection = document.querySelector(".basket-section");

  const panel = document.createElement("section");
  panel.id = "paste-text-panel";
  panel.className = "paste-text-panel";

  panel.innerHTML = `
    <label for="pasted-material">
      <strong>Paste your text</strong>
      <span>
        Add instructions, notes or any text you want to use in this Journey.
      </span>
    </label>

    <textarea
      id="pasted-material"
      rows="8"
      placeholder="Paste or write your text here..."
    ></textarea>

    <div class="paste-actions">
      <button type="button" class="secondary-button" id="cancel-paste-button">
        Cancel
      </button>

      <button type="button" class="primary-button" id="save-paste-button">
        Add to Basket
      </button>
    </div>
  `;

  basketSection.before(panel);

  document
    .getElementById("cancel-paste-button")
    .addEventListener("click", () => panel.remove());

  document
    .getElementById("save-paste-button")
    .addEventListener("click", () => {
      const textarea = document.getElementById("pasted-material");
      const text = textarea.value.trim();

      if (!text) {
        textarea.focus();
        return;
      }

      materialBasket.push({
        id: crypto.randomUUID(),
        type: "text",
        name: createTextMaterialName(text),
        text,
      });

      panel.remove();
      renderMaterialBasket();
    });

  document.getElementById("pasted-material").focus();
}

function createTextMaterialName(text) {
  const firstLine = text.split("\n")[0].trim();
  const shortened = firstLine.slice(0, 45);

  if (!shortened) {
    return "Pasted text";
  }

  return shortened.length < firstLine.length
    ? `${shortened}…`
    : shortened;
}

function renderMaterialBasket() {
  const list = document.getElementById("material-list");
  const emptyBasket = document.getElementById("empty-basket");
  const count = document.getElementById("material-count");
  const buildButton = document.getElementById("build-path-button");

  if (!list || !emptyBasket || !count || !buildButton) {
    return;
  }

  count.textContent = `${materialBasket.length} ${
    materialBasket.length === 1 ? "item" : "items"
  }`;

  buildButton.disabled = materialBasket.length === 0;

  if (materialBasket.length === 0) {
    list.innerHTML = "";
    emptyBasket.hidden = false;
    renderUndoArea();
    return;
  }

  emptyBasket.hidden = true;

  list.innerHTML = materialBasket
    .map((material, index) => {
      return `
        <article class="material-card">
          <div class="material-card-icon" aria-hidden="true">
            ${getMaterialIcon(material.type)}
          </div>

          <div class="material-card-content">
            <p class="material-position">
              Material ${index + 1}
            </p>

            <h4>${escapeHtml(material.name)}</h4>

            <p>
              ${getMaterialDescription(material)}
            </p>

            <div class="material-card-actions">
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
                ${index === 0 ? "disabled" : ""}
              >
                Move Up
              </button>

              <button
                type="button"
                class="small-action-button move-down-button"
                data-material-id="${material.id}"
                ${index === materialBasket.length - 1 ? "disabled" : ""}
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
    })
    .join("");

  connectMaterialCardEvents();
  renderUndoArea();
}

function connectMaterialCardEvents() {
  document.querySelectorAll(".preview-material-button").forEach((button) => {
    button.addEventListener("click", () => {
      previewMaterial(button.dataset.materialId);
    });
  });

  document.querySelectorAll(".rename-material-button").forEach((button) => {
    button.addEventListener("click", () => {
      renameMaterial(button.dataset.materialId);
    });
  });

  document.querySelectorAll(".move-up-button").forEach((button) => {
    button.addEventListener("click", () => {
      moveMaterial(button.dataset.materialId, -1);
    });
  });

  document.querySelectorAll(".move-down-button").forEach((button) => {
    button.addEventListener("click", () => {
      moveMaterial(button.dataset.materialId, 1);
    });
  });

  document.querySelectorAll(".remove-material-button").forEach((button) => {
    button.addEventListener("click", () => {
      removeMaterial(button.dataset.materialId);
    });
  });
}

function renameMaterial(materialId) {
  const material = materialBasket.find((item) => item.id === materialId);

  if (!material) {
    return;
  }

  const newName = window.prompt(
    "Choose a new name for this material:",
    material.name
  );

  if (newName === null) {
    return;
  }

  const cleanedName = newName.trim();

  if (!cleanedName) {
    return;
  }

  material.name = cleanedName.slice(0, 120);
  renderMaterialBasket();
}

function moveMaterial(materialId, direction) {
  const currentIndex = materialBasket.findIndex(
    (item) => item.id === materialId
  );

  if (currentIndex === -1) {
    return;
  }

  const newIndex = currentIndex + direction;

  if (newIndex < 0 || newIndex >= materialBasket.length) {
    return;
  }

  const [material] = materialBasket.splice(currentIndex, 1);
  materialBasket.splice(newIndex, 0, material);

  renderMaterialBasket();
}

function removeMaterial(materialId) {
  const index = materialBasket.findIndex(
    (material) => material.id === materialId
  );

  if (index === -1) {
    return;
  }

  lastRemovedMaterial = materialBasket[index];
  lastRemovedIndex = index;

  materialBasket.splice(index, 1);

  renderMaterialBasket();
}

function renderUndoArea() {
  const undoArea = document.getElementById("undo-area");

  if (!undoArea) {
    return;
  }

  if (!lastRemovedMaterial) {
    undoArea.innerHTML = "";
    return;
  }

  undoArea.innerHTML = `
    <div class="undo-message" role="status">
      <span>
        <strong>${escapeHtml(lastRemovedMaterial.name)}</strong> was removed.
      </span>

      <button type="button" id="undo-remove-button">
        Undo
      </button>
    </div>
  `;

  document
    .getElementById("undo-remove-button")
    .addEventListener("click", undoRemoveMaterial);
}

function undoRemoveMaterial() {
  if (!lastRemovedMaterial) {
    return;
  }

  const safeIndex =
    lastRemovedIndex === null
      ? materialBasket.length
      : Math.min(lastRemovedIndex, materialBasket.length);

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
  const material = materialBasket.find(
    (item) => item.id === materialId
  );

  if (!material) {
    return;
  }

  const main = document.querySelector("main");

  let previewContent = "";

  if (material.type === "photo" && material.previewUrl) {
    previewContent = `
      <img
        src="${material.previewUrl}"
        alt="Preview of ${escapeHtml(material.name)}"
        class="material-preview-image"
      />
    `;
  } else if (material.type === "text") {
    previewContent = `
      <div class="text-preview">
        ${escapeHtml(material.text).replaceAll("\n", "<br>")}
      </div>
    `;
  } else {
    previewContent = `
      <div class="file-preview-placeholder">
        <span aria-hidden="true">${getMaterialIcon(material.type)}</span>

        <h3>${escapeHtml(material.name)}</h3>

        <p>
          A visual preview for this file type is not available yet.
        </p>

        <p>
          ${escapeHtml(getMaterialDescription(material))}
        </p>
      </div>
    `;
  }

  main.innerHTML = `
    <section class="material-page" aria-labelledby="preview-title">
      <div class="material-heading">
        <p class="eyebrow">Material Preview</p>

        <h2 id="preview-title">
          ${escapeHtml(material.name)}
        </h2>
      </div>

      <div class="material-preview-panel">
        ${previewContent}
      </div>

      <div class="hero-actions">
        <button type="button" class="secondary-button" id="return-to-basket-button">
          Back to My Basket
        </button>
      </div>
    </section>
  `;

  document
    .getElementById("return-to-basket-button")
    .addEventListener("click", () => showMaterialBasket());
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

function getMaterialDescription(material) {
  if (material.type === "text") {
    return "Pasted text";
  }

  return `${formatFileSize(material.size)} · ${getReadableType(material.type)}`;
}

function getReadableType(type) {
  const labels = {
    photo: "Photo",
    pdf: "PDF",
    document: "Document",
  };

  return labels[type] || "Material";
}

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function showPathPreview() {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="path-preview-title">
      <p class="eyebrow">Your Materials Are Ready</p>

      <h2 id="path-preview-title">
        Let's find a path through them.
      </h2>

      <p class="hero-text">
        You brought ${materialBasket.length}
        ${materialBasket.length === 1 ? "material" : "materials"}.
        Next, Compass Trail will help turn what you brought into an editable Journey.
      </p>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="continue-path-button">
          Keep Going
        </button>

        <button type="button" class="secondary-button" id="return-basket-button">
          Back to My Basket
        </button>
      </div>
    </section>
  `;

  document
    .getElementById("return-basket-button")
    .addEventListener("click", () => showMaterialBasket());

  document
    .getElementById("continue-path-button")
    .addEventListener("click", showJourneyDetails);
}

function showJourneyDetails() {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="journey-details-title">
      <p class="eyebrow">One Small Step</p>

      <h2 id="journey-details-title">
        What are you working toward?
      </h2>

      <p class="hero-text">
        You don't need to explain everything. A few words are enough.
      </p>

      <form id="journey-details-form" class="journey-form">
        <label for="journey-title">
          <strong>What are you working on?</strong>
          <span>For example: science presentation or maths homework.</span>
        </label>

        <input
          type="text"
          id="journey-title"
          maxlength="100"
          placeholder="My science presentation"
          required
        />

        <label for="journey-goal">
          <strong>What would feel good to accomplish?</strong>
          <span>You can leave this blank if you're not sure yet.</span>
        </label>

        <textarea
          id="journey-goal"
          rows="4"
          maxlength="400"
          placeholder="I want to get the first three slides ready."
        ></textarea>

        <div class="hero-actions">
          <button type="submit" class="primary-button">
            Build My Path
          </button>

          <button type="button" class="secondary-button" id="details-back-button">
            Back
          </button>
        </div>
      </form>
    </section>
  `;

  document
    .getElementById("details-back-button")
    .addEventListener("click", showPathPreview);

  document
    .getElementById("journey-details-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const journeyTitle =
        document.getElementById("journey-title").value.trim();

      const journeyGoal =
        document.getElementById("journey-goal").value.trim();

      showFirstJourneyPath(journeyTitle, journeyGoal);
    });
}

function showFirstJourneyPath(journeyTitle, journeyGoal) {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="material-page" aria-labelledby="first-path-title">
      <div class="material-heading">
        <p class="eyebrow">Your First Path</p>

        <h2 id="first-path-title">
          ${escapeHtml(journeyTitle)}
        </h2>

        ${
          journeyGoal
            ? `<p class="hero-text">${escapeHtml(journeyGoal)}</p>`
            : `
              <p class="hero-text">
                You can decide what “done” looks like as you go.
              </p>
            `
        }

        <p class="path-note">
          This path is a suggestion. Make it yours.
        </p>
      </div>

      <div class="suggested-path">
        ${pathStep(1, "Take a Look Around", "See what you brought and get a feel for the task.")}
        ${pathStep(2, "Find the Clues", "Notice what the task is asking you to do.")}
        ${pathStep(3, "Make the Pieces Smaller", "Turn the task into a few manageable parts.")}
        ${pathStep(4, "Choose Your First Move", "Start with one clear, small action.")}
      </div>

      <div class="hero-actions">
        <button type="button" class="primary-button">
          Start My Journey
        </button>

        <button type="button" class="secondary-button" id="edit-materials-button">
          Back to My Materials
        </button>
      </div>
    </section>
  `;

  document
    .getElementById("edit-materials-button")
    .addEventListener("click", () => showMaterialBasket());
}

function pathStep(number, title, description) {
  return `
    <article class="path-step">
      <span>${number}</span>
      <div>
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    </article>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
