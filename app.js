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
        <button class="home-card journey-option" data-journey-input="write">
          <span class="card-icon" aria-hidden="true">✍️</span>
          <h3>Write It Myself</h3>
          <p>Tell Compass Trail what you need to work on.</p>
        </button>

        <button class="home-card journey-option" data-journey-input="photo">
          <span class="card-icon" aria-hidden="true">📷</span>
          <h3>Add Photos</h3>
          <p>Bring one or more photos of worksheets, notes or pages.</p>
        </button>

        <button class="home-card journey-option" data-journey-input="pdf">
          <span class="card-icon" aria-hidden="true">📄</span>
          <h3>Add PDFs</h3>
          <p>Bring one or more PDF files into your Material Basket.</p>
        </button>

        <button class="home-card journey-option" data-journey-input="document">
          <span class="card-icon" aria-hidden="true">🗂️</span>
          <h3>Add Documents</h3>
          <p>Bring documents such as DOCX or TXT files.</p>
        </button>

        <button class="home-card journey-option" data-journey-input="paste">
          <span class="card-icon" aria-hidden="true">📋</span>
          <h3>Paste Text</h3>
          <p>Paste instructions, notes or learning material.</p>
        </button>

        <button class="home-card journey-option" data-journey-input="mixed">
          <span class="card-icon" aria-hidden="true">🧺</span>
          <h3>Build My Material Basket</h3>
          <p>Mix photos, PDFs, documents and text in one Journey.</p>
        </button>
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
    .addEventListener("click", () => {
      window.location.reload();
    });

  document.querySelectorAll(".journey-option").forEach((option) => {
    option.addEventListener("click", () => {
      const selectedType = option.dataset.journeyInput;
      showMaterialBasket(selectedType);
    });
  });
}

function showMaterialBasket(selectedType = "mixed") {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="material-page" aria-labelledby="material-title">
      <div class="material-heading">
        <p class="eyebrow">My Material Basket</p>

        <h2 id="material-title">
          Bring everything you need.
        </h2>

        <p class="hero-text">
          Add one thing or mix different materials together. You can change your basket later.
        </p>
      </div>

      <section class="material-actions" aria-label="Add learning material">
        <button type="button" class="material-action" id="add-photo-button">
          <span aria-hidden="true">📷</span>
          <strong>Add Photos</strong>
          <span>JPG, PNG or WebP</span>
        </button>

        <button type="button" class="material-action" id="add-pdf-button">
          <span aria-hidden="true">📄</span>
          <strong>Add PDFs</strong>
          <span>PDF files</span>
        </button>

        <button type="button" class="material-action" id="add-document-button">
          <span aria-hidden="true">🗂️</span>
          <strong>Add Documents</strong>
          <span>DOCX or TXT</span>
        </button>

        <button type="button" class="material-action" id="paste-text-button">
          <span aria-hidden="true">📋</span>
          <strong>Paste Text</strong>
          <span>Instructions or notes</span>
        </button>
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

          <span id="material-count" class="material-count">
            0 items
          </span>
        </div>

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

  renderMaterialBasket();
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
          </div>

          <button
            type="button"
            class="remove-material-button"
            data-material-id="${material.id}"
            aria-label="Remove ${escapeHtml(material.name)}"
          >
            Remove
          </button>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".remove-material-button").forEach((button) => {
    button.addEventListener("click", () => {
      removeMaterial(button.dataset.materialId);
    });
  });
}

function removeMaterial(materialId) {
  const index = materialBasket.findIndex(
    (material) => material.id === materialId
  );

  if (index === -1) {
    return;
  }

  materialBasket.splice(index, 1);
  renderMaterialBasket();
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
        <article class="path-step">
          <span>1</span>
          <div>
            <h3>Take a Look Around</h3>
            <p>See what you brought and get a feel for the task.</p>
          </div>
        </article>

        <article class="path-step">
          <span>2</span>
          <div>
            <h3>Find the Clues</h3>
            <p>Notice what the task is asking you to do.</p>
          </div>
        </article>

        <article class="path-step">
          <span>3</span>
          <div>
            <h3>Make the Pieces Smaller</h3>
            <p>Turn the task into a few manageable parts.</p>
          </div>
        </article>

        <article class="path-step">
          <span>4</span>
          <div>
            <h3>Choose Your First Move</h3>
            <p>Start with one clear, small action.</p>
          </div>
        </article>
      </div>

      <div class="hero-actions">
        <button type="button" class="primary-button">
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
    .getElementById("edit-materials-button")
    .addEventListener("click", () => showMaterialBasket());
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
