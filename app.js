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
          <p>Bring documents such as DOCX files.</p>
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
      showSelectedJourneyType(selectedType);
    });
  });
}

function showSelectedJourneyType(selectedType) {
  const labels = {
    write: "Write It Myself",
    photo: "Add Photos",
    pdf: "Add PDFs",
    document: "Add Documents",
    paste: "Paste Text",
    mixed: "Build My Material Basket",
  };

  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="selected-journey-title">
      <p class="eyebrow">Your Journey</p>

      <h2 id="selected-journey-title">
        ${labels[selectedType]}
      </h2>

      <p class="hero-text">
        This path is ready for the next step.
      </p>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="continue-journey-button">
          Continue
        </button>

        <button type="button" class="secondary-button" id="choose-another-button">
          Choose Another Way
        </button>
      </div>
    </section>
  `;

  document
    .getElementById("choose-another-button")
    .addEventListener("click", showJourneyStartScreen);

  document
    .getElementById("continue-journey-button")
    .addEventListener("click", () => {
      alert("Next, we will build the Material Basket.");
    });
}
