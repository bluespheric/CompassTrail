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


// ------------------------------------------------------------
// Teacher + Product Polish V1
// ------------------------------------------------------------

const teacherDemoStudents = [
  {
    id: "learner-river",
    nickname: "River",
    status: "Exploring",
    journey: "Science Presentation",
    step: "Build the Bones",
    shared: true,
    note: "Used Make It Smaller and returned after a break.",
  },
  {
    id: "learner-sky",
    nickname: "Sky",
    status: "Waiting for You",
    journey: "Reading Journey",
    step: "Drop an Anchor",
    shared: true,
    note: "Progress shared by learner.",
  },
  {
    id: "learner-moss",
    nickname: "Moss",
    status: "Private",
    journey: "",
    step: "",
    shared: false,
    note: "",
  },
];

function installTeacherButton() {
  if (
    document.getElementById(
      "teacher-space-button"
    )
  ) {
    return;
  }

  const nav =
    document.querySelector("nav");

  if (!nav) return;

  const button =
    document.createElement("button");

  button.type = "button";
  button.id = "teacher-space-button";
  button.className = "nav-button";
  button.textContent = "Teacher Space";

  button.addEventListener(
    "click",
    showTeacherDashboard
  );

  nav.appendChild(button);
}

function showTeacherDashboard() {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="teacher-dashboard-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Teacher Space
        </p>

        <h2 id="teacher-dashboard-title">
          Different Spaces. Different Ways to Participate.
        </h2>

        <p class="hero-text">
          See learning progress that has been
          shared with you. Accessibility choices
          and private notes stay with the learner.
        </p>
      </div>

      <div class="home-grid">
        <article class="home-card">
          <h3>My Class</h3>
          <p>
            A calm overview of learners and
            the Journeys they choose to share.
          </p>
          <button
            type="button"
            id="open-demo-class-button"
          >
            Open Class
          </button>
        </article>

        <article class="home-card">
          <h3>Assign a Journey</h3>
          <p>
            Give everyone the same goal while
            leaving room for different paths.
          </p>
          <button
            type="button"
            id="assign-journey-button"
          >
            Create Assignment
          </button>
        </article>

        <article class="home-card">
          <h3>Teacher Lookbook</h3>
          <p>
            A future home for shared Journey
            moments and Goal Looks.
          </p>
          <button
            type="button"
            id="teacher-lookbook-button"
          >
            Preview
          </button>
        </article>
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="teacher-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "open-demo-class-button"
    )
    .addEventListener(
      "click",
      showTeacherClass
    );

  document
    .getElementById(
      "assign-journey-button"
    )
    .addEventListener(
      "click",
      showTeacherAssignment
    );

  document
    .getElementById(
      "teacher-lookbook-button"
    )
    .addEventListener(
      "click",
      showTeacherLookbook
    );

  document
    .getElementById(
      "teacher-home-button"
    )
    .addEventListener(
      "click",
      () => window.location.reload()
    );
}

function showTeacherClass() {
  const main =
    document.querySelector("main");

  const cards =
    teacherDemoStudents
      .map((student) => {
        if (!student.shared) {
          return `
            <article class="home-card">
              <h3>
                ${escapeHtml(student.nickname)}
              </h3>
              <p>
                This learner has not shared
                Journey progress.
              </p>
              <span class="status-pill">
                Private
              </span>
            </article>
          `;
        }

        return `
          <article class="home-card">
            <h3>
              ${escapeHtml(student.nickname)}
            </h3>

            <p>
              <strong>Journey:</strong>
              ${escapeHtml(student.journey)}
            </p>

            <p>
              <strong>Current place:</strong>
              ${escapeHtml(student.step)}
            </p>

            <p>
              <strong>Status:</strong>
              ${escapeHtml(student.status)}
            </p>

            <button
              type="button"
              data-student-id="${student.id}"
              class="open-student-progress-button"
            >
              View Shared Progress
            </button>
          </article>
        `;
      })
      .join("");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="teacher-class-title"
    >
      <p class="eyebrow">
        Teacher Space · My Class
      </p>

      <h2 id="teacher-class-title">
        Shared learning paths
      </h2>

      <p class="hero-text">
        These cards describe what happened.
        They do not diagnose, rank or label
        learners.
      </p>

      <div class="home-grid">
        ${cards}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="class-dashboard-button"
        >
          Back to Teacher Space
        </button>
      </div>
    </section>
  `;

  document
    .querySelectorAll(
      ".open-student-progress-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const student =
            teacherDemoStudents.find(
              (item) =>
                item.id ===
                button.dataset.studentId
            );

          if (student) {
            showTeacherStudentProgress(
              student
            );
          }
        }
      );
    });

  document
    .getElementById(
      "class-dashboard-button"
    )
    .addEventListener(
      "click",
      showTeacherDashboard
    );
}

function showTeacherStudentProgress(student) {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="student-progress-title"
    >
      <p class="eyebrow">
        Shared Progress
      </p>

      <h2 id="student-progress-title">
        ${escapeHtml(student.nickname)}
      </h2>

      <div class="comfort-panel">
        <div class="comfort-control">
          <strong>Current Journey</strong>
          <p>
            ${escapeHtml(student.journey)}
          </p>
        </div>

        <div class="comfort-control">
          <strong>Current Place</strong>
          <p>
            ${escapeHtml(student.step)}
          </p>
        </div>

        <div class="comfort-control">
          <strong>Observation</strong>
          <p>
            ${escapeHtml(student.note)}
          </p>
        </div>

        <div class="comfort-control">
          <strong>Privacy</strong>
          <p>
            Private journal entries, personal
            accessibility preferences and
            unshared Journeys are not shown here.
          </p>
        </div>
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="student-progress-back-button"
        >
          Back to Class
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "student-progress-back-button"
    )
    .addEventListener(
      "click",
      showTeacherClass
    );
}

function showTeacherAssignment() {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="teacher-assignment-title"
    >
      <p class="eyebrow">
        Assign a Journey
      </p>

      <h2 id="teacher-assignment-title">
        Set the destination, not one fixed route.
      </h2>

      <div class="comfort-panel">
        <div class="comfort-control">
          <label for="teacher-assignment-title-input">
            Assignment
          </label>
          <input
            id="teacher-assignment-title-input"
            type="text"
            placeholder="e.g. Solar system presentation"
          />
        </div>

        <div class="comfort-control">
          <label for="teacher-assignment-goal-input">
            What should learners reach?
          </label>
          <textarea
            id="teacher-assignment-goal-input"
            rows="5"
            placeholder="Describe the shared learning goal."
          ></textarea>
        </div>

        <div class="comfort-control">
          <label for="teacher-assignment-date-input">
            Optional date
          </label>
          <input
            id="teacher-assignment-date-input"
            type="date"
          />
        </div>
      </div>

      <p>
        Learners can still use their own
        supports, change how they approach
        steps and personalise their space.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="teacher-preview-assignment-button"
        >
          Preview Assignment
        </button>

        <button
          type="button"
          class="secondary-button"
          id="assignment-dashboard-button"
        >
          Back to Teacher Space
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "teacher-preview-assignment-button"
    )
    .addEventListener(
      "click",
      () => {
        const title =
          document
            .getElementById(
              "teacher-assignment-title-input"
            )
            .value
            .trim() ||
          "New Journey";

        const goal =
          document
            .getElementById(
              "teacher-assignment-goal-input"
            )
            .value
            .trim() ||
          "Shared learning goal";

        const date =
          document
            .getElementById(
              "teacher-assignment-date-input"
            )
            .value;

        showTeacherAssignmentPreview(
          title,
          goal,
          date
        );
      }
    );

  document
    .getElementById(
      "assignment-dashboard-button"
    )
    .addEventListener(
      "click",
      showTeacherDashboard
    );
}

function showTeacherAssignmentPreview(
  title,
  goal,
  date
) {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="assignment-preview-title"
    >
      <p class="eyebrow">
        Assignment Preview
      </p>

      <h2 id="assignment-preview-title">
        ${escapeHtml(title)}
      </h2>

      <p class="hero-text">
        ${escapeHtml(goal)}
      </p>

      ${
        date
          ? `
            <p>
              <strong>Date:</strong>
              ${escapeHtml(date)}
            </p>
          `
          : `
            <p>
              No date added.
            </p>
          `
      }

      <p>
        Same Goal. Different Paths.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="edit-assignment-button"
        >
          Edit
        </button>

        <button
          type="button"
          class="secondary-button"
          id="assignment-preview-dashboard-button"
        >
          Back to Teacher Space
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "edit-assignment-button"
    )
    .addEventListener(
      "click",
      showTeacherAssignment
    );

  document
    .getElementById(
      "assignment-preview-dashboard-button"
    )
    .addEventListener(
      "click",
      showTeacherDashboard
    );
}

function showTeacherLookbook() {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="teacher-lookbook-title"
    >
      <p class="eyebrow">
        Teacher Lookbook
      </p>

      <h2 id="teacher-lookbook-title">
        Shared moments can live here.
      </h2>

      <p class="hero-text">
        This V1 is the structure only.
        Later, learner-approved Goal Looks
        and Journey moments can appear here
        without exposing private notes.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="lookbook-dashboard-button"
        >
          Back to Teacher Space
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "lookbook-dashboard-button"
    )
    .addEventListener(
      "click",
      showTeacherDashboard
    );
}

function showJourneyCard(journey) {
  const main =
    document.querySelector("main");

  const steps =
    Array.isArray(journey.steps)
      ? journey.steps
      : [];

  const currentIndex =
    Math.max(
      0,
      Math.min(
        Number(journey.currentStepIndex) || 0,
        Math.max(steps.length - 1, 0)
      )
    );

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="journey-card-title"
    >
      <p class="eyebrow">
        Journey Card
      </p>

      <h2 id="journey-card-title">
        ${escapeHtml(
          journey.title ||
            "My Journey"
        )}
      </h2>

      <div class="comfort-panel">
        <div class="comfort-control">
          <strong>Goal</strong>
          <p>
            ${escapeHtml(
              journey.goal ||
                "Keep exploring."
            )}
          </p>
        </div>

        <div class="comfort-control">
          <strong>Current Place</strong>
          <p>
            ${
              steps.length
                ? `Step ${currentIndex + 1} of ${steps.length}: ${escapeHtml(
                    steps[currentIndex].title
                  )}`
                : "Your trail is ready to begin."
            }
          </p>
        </div>

        <div class="comfort-control">
          <strong>Parked Thoughts</strong>
          <p>
            ${
              Array.isArray(
                journey.parkedThoughts
              )
                ? journey.parkedThoughts.length
                : 0
            }
            saved for later.
          </p>
        </div>
      </div>

      <p>
        Changing the plan is not failing
        the plan.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="journey-card-continue-button"
        >
          Pick Up My Trail
        </button>

        <button
          type="button"
          class="secondary-button"
          id="journey-card-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "journey-card-continue-button"
    )
    .addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          currentIndex
        );
      }
    );

  document
    .getElementById(
      "journey-card-home-button"
    )
    .addEventListener(
      "click",
      () => window.location.reload()
    );
}

function addJourneyCardShortcut() {
  const journey =
    compassStudentState.activeJourney;

  if (
    !journey ||
    document.getElementById(
      "journey-card-shortcut"
    )
  ) {
    return;
  }

  const grid =
    document.querySelector(
      ".home-grid"
    );

  if (!grid) return;

  const card =
    document.createElement(
      "article"
    );

  card.id =
    "journey-card-shortcut";
  card.className =
    "home-card";

  card.innerHTML = `
    <span
      class="card-icon"
      aria-hidden="true"
    >
      🗺️
    </span>

    <h3>My Journey Card</h3>

    <p>
      See where you are without turning
      progress into a grade.
    </p>

    <button
      type="button"
      id="open-journey-card-button"
    >
      Open Journey Card
    </button>
  `;

  grid.appendChild(card);

  document
    .getElementById(
      "open-journey-card-button"
    )
    .addEventListener(
      "click",
      () => {
        showJourneyCard(
          JSON.parse(
            JSON.stringify(
              compassStudentState
                .activeJourney
            )
          )
        );
      }
    );
}

function installProductPolishV1() {
  installTeacherButton();

  window.setTimeout(
    addJourneyCardShortcut,
    0
  );
}

window.addEventListener(
  "load",
  installProductPolishV1
);


// ------------------------------------------------------------
// Persistence V1 — this-device storage
// ------------------------------------------------------------
// This is intentionally local-only for now.
// Real cross-device accounts will require a protected backend
// and managed authentication. Secret codes must never be stored
// as plain text in production.

const compassStateKey =
  "compassTrailStudentStateV1";

const compassStudentState = {
  learnerName: "",
  activeJourney: null,
  cloudJourneyId: null,
  lastSavedAt: null,
};

function saveStudentState() {
  try {
    compassStudentState.lastSavedAt =
      new Date().toISOString();

    localStorage.setItem(
      compassStateKey,
      JSON.stringify({
        learnerName:
          compassStudentState.learnerName,
        activeJourney:
          compassStudentState.activeJourney,
        cloudJourneyId:
          compassStudentState.cloudJourneyId,
        littleThings,
        ideaGardenNotes,
        myDaysItems,
        lastSavedAt:
          compassStudentState.lastSavedAt,
      })
    );
  } catch (error) {
    console.warn(
      "Could not save Compass Trail state.",
      error
    );
  }
}

function loadStudentState() {
  try {
    const raw =
      localStorage.getItem(
        compassStateKey
      );

    if (!raw) {
      return;
    }

    const saved =
      JSON.parse(raw);

    if (
      saved &&
      typeof saved === "object"
    ) {
      compassStudentState.learnerName =
        typeof saved.learnerName ===
        "string"
          ? saved.learnerName
          : "";

      compassStudentState.activeJourney =
        saved.activeJourney || null;

      compassStudentState.cloudJourneyId =
        typeof saved.cloudJourneyId === "string"
          ? saved.cloudJourneyId
          : null;

      compassStudentState.lastSavedAt =
        saved.lastSavedAt || null;

      if (
        Array.isArray(
          saved.littleThings
        )
      ) {
        littleThings.splice(
          0,
          littleThings.length,
          ...saved.littleThings
        );
      }

      if (
        Array.isArray(
          saved.ideaGardenNotes
        )
      ) {
        ideaGardenNotes.splice(
          0,
          ideaGardenNotes.length,
          ...saved.ideaGardenNotes
        );
      }

      if (
        Array.isArray(
          saved.myDaysItems
        )
      ) {
        myDaysItems.splice(
          0,
          myDaysItems.length,
          ...saved.myDaysItems
        );
      }
    }
  } catch (error) {
    console.warn(
      "Could not restore Compass Trail state.",
      error
    );
  }
}

function rememberJourney(journey) {
  if (!journey) {
    return;
  }

  compassStudentState.activeJourney =
    JSON.parse(
      JSON.stringify(journey)
    );

  saveStudentState();
}

function installPersistenceObserver() {
  document.addEventListener(
    "click",
    () => {
      window.setTimeout(
        saveStudentState,
        0
      );
    }
  );

  document.addEventListener(
    "change",
    saveStudentState
  );

  window.addEventListener(
    "beforeunload",
    saveStudentState
  );
}

function addContinueJourneyCard() {
  const journey =
    compassStudentState.activeJourney;

  if (
    !journey ||
    !Array.isArray(journey.steps) ||
    journey.steps.length === 0
  ) {
    return;
  }

  if (
    document.getElementById(
      "continue-journey-card"
    )
  ) {
    return;
  }

  const grid =
    document.querySelector(
      ".home-grid"
    );

  if (!grid) {
    return;
  }

  const index =
    Math.max(
      0,
      Math.min(
        Number(
          journey.currentStepIndex
        ) || 0,
        journey.steps.length - 1
      )
    );

  const step =
    journey.steps[index];

  const card =
    document.createElement(
      "article"
    );

  card.id =
    "continue-journey-card";
  card.className =
    "home-card";

  card.innerHTML = `
    <span
      class="card-icon"
      aria-hidden="true"
    >
      🥾
    </span>

    <h3>
      Pick Up My Trail
    </h3>

    <p>
      ${escapeHtml(
        journey.title ||
          "Your Journey"
      )}
      · Step
      ${index + 1}
      of
      ${journey.steps.length}
      ·
      ${escapeHtml(
        step.title
      )}
    </p>

    <button
      type="button"
      id="continue-saved-journey-button"
    >
      Continue Where I Left Off
    </button>
  `;

  grid.prepend(card);

  document
    .getElementById(
      "continue-saved-journey-button"
    )
    .addEventListener(
      "click",
      () => {
        const restored =
          JSON.parse(
            JSON.stringify(
              compassStudentState
                .activeJourney
            )
          );

        showJourneyWorkspace(
          restored,
          restored.currentStepIndex ||
            0,
          "Welcome back. Your place was saved."
        );
      }
    );
}

function showThisDeviceProfile() {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="profile-title"
    >
      <p class="eyebrow">
        This Device
      </p>

      <h2 id="profile-title">
        Keep your trail here.
      </h2>

      <p class="hero-text">
        For this V1, progress is saved
        only in this browser on this device.
        No email, phone number or real name
        is required.
      </p>

      <label for="learner-name-input">
        <strong>
          Nickname
        </strong>
      </label>

      <input
        id="learner-name-input"
        type="text"
        maxlength="40"
        autocomplete="off"
        value="${escapeHtml(
          compassStudentState.learnerName
        )}"
        placeholder="Choose any nickname"
      />

      <p>
        Avoid using private information
        in your nickname.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="save-device-profile-button"
        >
          Save on This Device
        </button>

        <button
          type="button"
          class="secondary-button"
          id="device-profile-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "save-device-profile-button"
    )
    .addEventListener(
      "click",
      () => {
        compassStudentState.learnerName =
          document
            .getElementById(
              "learner-name-input"
            )
            .value
            .trim();

        saveStudentState();

        window.location.reload();
      }
    );

  document
    .getElementById(
      "device-profile-home-button"
    )
    .addEventListener(
      "click",
      () => {
        window.location.reload();
      }
    );
}

function installDeviceProfileButton() {
  if (
    document.getElementById(
      "device-profile-button"
    )
  ) {
    return;
  }

  const nav =
    document.querySelector("nav");

  if (!nav) {
    return;
  }

  const button =
    document.createElement(
      "button"
    );

  button.type = "button";
  button.id =
    "device-profile-button";
  button.className =
    "nav-button";
  button.textContent =
    compassStudentState.learnerName
      ? compassStudentState.learnerName
      : "This Device";

  button.addEventListener(
    "click",
    showThisDeviceProfile
  );

  nav.appendChild(button);
}

function bootPersistenceV1() {
  loadStudentState();
  installPersistenceObserver();
  installDeviceProfileButton();

  window.setTimeout(
    addContinueJourneyCard,
    0
  );
}


// ------------------------------------------------------------
// Accessibility + Make It Mine V1
// ------------------------------------------------------------

const compassPreferences = {
  fontFamily: "system",
  textSize: 100,
  lineSpacing: 1.6,
  letterSpacing: 0,
  textWidth: 72,
  background: "default",
  contrast: "default",
  reduceMotion: false,
  readSpeed: 1,
};

const preferenceStorageKey =
  "compassTrailPreferencesV1";

function loadCompassPreferences() {
  try {
    const saved =
      JSON.parse(
        localStorage.getItem(
          preferenceStorageKey
        )
      );

    if (
      saved &&
      typeof saved === "object"
    ) {
      Object.assign(
        compassPreferences,
        saved
      );
    }
  } catch (error) {
    console.warn(
      "Could not load preferences.",
      error
    );
  }
}

function saveCompassPreferences() {
  try {
    localStorage.setItem(
      preferenceStorageKey,
      JSON.stringify(
        compassPreferences
      )
    );
  } catch (error) {
    console.warn(
      "Could not save preferences.",
      error
    );
  }
}

function applyCompassPreferences() {
  const root =
    document.documentElement;

  const fontMap = {
    system:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    readable:
      '"Trebuchet MS", "Segoe UI", sans-serif',
    classic:
      'Georgia, "Times New Roman", serif',
    open:
      'Verdana, "Segoe UI", sans-serif',
    mono:
      '"Courier New", monospace',
  };

  const backgroundMap = {
    default: "",
    warm: "#fff9ef",
    soft: "#f4f8f4",
    blue: "#f3f8fc",
    grey: "#f5f5f3",
  };

  root.style.setProperty(
    "--comfort-font",
    fontMap[
      compassPreferences.fontFamily
    ] || fontMap.system
  );

  root.style.setProperty(
    "--comfort-text-scale",
    String(
      compassPreferences.textSize /
        100
    )
  );

  root.style.setProperty(
    "--comfort-line-height",
    String(
      compassPreferences.lineSpacing
    )
  );

  root.style.setProperty(
    "--comfort-letter-spacing",
    `${compassPreferences.letterSpacing}px`
  );

  root.style.setProperty(
    "--comfort-text-width",
    `${compassPreferences.textWidth}ch`
  );

  document.body.style.fontFamily =
    fontMap[
      compassPreferences.fontFamily
    ] || fontMap.system;

  document.body.style.fontSize =
    `${compassPreferences.textSize}%`;

  document.body.style.lineHeight =
    String(
      compassPreferences.lineSpacing
    );

  document.body.style.letterSpacing =
    `${compassPreferences.letterSpacing}px`;

  document.body.style.backgroundColor =
    backgroundMap[
      compassPreferences.background
    ] || "";

  document.body.classList.toggle(
    "comfort-high-contrast",
    compassPreferences.contrast ===
      "high"
  );

  document.body.classList.toggle(
    "comfort-reduced-motion",
    Boolean(
      compassPreferences.reduceMotion
    )
  );

  document
    .querySelectorAll(
      "p, li, textarea, input, .hero-text"
    )
    .forEach((element) => {
      element.style.maxWidth =
        `${compassPreferences.textWidth}ch`;
    });
}

function installAccessibilityStyles() {
  if (
    document.getElementById(
      "compass-accessibility-styles"
    )
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id =
    "compass-accessibility-styles";

  style.textContent = `
    body.comfort-reduced-motion *,
    body.comfort-reduced-motion *::before,
    body.comfort-reduced-motion *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }

    body.comfort-high-contrast {
      background: #ffffff !important;
      color: #111111 !important;
    }

    body.comfort-high-contrast
      .hero,
    body.comfort-high-contrast
      .home-card,
    body.comfort-high-contrast
      .material-card,
    body.comfort-high-contrast
      .path-step {
      background: #ffffff !important;
      color: #111111 !important;
      border: 2px solid #111111 !important;
      box-shadow: none !important;
    }

    body.comfort-high-contrast
      button {
      border: 2px solid currentColor !important;
    }

    .comfort-panel {
      display: grid;
      gap: 1.25rem;
      margin: 1.5rem 0;
    }

    .comfort-control {
      display: grid;
      gap: 0.5rem;
      padding: 1rem;
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.7);
    }

    .comfort-control label {
      font-weight: 700;
    }

    .comfort-control select,
    .comfort-control input[type="range"] {
      width: 100%;
      max-width: 34rem;
    }

    .comfort-preview {
      padding: 1.25rem;
      border-radius: 1rem;
      border: 1px solid rgba(0, 0, 0, 0.12);
      margin: 1rem 0 1.5rem;
    }

    .global-comfort-button {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 9999;
      border-radius: 999px;
      padding: 0.75rem 1rem;
      box-shadow: 0 4px 16px rgba(0,0,0,0.14);
    }

    .read-aloud-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      align-items: center;
      margin-top: 1rem;
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;

  document.head.appendChild(
    style
  );
}

function installTooMuchButton() {
  if (
    document.getElementById(
      "too-much-global-button"
    )
  ) {
    return;
  }

  const button =
    document.createElement(
      "button"
    );

  button.type = "button";
  button.id =
    "too-much-global-button";
  button.className =
    "secondary-button global-comfort-button";
  button.textContent =
    "Too much?";

  button.addEventListener(
    "click",
    showTooMuchPanel
  );

  document.body.appendChild(
    button
  );
}

function wireMakeItMineButtons() {
  const labels = [
    "Make It Mine",
    "Personalise My Space",
  ];

  [
    ...document.querySelectorAll(
      "button"
    ),
  ].forEach((button) => {
    if (
      labels.includes(
        button.textContent.trim()
      )
    ) {
      button.addEventListener(
        "click",
        showMakeItMine
      );
    }
  });
}

function refreshAccessibilityWiring() {
  applyCompassPreferences();
  installTooMuchButton();
  wireMakeItMineButtons();
}

loadCompassPreferences();
installAccessibilityStyles();

window.addEventListener(
  "load",
  refreshAccessibilityWiring
);

const accessibilityObserver =
  new MutationObserver(() => {
    applyCompassPreferences();
    installTooMuchButton();
  });

accessibilityObserver.observe(
  document.body,
  {
    childList: true,
    subtree: true,
  }
);

function showMakeItMine(
  notice = ""
) {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="make-it-mine-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Make It Mine
        </p>

        <h2 id="make-it-mine-title">
          Make this space easier to use.
        </h2>

        <p class="hero-text">
          You do not need to explain why
          a setting helps. Change anything,
          anytime.
        </p>
      </div>

      ${
        notice
          ? `
            <div
              class="undo-message"
              role="status"
            >
              ${escapeHtml(notice)}
            </div>
          `
          : ""
      }

      <div
        class="comfort-preview"
        id="comfort-preview"
      >
        <strong>
          Live preview
        </strong>

        <p>
          This is a small piece of text
          so you can see how your choices
          feel before you continue.
        </p>
      </div>

      <div class="comfort-panel">
        <div class="comfort-control">
          <label for="comfort-font">
            Font
          </label>

          <select id="comfort-font">
            <option value="system">
              System
            </option>
            <option value="readable">
              Rounded & readable
            </option>
            <option value="classic">
              Classic serif
            </option>
            <option value="open">
              Open & wide
            </option>
            <option value="mono">
              Monospace
            </option>
          </select>
        </div>

        <div class="comfort-control">
          <label for="comfort-text-size">
            Text size:
            <span id="text-size-value">
              ${compassPreferences.textSize}%
            </span>
          </label>

          <input
            id="comfort-text-size"
            type="range"
            min="85"
            max="150"
            step="5"
            value="${compassPreferences.textSize}"
          />
        </div>

        <div class="comfort-control">
          <label for="comfort-line-spacing">
            Line spacing:
            <span id="line-spacing-value">
              ${compassPreferences.lineSpacing}
            </span>
          </label>

          <input
            id="comfort-line-spacing"
            type="range"
            min="1.2"
            max="2.2"
            step="0.1"
            value="${compassPreferences.lineSpacing}"
          />
        </div>

        <div class="comfort-control">
          <label for="comfort-letter-spacing">
            Letter spacing:
            <span id="letter-spacing-value">
              ${compassPreferences.letterSpacing}px
            </span>
          </label>

          <input
            id="comfort-letter-spacing"
            type="range"
            min="0"
            max="4"
            step="0.5"
            value="${compassPreferences.letterSpacing}"
          />
        </div>

        <div class="comfort-control">
          <label for="comfort-text-width">
            Text width:
            <span id="text-width-value">
              ${compassPreferences.textWidth}
            </span>
          </label>

          <input
            id="comfort-text-width"
            type="range"
            min="38"
            max="90"
            step="2"
            value="${compassPreferences.textWidth}"
          />
        </div>

        <div class="comfort-control">
          <label for="comfort-background">
            Background comfort
          </label>

          <select id="comfort-background">
            <option value="default">
              Default
            </option>
            <option value="warm">
              Warm
            </option>
            <option value="soft">
              Soft green
            </option>
            <option value="blue">
              Soft blue
            </option>
            <option value="grey">
              Soft grey
            </option>
          </select>
        </div>

        <div class="comfort-control">
          <label for="comfort-contrast">
            Contrast
          </label>

          <select id="comfort-contrast">
            <option value="default">
              Default
            </option>
            <option value="high">
              High contrast
            </option>
          </select>
        </div>

        <div class="comfort-control">
          <label>
            <input
              id="comfort-motion"
              type="checkbox"
              ${
                compassPreferences.reduceMotion
                  ? "checked"
                  : ""
              }
            />
            Reduce motion
          </label>

          <p>
            Keeps the interface calmer by
            reducing animations and transitions.
          </p>
        </div>

        <div class="comfort-control">
          <label for="read-speed">
            Read-aloud speed
          </label>

          <select id="read-speed">
            <option value="0.5">
              0.5×
            </option>
            <option value="0.75">
              0.75×
            </option>
            <option value="1">
              1×
            </option>
            <option value="1.25">
              1.25×
            </option>
            <option value="1.5">
              1.5×
            </option>
            <option value="2">
              2×
            </option>
          </select>

          <div class="read-aloud-bar">
            <button
              type="button"
              class="small-action-button"
              id="read-preview-button"
            >
              Read Preview
            </button>

            <button
              type="button"
              class="small-action-button"
              id="pause-reading-button"
            >
              Pause
            </button>

            <button
              type="button"
              class="small-action-button"
              id="resume-reading-button"
            >
              Resume
            </button>

            <button
              type="button"
              class="small-action-button"
              id="stop-reading-button"
            >
              Stop
            </button>
          </div>
        </div>
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="save-comfort-button"
        >
          Keep These Settings
        </button>

        <button
          type="button"
          class="secondary-button"
          id="reset-comfort-button"
        >
          Reset Comfort Settings
        </button>

        <button
          type="button"
          class="secondary-button"
          id="comfort-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  const font =
    document.getElementById(
      "comfort-font"
    );

  const textSize =
    document.getElementById(
      "comfort-text-size"
    );

  const lineSpacing =
    document.getElementById(
      "comfort-line-spacing"
    );

  const letterSpacing =
    document.getElementById(
      "comfort-letter-spacing"
    );

  const textWidth =
    document.getElementById(
      "comfort-text-width"
    );

  const background =
    document.getElementById(
      "comfort-background"
    );

  const contrast =
    document.getElementById(
      "comfort-contrast"
    );

  const motion =
    document.getElementById(
      "comfort-motion"
    );

  const readSpeed =
    document.getElementById(
      "read-speed"
    );

  font.value =
    compassPreferences.fontFamily;

  background.value =
    compassPreferences.background;

  contrast.value =
    compassPreferences.contrast;

  readSpeed.value =
    String(
      compassPreferences.readSpeed
    );

  const updateLivePreferences =
    () => {
      compassPreferences.fontFamily =
        font.value;

      compassPreferences.textSize =
        Number(
          textSize.value
        );

      compassPreferences.lineSpacing =
        Number(
          lineSpacing.value
        );

      compassPreferences.letterSpacing =
        Number(
          letterSpacing.value
        );

      compassPreferences.textWidth =
        Number(
          textWidth.value
        );

      compassPreferences.background =
        background.value;

      compassPreferences.contrast =
        contrast.value;

      compassPreferences.reduceMotion =
        motion.checked;

      compassPreferences.readSpeed =
        Number(
          readSpeed.value
        );

      document.getElementById(
        "text-size-value"
      ).textContent =
        `${compassPreferences.textSize}%`;

      document.getElementById(
        "line-spacing-value"
      ).textContent =
        compassPreferences.lineSpacing;

      document.getElementById(
        "letter-spacing-value"
      ).textContent =
        `${compassPreferences.letterSpacing}px`;

      document.getElementById(
        "text-width-value"
      ).textContent =
        compassPreferences.textWidth;

      applyCompassPreferences();
    };

  [
    font,
    textSize,
    lineSpacing,
    letterSpacing,
    textWidth,
    background,
    contrast,
    motion,
    readSpeed,
  ].forEach((control) => {
    control.addEventListener(
      "input",
      updateLivePreferences
    );

    control.addEventListener(
      "change",
      updateLivePreferences
    );
  });

  document
    .getElementById(
      "save-comfort-button"
    )
    .addEventListener(
      "click",
      () => {
        updateLivePreferences();
        saveCompassPreferences();

        showMakeItMine(
          "Your comfort settings are saved on this device."
        );
      }
    );

  document
    .getElementById(
      "reset-comfort-button"
    )
    .addEventListener(
      "click",
      () => {
        Object.assign(
          compassPreferences,
          {
            fontFamily: "system",
            textSize: 100,
            lineSpacing: 1.6,
            letterSpacing: 0,
            textWidth: 72,
            background: "default",
            contrast: "default",
            reduceMotion: false,
            readSpeed: 1,
          }
        );

        saveCompassPreferences();
        applyCompassPreferences();

        showMakeItMine(
          "Comfort settings returned to the starting point."
        );
      }
    );

  document
    .getElementById(
      "comfort-home-button"
    )
    .addEventListener(
      "click",
      () => {
        saveCompassPreferences();
        window.location.reload();
      }
    );

  document
    .getElementById(
      "read-preview-button"
    )
    .addEventListener(
      "click",
      () => {
        speakCompassText(
          "This is a small piece of text so you can see how your choices feel before you continue."
        );
      }
    );

  document
    .getElementById(
      "pause-reading-button"
    )
    .addEventListener(
      "click",
      () => {
        if (
          "speechSynthesis" in
          window
        ) {
          window.speechSynthesis.pause();
        }
      }
    );

  document
    .getElementById(
      "resume-reading-button"
    )
    .addEventListener(
      "click",
      () => {
        if (
          "speechSynthesis" in
          window
        ) {
          window.speechSynthesis.resume();
        }
      }
    );

  document
    .getElementById(
      "stop-reading-button"
    )
    .addEventListener(
      "click",
      stopCompassReading
    );

  refreshAccessibilityWiring();
}

function speakCompassText(text) {
  if (
    !(
      "speechSynthesis" in
      window
    )
  ) {
    return;
  }

  stopCompassReading();

  const utterance =
    new SpeechSynthesisUtterance(
      text
    );

  utterance.rate =
    compassPreferences.readSpeed;

  utterance.lang =
    document.documentElement.lang ||
    "en";

  window.speechSynthesis.speak(
    utterance
  );
}

function stopCompassReading() {
  if (
    "speechSynthesis" in window
  ) {
    window.speechSynthesis.cancel();
  }
}

function showTooMuchPanel() {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="too-much-title"
    >
      <p class="eyebrow">
        Too much?
      </p>

      <h2 id="too-much-title">
        Make the space calmer now.
      </h2>

      <p class="hero-text">
        This can reduce motion, soften
        the screen and make the text
        a little easier to follow.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="calm-just-now-button"
        >
          Just for Now
        </button>

        <button
          type="button"
          class="primary-button"
          id="calm-keep-button"
        >
          Keep It This Way
        </button>

        <button
          type="button"
          class="secondary-button"
          id="too-much-settings-button"
        >
          Choose My Settings
        </button>

        <button
          type="button"
          class="secondary-button"
          id="too-much-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  const applyCalmPreset =
    (save) => {
      compassPreferences.reduceMotion =
        true;

      compassPreferences.background =
        "soft";

      compassPreferences.textSize =
        Math.max(
          105,
          compassPreferences.textSize
        );

      compassPreferences.lineSpacing =
        Math.max(
          1.7,
          compassPreferences.lineSpacing
        );

      compassPreferences.textWidth =
        Math.min(
          64,
          compassPreferences.textWidth
        );

      applyCompassPreferences();

      if (save) {
        saveCompassPreferences();
      }

      showMakeItMine(
        save
          ? "Calmer settings are saved."
          : "Calmer settings are active for now."
      );
    };

  document
    .getElementById(
      "calm-just-now-button"
    )
    .addEventListener(
      "click",
      () => {
        applyCalmPreset(false);
      }
    );

  document
    .getElementById(
      "calm-keep-button"
    )
    .addEventListener(
      "click",
      () => {
        applyCalmPreset(true);
      }
    );

  document
    .getElementById(
      "too-much-settings-button"
    )
    .addEventListener(
      "click",
      () => {
        showMakeItMine();
      }
    );

  document
    .getElementById(
      "too-much-home-button"
    )
    .addEventListener(
      "click",
      () => {
        window.location.reload();
      }
    );

  refreshAccessibilityWiring();
}


// ------------------------------------------------------------
// Core Student Experience V1
// Little Things + My Days + Idea Garden + Toolkit + Home Recharge
// ------------------------------------------------------------

const littleThings = [];
const ideaGardenNotes = [];
const myDaysItems = [];

bootPersistenceV1();

function findButtonByLabel(label) {
  return [...document.querySelectorAll("button")]
    .find(
      (button) =>
        button.textContent.trim() === label
    );
}

function wireHomeExperience() {
  const littleThingsButton =
    findButtonByLabel("Open Little Things");

  if (littleThingsButton) {
    littleThingsButton.addEventListener(
      "click",
      showLittleThings
    );
  }

  const myDaysButton =
    findButtonByLabel("Open My Days");

  if (myDaysButton) {
    myDaysButton.addEventListener(
      "click",
      showMyDays
    );
  }

  const ideaGardenButton =
    findButtonByLabel("Open Idea Garden");

  if (ideaGardenButton) {
    ideaGardenButton.addEventListener(
      "click",
      showIdeaGarden
    );
  }

  const rechargeButton =
    findButtonByLabel("Take a Break");

  if (rechargeButton) {
    rechargeButton.addEventListener(
      "click",
      showHomeRechargeCove
    );
  }

  const keepExploringButton =
    findButtonByLabel("Keep Exploring");

  if (keepExploringButton) {
    keepExploringButton.addEventListener(
      "click",
      showToolkitHub
    );
  }
}

wireHomeExperience();

function backHome() {
  window.location.reload();
}

function showLittleThings(
  notice = ""
) {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="little-things-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Little Things
        </p>

        <h2 id="little-things-title">
          Small things can stay small.
        </h2>

        <p class="hero-text">
          Add quick tasks that do not need
          a whole Journey.
        </p>
      </div>

      ${
        notice
          ? `
            <div
              class="undo-message"
              role="status"
            >
              <span>
                ${escapeHtml(notice)}
              </span>
            </div>
          `
          : ""
      }

      <div class="material-actions">
        <label for="little-thing-input">
          <strong>
            What do you want to remember?
          </strong>
        </label>

        <input
          id="little-thing-input"
          type="text"
          maxlength="160"
          placeholder="Example: Put the book in my bag"
        />

        <button
          type="button"
          class="primary-button"
          id="add-little-thing-button"
        >
          Add Little Thing
        </button>
      </div>

      <div
        class="material-list"
        id="little-things-list"
        aria-live="polite"
      >
        ${renderLittleThings()}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="little-things-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "add-little-thing-button"
    )
    .addEventListener(
      "click",
      () => {
        const input =
          document.getElementById(
            "little-thing-input"
          );

        const value =
          input.value.trim();

        if (!value) {
          input.focus();
          return;
        }

        littleThings.push({
          id: Date.now(),
          text: value,
          done: false,
        });

        showLittleThings(
          "Added to Little Things."
        );
      }
    );

  document
    .querySelectorAll(
      ".little-thing-toggle"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const item =
            littleThings.find(
              (entry) =>
                entry.id ===
                Number(
                  button.dataset.id
                )
            );

          if (!item) {
            return;
          }

          item.done = !item.done;

          showLittleThings(
            item.done
              ? "A little trail mark added. You can undo it anytime."
              : "Put back on your list."
          );
        }
      );
    });

  document
    .querySelectorAll(
      ".little-thing-remove"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const index =
            littleThings.findIndex(
              (entry) =>
                entry.id ===
                Number(
                  button.dataset.id
                )
            );

          if (index < 0) {
            return;
          }

          littleThings.splice(
            index,
            1
          );

          showLittleThings(
            "Let go of that one."
          );
        }
      );
    });

  document
    .getElementById(
      "little-things-home-button"
    )
    .addEventListener(
      "click",
      backHome
    );
}

function renderLittleThings() {
  if (
    littleThings.length === 0
  ) {
    return `
      <article class="material-card">
        <div>
          <h3>
            Nothing waiting here.
          </h3>

          <p>
            Add something small whenever
            you want.
          </p>
        </div>
      </article>
    `;
  }

  return littleThings
    .map(
      (item) => `
        <article class="material-card">
          <div>
            <h3>
              ${escapeHtml(
                item.text
              )}
            </h3>

            <p>
              ${
                item.done
                  ? "Trail mark added."
                  : "Waiting for you."
              }
            </p>
          </div>

          <div class="material-card-actions">
            <button
              type="button"
              class="small-action-button little-thing-toggle"
              data-id="${item.id}"
            >
              ${
                item.done
                  ? "Undo"
                  : "Leave a Trail"
              }
            </button>

            <button
              type="button"
              class="small-action-button little-thing-remove"
              data-id="${item.id}"
            >
              Let This Go
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function showIdeaGarden(
  notice = ""
) {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="idea-garden-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          My Idea Garden
        </p>

        <h2 id="idea-garden-title">
          A place for things worth keeping.
        </h2>

        <p class="hero-text">
          Notes can be unfinished,
          tiny, messy or still becoming.
        </p>
      </div>

      ${
        notice
          ? `
            <div
              class="undo-message"
              role="status"
            >
              ${escapeHtml(notice)}
            </div>
          `
          : ""
      }

      <div class="material-actions">
        <label for="idea-garden-input">
          <strong>
            Add a note or idea
          </strong>
        </label>

        <textarea
          id="idea-garden-input"
          rows="6"
          maxlength="1200"
          placeholder="Write anything you want to keep..."
        ></textarea>

        <button
          type="button"
          class="primary-button"
          id="save-idea-button"
        >
          Plant This Idea
        </button>
      </div>

      <div class="material-list">
        ${renderIdeaGarden()}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="idea-garden-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "save-idea-button"
    )
    .addEventListener(
      "click",
      () => {
        const input =
          document.getElementById(
            "idea-garden-input"
          );

        const value =
          input.value.trim();

        if (!value) {
          input.focus();
          return;
        }

        ideaGardenNotes.unshift({
          id: Date.now(),
          text: value,
        });

        showIdeaGarden(
          "Your idea is saved here."
        );
      }
    );

  document
    .querySelectorAll(
      ".idea-remove-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const index =
            ideaGardenNotes.findIndex(
              (note) =>
                note.id ===
                Number(
                  button.dataset.id
                )
            );

          if (index >= 0) {
            ideaGardenNotes.splice(
              index,
              1
            );
          }

          showIdeaGarden(
            "That note is no longer in your garden."
          );
        }
      );
    });

  document
    .getElementById(
      "idea-garden-home-button"
    )
    .addEventListener(
      "click",
      backHome
    );
}

function renderIdeaGarden() {
  if (
    ideaGardenNotes.length === 0
  ) {
    return `
      <article class="material-card">
        <div>
          <h3>
            Your garden has room.
          </h3>

          <p>
            Your first note can be
            as small as one sentence.
          </p>
        </div>
      </article>
    `;
  }

  return ideaGardenNotes
    .map(
      (note) => `
        <article class="material-card">
          <div>
            <h3>
              Saved Idea
            </h3>

            <p>
              ${escapeHtml(
                note.text
              )}
            </p>
          </div>

          <div class="material-card-actions">
            <button
              type="button"
              class="small-action-button idea-remove-button"
              data-id="${note.id}"
            >
              Let This Go
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function showMyDays(
  notice = ""
) {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="my-days-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          My Days
        </p>

        <h2 id="my-days-title">
          Plans can change.
        </h2>

        <p class="hero-text">
          Put something on a day when
          that helps. Move or remove it
          whenever the plan changes.
        </p>
      </div>

      ${
        notice
          ? `
            <div
              class="undo-message"
              role="status"
            >
              ${escapeHtml(notice)}
            </div>
          `
          : ""
      }

      <div class="material-actions">
        <label for="my-days-text">
          <strong>
            What is waiting for you?
          </strong>
        </label>

        <input
          id="my-days-text"
          type="text"
          maxlength="180"
          placeholder="Example: Read chapter 3"
        />

        <label for="my-days-date">
          <strong>
            Choose a day
          </strong>
        </label>

        <input
          id="my-days-date"
          type="date"
        />

        <label for="my-days-reminder">
          <strong>
            Reminder
          </strong>
        </label>

        <select id="my-days-reminder">
          <option value="none">
            No reminder
          </option>

          <option value="at-time">
            At the time
          </option>

          <option value="10-min">
            10 minutes before
          </option>

          <option value="30-min">
            30 minutes before
          </option>

          <option value="1-hour">
            1 hour before
          </option>

          <option value="day-before">
            Day before
          </option>
        </select>

        <button
          type="button"
          class="primary-button"
          id="add-my-days-item-button"
        >
          Add to My Days
        </button>
      </div>

      <div class="material-list">
        ${renderMyDays()}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="my-days-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "add-my-days-item-button"
    )
    .addEventListener(
      "click",
      () => {
        const textInput =
          document.getElementById(
            "my-days-text"
          );

        const dateInput =
          document.getElementById(
            "my-days-date"
          );

        const reminderInput =
          document.getElementById(
            "my-days-reminder"
          );

        const value =
          textInput.value.trim();

        if (!value) {
          textInput.focus();
          return;
        }

        myDaysItems.push({
          id: Date.now(),
          text: value,
          date:
            dateInput.value ||
            "No date yet",
          reminder:
            reminderInput.value,
        });

        showMyDays(
          "Added to My Days."
        );
      }
    );

  document
    .querySelectorAll(
      ".my-days-remove-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const index =
            myDaysItems.findIndex(
              (item) =>
                item.id ===
                Number(
                  button.dataset.id
                )
            );

          if (index >= 0) {
            myDaysItems.splice(
              index,
              1
            );
          }

          showMyDays(
            "The plan changed. That item was removed."
          );
        }
      );
    });

  document
    .getElementById(
      "my-days-home-button"
    )
    .addEventListener(
      "click",
      backHome
    );
}

function renderMyDays() {
  if (
    myDaysItems.length === 0
  ) {
    return `
      <article class="material-card">
        <div>
          <h3>
            Nothing planned yet.
          </h3>

          <p>
            My Days is optional.
            Use it only when a date helps.
          </p>
        </div>
      </article>
    `;
  }

  const reminderLabels = {
    none: "No reminder",
    "at-time": "At the time",
    "10-min": "10 minutes before",
    "30-min": "30 minutes before",
    "1-hour": "1 hour before",
    "day-before": "Day before",
  };

  return [...myDaysItems]
    .sort(
      (a, b) =>
        String(a.date).localeCompare(
          String(b.date)
        )
    )
    .map(
      (item) => `
        <article class="material-card">
          <div>
            <h3>
              ${escapeHtml(
                item.text
              )}
            </h3>

            <p>
              ${escapeHtml(
                item.date
              )}
              ·
              ${escapeHtml(
                reminderLabels[
                  item.reminder
                ] ||
                  "No reminder"
              )}
            </p>
          </div>

          <div class="material-card-actions">
            <button
              type="button"
              class="small-action-button my-days-remove-button"
              data-id="${item.id}"
            >
              Change the Plan
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function showToolkitHub() {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="toolkit-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          My Toolkit
        </p>

        <h2 id="toolkit-title">
          Pick the support that helps now.
        </h2>

        <p class="hero-text">
          Support is a tool, not a penalty.
          You do not need a reason to use one.
        </p>
      </div>

      <div class="home-grid">
        ${toolkitCard(
          "🧩",
          "Make It Smaller",
          "Turn something big into a few tiny moves."
        )}

        ${toolkitCard(
          "🌱",
          "Starting Sparks",
          "Find a softer first move when starting feels sticky."
        )}

        ${toolkitCard(
          "🅿️",
          "Park It",
          "Put an unrelated thought somewhere safe for later."
        )}

        ${toolkitCard(
          "🌿",
          "Recharge Cove",
          "Take a pause without losing your place."
        )}

        ${toolkitCard(
          "📖",
          "Read With Me",
          "A home for read-aloud and reading supports as we build them."
        )}

        ${toolkitCard(
          "🧠",
          "Memory Tools",
          "Chunking, mind maps and memory supports are coming into this toolkit."
        )}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="toolkit-recharge-button"
        >
          Open Recharge Cove
        </button>

        <button
          type="button"
          class="secondary-button"
          id="toolkit-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "toolkit-recharge-button"
    )
    .addEventListener(
      "click",
      showHomeRechargeCove
    );

  document
    .getElementById(
      "toolkit-home-button"
    )
    .addEventListener(
      "click",
      backHome
    );
}

function toolkitCard(
  icon,
  title,
  description
) {
  return `
    <article class="home-card">
      <span
        class="card-icon"
        aria-hidden="true"
      >
        ${icon}
      </span>

      <h3>
        ${title}
      </h3>

      <p>
        ${description}
      </p>
    </article>
  `;
}

function showHomeRechargeCove() {
  const main =
    document.querySelector("main");

  const ideas = [
    "Look away from the screen and notice three things around you.",
    "Stretch your hands, shoulders or back in a comfortable way.",
    "Get a drink of water.",
    "Stand up or change position for a moment.",
    "Take ten slow steps if you have space.",
    "Close your eyes or soften your gaze for a short moment.",
    "Listen to one song or a short piece of music.",
    "Doodle or make a few marks on paper.",
    "Take a quiet minute without doing the task.",
    "Choose your own kind of break.",
  ];

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="home-recharge-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Recharge Cove
        </p>

        <h2 id="home-recharge-title">
          A pause does not erase progress.
        </h2>

        <p class="hero-text">
          Choose any kind of break that helps.
          No timer is required.
        </p>
      </div>

      <div class="suggested-path">
        ${ideas
          .map(
            (idea, index) =>
              pathStep(
                index + 1,
                `Break idea ${index + 1}`,
                escapeHtml(idea)
              )
          )
          .join("")}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="recharge-home-button"
        >
          Back Home
        </button>

        <button
          type="button"
          class="secondary-button"
          id="recharge-toolkit-button"
        >
          My Toolkit
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "recharge-home-button"
    )
    .addEventListener(
      "click",
      backHome
    );

  document
    .getElementById(
      "recharge-toolkit-button"
    )
    .addEventListener(
      "click",
      showToolkitHub
    );
}

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

  const reviewedCount =
    materialBasket.filter(
      (material) =>
        material.extractionStatus ===
        "confirmed"
    ).length;

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

        ${
          reviewedCount > 0
            ? `${reviewedCount} ${
                reviewedCount === 1
                  ? "material has"
                  : "materials have"
              } checked text ready to help shape your path.`
            : `You can still build a path now. Checking the text first can make the suggestion more specific.`
        }
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
            science presentation,
            maths homework
            or a chapter to read.
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

        const journey =
          buildJourneySuggestion(
            journeyTitle,
            journeyGoal
          );

        showFirstJourneyPath(
          journey
        );
      }
    );
}

function getJourneySourceText() {
  return materialBasket
    .map((material) => {
      if (
        material.extractionStatus ===
          "confirmed" &&
        material.extractedText
      ) {
        return material.extractedText;
      }

      if (
        material.type === "text" &&
        material.text
      ) {
        return material.text;
      }

      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

function buildJourneySuggestion(
  journeyTitle,
  journeyGoal
) {
  const sourceText =
    getJourneySourceText();

  const analysisText = [
    journeyTitle,
    journeyGoal,
    sourceText,
  ]
    .join("\n")
    .toLowerCase();

  const taskType =
    detectJourneyTaskType(
      analysisText
    );

  return {
    title: journeyTitle,
    goal: journeyGoal,
    taskType,
    sourceText,
    steps:
      createJourneySteps(
        taskType
      ).map(
        (step) => ({
          id: crypto.randomUUID(),
          title: step.title,
          description:
            step.description,
        })
      ),
  };
}

function detectJourneyTaskType(text) {
  const scores = {
    reading: 0,
    writing: 0,
    questions: 0,
    study: 0,
    maths: 0,
    presentation: 0,
    research: 0,
    project: 0,
  };

  const keywordGroups = {
    reading: [
      "read",
      "reading",
      "chapter",
      "article",
      "book",
      "text",
      "passage",
      "oku",
      "okuma",
      "metin",
      "makale",
      "bölüm",
      "kitap",
    ],

    writing: [
      "write",
      "writing",
      "essay",
      "paragraph",
      "report",
      "draft",
      "compose",
      "yaz",
      "yazma",
      "yazı",
      "kompozisyon",
      "paragraf",
      "rapor",
      "makale yaz",
    ],

    questions: [
      "answer",
      "question",
      "questions",
      "worksheet",
      "exercise",
      "complete the",
      "cevap",
      "soru",
      "sorular",
      "çalışma kağıdı",
      "alıştırma",
      "etkinlik",
    ],

    study: [
      "study",
      "exam",
      "test",
      "quiz",
      "revision",
      "review",
      "memorize",
      "remember",
      "çalış",
      "sınav",
      "test",
      "tekrar",
      "ezber",
      "hatırla",
    ],

    maths: [
      "math",
      "maths",
      "mathematics",
      "calculate",
      "equation",
      "solve",
      "fraction",
      "algebra",
      "geometry",
      "matematik",
      "hesapla",
      "denklem",
      "çöz",
      "kesir",
      "cebir",
      "geometri",
    ],

    presentation: [
      "presentation",
      "slides",
      "slide",
      "present",
      "powerpoint",
      "sunum",
      "slayt",
      "sunmak",
    ],

    research: [
      "research",
      "sources",
      "source",
      "investigate",
      "find information",
      "araştır",
      "araştırma",
      "kaynak",
      "bilgi bul",
    ],

    project: [
      "project",
      "create",
      "make",
      "build",
      "design",
      "poster",
      "model",
      "proje",
      "oluştur",
      "hazırla",
      "tasarla",
      "poster",
      "model",
    ],
  };

  Object.entries(
    keywordGroups
  ).forEach(
    ([type, keywords]) => {
      keywords.forEach(
        (keyword) => {
          if (
            text.includes(keyword)
          ) {
            scores[type] +=
              keyword.length > 6
                ? 2
                : 1;
          }
        }
      );
    }
  );

  const ranked =
    Object.entries(scores)
      .sort(
        (a, b) =>
          b[1] - a[1]
      );

  if (
    ranked[0][1] === 0
  ) {
    return "general";
  }

  return ranked[0][0];
}

function createJourneySteps(
  taskType
) {
  const paths = {
    reading: [
      {
        title: "Take a Peek",
        description:
          "Look over the material before reading closely. Notice headings, questions and anything that stands out.",
      },
      {
        title: "Dip In",
        description:
          "Read the first manageable section without needing to finish everything at once.",
      },
      {
        title: "Drop an Anchor",
        description:
          "Pause and mark the main idea, an important detail or something you want to return to.",
      },
      {
        title: "Keep Swimming",
        description:
          "Continue with the next small section and use support whenever the text feels heavy.",
      },
      {
        title: "Gather What Stayed",
        description:
          "Collect the ideas, answers or notes that matter for what you need to do next.",
      },
    ],

    writing: [
      {
        title: "Catch the Sparks",
        description:
          "Collect rough ideas, useful words and anything you might want to say. They do not need to be organised yet.",
      },
      {
        title: "Find What Belongs Together",
        description:
          "Group related ideas so you can see the shape of what you want to write.",
      },
      {
        title: "Give It a Backbone",
        description:
          "Choose a simple order for the beginning, middle and ending.",
      },
      {
        title: "Let It Be Messy",
        description:
          "Write a first version without trying to make every sentence perfect.",
      },
      {
        title: "See With Fresh Eyes",
        description:
          "Read it again and change anything that would make your meaning clearer.",
      },
      {
        title: "Final Polish",
        description:
          "Check the details that matter for this task and decide when it feels ready.",
      },
    ],

    questions: [
      {
        title: "See What’s Here",
        description:
          "Look through the questions and notice what kinds of answers they are asking for.",
      },
      {
        title: "Find an Easy Entry",
        description:
          "Choose one question that feels possible to start with.",
      },
      {
        title: "One Question at a Time",
        description:
          "Work through a small group instead of holding the whole worksheet in mind.",
      },
      {
        title: "Park the Sticky Ones",
        description:
          "Set aside questions that need more help and keep moving where you can.",
      },
      {
        title: "Come Back With Clues",
        description:
          "Return to the parked questions with notes, examples or another support.",
      },
      {
        title: "Take a Fresh Look",
        description:
          "Check that each answer says what you mean before you finish.",
      },
    ],

    study: [
      {
        title: "Find the Territory",
        description:
          "Notice what topics, pages or ideas you actually need to know.",
      },
      {
        title: "Make It Bite-Sized",
        description:
          "Split the material into a few small study chunks.",
      },
      {
        title: "Make It Stick",
        description:
          "Choose a memory support such as chunking, a mnemonic, a mind map or examples.",
      },
      {
        title: "Try It Without Looking",
        description:
          "Recall a small part from memory and notice what is already staying with you.",
      },
      {
        title: "Return to the Gaps",
        description:
          "Spend your next bit of energy only on the parts that still need attention.",
      },
      {
        title: "One Last Check",
        description:
          "Do a short final recall and decide what would be most useful to revisit later.",
      },
    ],

    maths: [
      {
        title: "Meet the Problem",
        description:
          "Look at what the question gives you without rushing to calculate.",
      },
      {
        title: "Find What You Know",
        description:
          "Mark the numbers, facts, rules or examples that might help.",
      },
      {
        title: "Find What You’re Looking For",
        description:
          "Say what the problem wants you to find in your own words.",
      },
      {
        title: "Pick Something to Try",
        description:
          "Choose a method, formula, drawing or first calculation.",
      },
      {
        title: "One Move at a Time",
        description:
          "Work through the solution in small visible steps.",
      },
      {
        title: "Look Back",
        description:
          "Check whether the answer fits the question and revisit a step if you want to.",
      },
    ],

    presentation: [
      {
        title: "Go on a Clue Hunt",
        description:
          "Find the topic, instructions, audience and anything the presentation must include.",
      },
      {
        title: "Fill Your Basket",
        description:
          "Collect the facts, examples, images or ideas you may want to use.",
      },
      {
        title: "Make the Pieces Fit",
        description:
          "Group related information and decide what belongs together.",
      },
      {
        title: "Build the Bones",
        description:
          "Choose a simple slide order before worrying about decoration.",
      },
      {
        title: "Bring It to Life",
        description:
          "Add the words and visuals that help each slide communicate one clear idea.",
      },
      {
        title: "Give It a Test-Drive",
        description:
          "Run through the presentation and change anything that feels crowded or unclear.",
      },
      {
        title: "Ready to Send It Off",
        description:
          "Check the final details and decide when it is ready to share.",
      },
    ],

    research: [
      {
        title: "Name the Trail",
        description:
          "Turn the task into one clear question or thing you want to find out.",
      },
      {
        title: "Gather Some Leads",
        description:
          "List useful search words, places to look and sources you already have.",
      },
      {
        title: "Follow One Lead",
        description:
          "Explore one source at a time and collect only the information that helps your question.",
      },
      {
        title: "Keep the Useful Pieces",
        description:
          "Save key facts, examples and where each one came from.",
      },
      {
        title: "Make the Connections",
        description:
          "Group what you found and notice where sources agree, differ or leave gaps.",
      },
      {
        title: "Shape What You Found",
        description:
          "Turn your research into the form the task needs: notes, writing, slides or something else.",
      },
    ],

    project: [
      {
        title: "See the Whole Shape",
        description:
          "Look at what you are making and what the finished result needs to include.",
      },
      {
        title: "Gather the Pieces",
        description:
          "Collect the information, materials and ideas you will need.",
      },
      {
        title: "Choose a Starting Piece",
        description:
          "Pick one small part that can move the project forward.",
      },
      {
        title: "Build in Small Pieces",
        description:
          "Work on one manageable section at a time.",
      },
      {
        title: "Take a Fresh Look",
        description:
          "Pause, look at what you have and change the plan if another path works better.",
      },
      {
        title: "Bring the Pieces Together",
        description:
          "Combine the parts, check the task requirements and decide what still matters.",
      },
    ],

    general: [
      {
        title: "Take a Look Around",
        description:
          "See what you brought and get a feel for the task.",
      },
      {
        title: "Find the Clues",
        description:
          "Notice what the task is asking you to do.",
      },
      {
        title: "Make the Pieces Smaller",
        description:
          "Turn the task into a few manageable parts.",
      },
      {
        title: "Choose Your First Move",
        description:
          "Start with one clear, small action.",
      },
      {
        title: "Take a Fresh Look",
        description:
          "Pause and change the path if another way would work better.",
      },
    ],
  };

  return paths[taskType] ||
    paths.general;
}

function getTaskTypeLabel(
  taskType
) {
  const labels = {
    reading: "Reading",
    writing: "Writing",
    questions: "Questions & Worksheet",
    study: "Study & Revision",
    maths: "Maths",
    presentation: "Presentation",
    research: "Research",
    project: "Project",
    general: "Flexible Path",
  };

  return labels[taskType] ||
    labels.general;
}

function showFirstJourneyPath(
  journey
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
          Your Suggested Path
        </p>

        <h2 id="first-path-title">
          ${escapeHtml(
            journey.title
          )}
        </h2>

        ${
          journey.goal
            ? `
              <p class="hero-text">
                ${escapeHtml(
                  journey.goal
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

        <p class="hero-text">
          Compass Trail noticed this looks most like:
          <strong>
            ${escapeHtml(
              getTaskTypeLabel(
                journey.taskType
              )
            )}
          </strong>.
          You can still change every step.
        </p>

        <p class="path-note">
          This path is a suggestion.
          Make it yours.
        </p>
      </div>

      <div
        class="suggested-path"
        id="journey-step-list"
      >
        ${journey.steps
          .map(
            (step, index) =>
              editablePathStep(
                step,
                index,
                journey.steps.length
              )
          )
          .join("")}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="add-path-step-button"
        >
          Add a Step
        </button>

        <button
          type="button"
          class="primary-button"
          id="start-journey-button"
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

  connectJourneyStepEvents(
    journey
  );

  document
    .getElementById(
      "add-path-step-button"
    )
    .addEventListener(
      "click",
      () => {
        const title =
          window.prompt(
            "What would you like to add to your path?"
          );

        if (
          title === null ||
          !title.trim()
        ) {
          return;
        }

        journey.steps.push({
          id: crypto.randomUUID(),
          title:
            title.trim().slice(
              0,
              100
            ),
          description:
            "A step you added to make this path work better for you.",
        });

        showFirstJourneyPath(
          journey
        );
      }
    );

  document
    .getElementById(
      "start-journey-button"
    )
    .addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          0
        );
      }
    );

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

function editablePathStep(
  step,
  index,
  total
) {
  return `
    <article
      class="path-step"
      data-step-id="${step.id}"
    >
      <span>
        ${index + 1}
      </span>

      <div>
        <h3>
          ${escapeHtml(
            step.title
          )}
        </h3>

        <p>
          ${escapeHtml(
            step.description
          )}
        </p>

        <div class="material-card-actions">
          <button
            type="button"
            class="small-action-button edit-path-step-button"
            data-step-id="${step.id}"
          >
            Edit
          </button>

          <button
            type="button"
            class="small-action-button move-path-step-up-button"
            data-step-id="${step.id}"
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
            class="small-action-button move-path-step-down-button"
            data-step-id="${step.id}"
            ${
              index === total - 1
                ? "disabled"
                : ""
            }
          >
            Move Down
          </button>

          <button
            type="button"
            class="small-action-button remove-path-step-button"
            data-step-id="${step.id}"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  `;
}

function connectJourneyStepEvents(
  journey
) {
  document
    .querySelectorAll(
      ".edit-path-step-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const step =
            journey.steps.find(
              (item) =>
                item.id ===
                button.dataset.stepId
            );

          if (!step) {
            return;
          }

          const newTitle =
            window.prompt(
              "Change this step:",
              step.title
            );

          if (
            newTitle === null ||
            !newTitle.trim()
          ) {
            return;
          }

          step.title =
            newTitle
              .trim()
              .slice(0, 100);

          showFirstJourneyPath(
            journey
          );
        }
      );
    });

  document
    .querySelectorAll(
      ".move-path-step-up-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          moveJourneyStep(
            journey,
            button.dataset.stepId,
            -1
          );
        }
      );
    });

  document
    .querySelectorAll(
      ".move-path-step-down-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          moveJourneyStep(
            journey,
            button.dataset.stepId,
            1
          );
        }
      );
    });

  document
    .querySelectorAll(
      ".remove-path-step-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const index =
            journey.steps.findIndex(
              (item) =>
                item.id ===
                button.dataset.stepId
            );

          if (index === -1) {
            return;
          }

          journey.steps.splice(
            index,
            1
          );

          showFirstJourneyPath(
            journey
          );
        }
      );
    });
}

function moveJourneyStep(
  journey,
  stepId,
  direction
) {
  const index =
    journey.steps.findIndex(
      (step) =>
        step.id === stepId
    );

  if (index === -1) {
    return;
  }

  const newIndex =
    index + direction;

  if (
    newIndex < 0 ||
    newIndex >=
      journey.steps.length
  ) {
    return;
  }

  const [step] =
    journey.steps.splice(
      index,
      1
    );

  journey.steps.splice(
    newIndex,
    0,
    step
  );

  showFirstJourneyPath(
    journey
  );
}

function showJourneyWorkspace(
  journey,
  stepIndex,
  notice = ""
) {
  const main =
    document.querySelector("main");

  if (
    journey.steps.length === 0
  ) {
    showFirstJourneyPath(
      journey
    );
    return;
  }

  const safeIndex =
    clamp(
      stepIndex,
      0,
      journey.steps.length - 1
    );

  journey.currentStepIndex =
    safeIndex;

  rememberJourney(journey);

  const step =
    journey.steps[safeIndex];

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="workspace-title"
    >
      <p class="eyebrow">
        ${safeIndex + 1}
        of
        ${journey.steps.length}
      </p>

      <h2 id="workspace-title">
        ${escapeHtml(
          step.title
        )}
      </h2>

      <p class="hero-text">
        ${escapeHtml(
          step.description
        )}
      </p>

      ${
        notice
          ? `
            <div
              class="undo-message"
              role="status"
            >
              <span>
                ${escapeHtml(notice)}
              </span>
            </div>
          `
          : ""
      }

      <p class="path-note">
        Same Goal. Different Paths.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="smaller-step-button"
        >
          Make This Smaller
        </button>

        <button
          type="button"
          class="secondary-button"
          id="cant-start-button"
        >
          I Can’t Start
        </button>

        <button
          type="button"
          class="secondary-button"
          id="different-way-button"
        >
          This Way Isn’t Working
        </button>

        <button
          type="button"
          class="secondary-button"
          id="park-it-button"
        >
          Park It
        </button>

        <button
          type="button"
          class="secondary-button"
          id="take-break-button"
        >
          Take a Break
        </button>

        <button
          type="button"
          class="secondary-button"
          id="where-was-i-button"
        >
          Where Was I?
        </button>

        ${
          safeIndex > 0
            ? `
              <button
                type="button"
                class="secondary-button"
                id="previous-journey-step-button"
              >
                Previous Step
              </button>
            `
            : ""
        }

        ${
          safeIndex <
          journey.steps.length - 1
            ? `
              <button
                type="button"
                class="primary-button"
                id="next-journey-step-button"
              >
                This Step Is Done
              </button>
            `
            : `
              <button
                type="button"
                class="primary-button"
                id="finish-journey-button"
              >
                Finish for Now
              </button>
            `
        }

        <button
          type="button"
          class="secondary-button"
          id="change-path-button"
        >
          Change My Path
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "smaller-step-button"
    )
    .addEventListener(
      "click",
      () => {
        showMiniSteps(
          journey,
          safeIndex
        );
      }
    );

  document
    .getElementById(
      "cant-start-button"
    )
    .addEventListener(
      "click",
      () => {
        showCantStartSupport(
          journey,
          safeIndex
        );
      }
    );

  document
    .getElementById(
      "different-way-button"
    )
    .addEventListener(
      "click",
      () => {
        showDifferentWaySupport(
          journey,
          safeIndex
        );
      }
    );

  document
    .getElementById(
      "park-it-button"
    )
    .addEventListener(
      "click",
      () => {
        showParkIt(
          journey,
          safeIndex
        );
      }
    );

  document
    .getElementById(
      "take-break-button"
    )
    .addEventListener(
      "click",
      () => {
        showRechargeCove(
          journey,
          safeIndex
        );
      }
    );

  document
    .getElementById(
      "where-was-i-button"
    )
    .addEventListener(
      "click",
      () => {
        showWhereWasI(
          journey,
          safeIndex
        );
      }
    );

  const previousButton =
    document.getElementById(
      "previous-journey-step-button"
    );

  if (previousButton) {
    previousButton.addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          safeIndex - 1
        );
      }
    );
  }

  const nextButton =
    document.getElementById(
      "next-journey-step-button"
    );

  if (nextButton) {
    nextButton.addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          safeIndex + 1,
          "That step is behind you. Here’s the next part of your trail."
        );
      }
    );
  }

  const finishButton =
    document.getElementById(
      "finish-journey-button"
    );

  if (finishButton) {
    finishButton.addEventListener(
      "click",
      () => {
        showJourneyPauseScreen(
          journey
        );
      }
    );
  }

  document
    .getElementById(
      "change-path-button"
    )
    .addEventListener(
      "click",
      () => {
        showFirstJourneyPath(
          journey
        );
      }
    );
}

function getMiniStepsForStep(
  journey,
  step
) {
  const title =
    step.title.toLowerCase();

  const special = {
    "go on a clue hunt": [
      "Find the exact topic or question.",
      "Find the instructions or requirements.",
      "Notice who the work is for.",
      "Mark anything that must be included.",
    ],
    "fill your basket": [
      "Choose one useful fact or idea.",
      "Find one example, image or detail that supports it.",
      "Save where it came from if you will need the source later.",
    ],
    "make the pieces fit": [
      "Put similar ideas next to each other.",
      "Choose which group should come first.",
      "Move anything that does not fit yet into a temporary parking spot.",
    ],
    "build the bones": [
      "Write the title or opening.",
      "Give each main idea its own place.",
      "Add a simple ending or final point.",
    ],
    "bring it to life": [
      "Work on just one section or slide.",
      "Keep one clear idea in that section.",
      "Add only the words or visuals that help that idea.",
    ],
    "give it a test-drive": [
      "Look through it once from beginning to end.",
      "Notice one place that feels crowded or unclear.",
      "Change that one place first.",
    ],
    "ready to send it off": [
      "Check the task requirements once more.",
      "Check names, titles or files that need to be included.",
      "Choose whether it feels ready to share.",
    ],
    "meet the problem": [
      "Read only the question.",
      "Circle or note the information you were given.",
      "Say what the question is asking for.",
    ],
    "find what you know": [
      "Write down the numbers or facts you already have.",
      "Notice any rule, formula or example that looks familiar.",
      "Choose one useful piece to start from.",
    ],
    "find what you’re looking for": [
      "Say the unknown in a few words.",
      "Give it a symbol or short label if that helps.",
      "Check that it matches what the question asks.",
    ],
    "pick something to try": [
      "Choose one method that might fit.",
      "Try only the first move.",
      "Look at what that move tells you before continuing.",
    ],
    "one move at a time": [
      "Do one calculation or transformation.",
      "Write the result where you can see it.",
      "Then choose the next single move.",
    ],
    "look back": [
      "Put your answer back into the question.",
      "Check whether the size or meaning makes sense.",
      "Change one step if something does not fit.",
    ],
  };

  if (special[title]) {
    return special[title];
  }

  const byType = {
    reading: [
      "Look at only the next small section.",
      "Read one paragraph or short chunk.",
      "Write or mark one thing that stayed with you.",
    ],
    writing: [
      "Write one rough idea.",
      "Turn that idea into one sentence.",
      "Add one detail only if you want to.",
    ],
    questions: [
      "Choose one question.",
      "Underline what it is asking for.",
      "Write the smallest answer you can start with.",
    ],
    study: [
      "Choose one tiny topic.",
      "Look at it for a short moment.",
      "Close the material and recall one thing.",
    ],
    maths: [
      "Look at one problem only.",
      "Write what you know.",
      "Try one mathematical move.",
    ],
    presentation: [
      "Choose one part of the presentation.",
      "Decide the one idea that part needs to communicate.",
      "Add one useful piece to it.",
    ],
    research: [
      "Choose one question to investigate.",
      "Open one useful source.",
      "Save one fact or idea that helps.",
    ],
    project: [
      "Choose one piece of the project.",
      "Decide what that piece needs.",
      "Make the smallest visible change to it.",
    ],
    general: [
      "Look at only one part.",
      "Choose one thing you can do with it.",
      "Do just that one thing first.",
    ],
  };

  return byType[journey.taskType] ||
    byType.general;
}

function showMiniSteps(
  journey,
  stepIndex
) {
  const step =
    journey.steps[stepIndex];

  const miniSteps =
    getMiniStepsForStep(
      journey,
      step
    );

  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="mini-step-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Make It Smaller
        </p>

        <h2 id="mini-step-title">
          ${escapeHtml(
            step.title
          )}
        </h2>

        <p class="hero-text">
          You do not need to do all of this at once.
          Pick the smallest piece that feels possible.
        </p>
      </div>

      <div class="suggested-path">
        ${miniSteps
          .map(
            (miniStep, index) =>
              pathStep(
                index + 1,
                `Tiny step ${index + 1}`,
                escapeHtml(miniStep)
              )
          )
          .join("")}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="mini-step-ready-button"
        >
          Start With the First One
        </button>

        <button
          type="button"
          class="secondary-button"
          id="mini-step-back-button"
        >
          Back to My Step
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "mini-step-ready-button"
    )
    .addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          stepIndex,
          `Start here: ${miniSteps[0]}`
        );
      }
    );

  document
    .getElementById(
      "mini-step-back-button"
    )
    .addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          stepIndex
        );
      }
    );
}

function showCantStartSupport(
  journey,
  stepIndex
) {
  const main =
    document.querySelector("main");

  const options = [
    {
      title: "Two-Minute Beginning",
      description:
        "Give this step just two minutes. You can stop after that.",
    },
    {
      title: "Look Without Starting",
      description:
        "Open the material and look at the relevant part. Nothing else is required yet.",
    },
    {
      title: "One Tiny Move",
      description:
        "Use Make This Smaller and begin with only its first tiny step.",
    },
    {
      title: "Choose Your Own Start",
      description:
        "Pick any small action that feels easier than the suggested starting point.",
    },
  ];

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="cant-start-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          I Can’t Start
        </p>

        <h2 id="cant-start-title">
          You can choose a softer way in.
        </h2>

        <p class="hero-text">
          Starting does not have to mean
          committing to the whole task.
        </p>
      </div>

      <div class="suggested-path">
        ${options
          .map(
            (option, index) =>
              `
                <article class="path-step">
                  <span>
                    ${index + 1}
                  </span>

                  <div>
                    <h3>
                      ${option.title}
                    </h3>

                    <p>
                      ${option.description}
                    </p>

                    <button
                      type="button"
                      class="small-action-button start-support-option"
                      data-option="${index}"
                    >
                      Choose This
                    </button>
                  </div>
                </article>
              `
          )
          .join("")}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="cant-start-back-button"
        >
          Back to My Step
        </button>
      </div>
    </section>
  `;

  document
    .querySelectorAll(
      ".start-support-option"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const option =
            options[
              Number(
                button.dataset.option
              )
            ];

          showJourneyWorkspace(
            journey,
            stepIndex,
            `${option.title}: ${option.description}`
          );
        }
      );
    });

  document
    .getElementById(
      "cant-start-back-button"
    )
    .addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          stepIndex
        );
      }
    );
}

function showDifferentWaySupport(
  journey,
  stepIndex
) {
  const main =
    document.querySelector("main");

  const alternatives = [
    {
      title: "Make It Smaller",
      description:
        "Break this step into a few tiny moves.",
      action: "smaller",
    },
    {
      title: "Say It Out Loud",
      description:
        "Explain what you are trying to do in your own words before continuing.",
      action: "return",
    },
    {
      title: "Use an Example",
      description:
        "Look for one example in your material and use it as a starting clue.",
      action: "return",
    },
    {
      title: "Skip and Circle Back",
      description:
        "Move to the next step for now. You can return here later.",
      action: "skip",
    },
  ];

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="different-way-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Try Another Way
        </p>

        <h2 id="different-way-title">
          This path can change.
        </h2>

        <p class="hero-text">
          Changing the plan is not failing the plan.
          Choose another way to approach this step.
        </p>
      </div>

      <div class="suggested-path">
        ${alternatives
          .map(
            (option, index) =>
              `
                <article class="path-step">
                  <span>
                    ${index + 1}
                  </span>

                  <div>
                    <h3>
                      ${option.title}
                    </h3>

                    <p>
                      ${option.description}
                    </p>

                    <button
                      type="button"
                      class="small-action-button different-way-option"
                      data-option="${index}"
                    >
                      Try This
                    </button>
                  </div>
                </article>
              `
          )
          .join("")}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="different-way-back-button"
        >
          Back to My Step
        </button>
      </div>
    </section>
  `;

  document
    .querySelectorAll(
      ".different-way-option"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const option =
            alternatives[
              Number(
                button.dataset.option
              )
            ];

          if (
            option.action ===
            "smaller"
          ) {
            showMiniSteps(
              journey,
              stepIndex
            );
            return;
          }

          if (
            option.action ===
            "skip"
          ) {
            const nextIndex =
              Math.min(
                stepIndex + 1,
                journey.steps.length - 1
              );

            showJourneyWorkspace(
              journey,
              nextIndex,
              "This step is saved for later. You can circle back whenever you want."
            );
            return;
          }

          showJourneyWorkspace(
            journey,
            stepIndex,
            `${option.title}: ${option.description}`
          );
        }
      );
    });

  document
    .getElementById(
      "different-way-back-button"
    )
    .addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          stepIndex
        );
      }
    );
}

function showParkIt(
  journey,
  stepIndex
) {
  const main =
    document.querySelector("main");

  if (!journey.parkedThoughts) {
    journey.parkedThoughts = [];
  }

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="park-it-title"
    >
      <p class="eyebrow">
        Park It
      </p>

      <h2 id="park-it-title">
        Put the thought somewhere safe.
      </h2>

      <p class="hero-text">
        You do not have to follow every thought
        while you are working.
        Save it here and return to your step.
      </p>

      <label for="parked-thought">
        <strong>
          What popped into your head?
        </strong>
      </label>

      <textarea
        id="parked-thought"
        rows="5"
        maxlength="500"
        placeholder="Write it here so you don't have to hold onto it..."
      ></textarea>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="save-parked-thought-button"
        >
          Save & Return
        </button>

        <button
          type="button"
          class="secondary-button"
          id="park-it-back-button"
        >
          Back Without Saving
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "save-parked-thought-button"
    )
    .addEventListener(
      "click",
      () => {
        const thought =
          document
            .getElementById(
              "parked-thought"
            )
            .value
            .trim();

        if (thought) {
          journey.parkedThoughts.push(
            thought
          );
        }

        showJourneyWorkspace(
          journey,
          stepIndex,
          thought
            ? "Saved in Park It. You can return to your current step."
            : "Nothing was added. Your current step is still here."
        );
      }
    );

  document
    .getElementById(
      "park-it-back-button"
    )
    .addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          stepIndex
        );
      }
    );
}

function showRechargeCove(
  journey,
  stepIndex
) {
  const main =
    document.querySelector("main");

  const ideas = [
    "Look away from the screen and notice three things around you.",
    "Stretch your hands, shoulders or back in a way that feels comfortable.",
    "Get a drink of water.",
    "Stand up or change position for a moment.",
    "Take ten slow steps if you have space.",
    "Close your eyes or soften your gaze for a short moment.",
    "Listen to one song or a short piece of music.",
    "Doodle or make a few marks on paper.",
    "Take a quiet minute without doing the task.",
    "Choose your own kind of break.",
  ];

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="recharge-title"
    >
      <div class="material-heading">
        <p class="eyebrow">
          Recharge Cove
        </p>

        <h2 id="recharge-title">
          Your place is saved.
        </h2>

        <p class="hero-text">
          Take the kind of pause that helps.
          Nothing about your Journey is lost.
        </p>
      </div>

      <div class="suggested-path">
        ${ideas
          .map(
            (idea, index) =>
              pathStep(
                index + 1,
                `Break idea ${index + 1}`,
                escapeHtml(idea)
              )
          )
          .join("")}
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="return-from-break-button"
        >
          Return to My Step
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "return-from-break-button"
    )
    .addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          stepIndex,
          "Welcome back. Your place was saved."
        );
      }
    );
}

function showWhereWasI(
  journey,
  stepIndex
) {
  const step =
    journey.steps[stepIndex];

  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="where-was-i-title"
    >
      <p class="eyebrow">
        Where Was I?
      </p>

      <h2 id="where-was-i-title">
        You’re here:
        ${escapeHtml(
          step.title
        )}
      </h2>

      <p class="hero-text">
        This is step
        ${stepIndex + 1}
        of
        ${journey.steps.length}.
        ${
          journey.goal
            ? `Your goal is: ${escapeHtml(
                journey.goal
              )}`
            : "You can decide what done looks like as you go."
        }
      </p>

      ${
        journey.parkedThoughts &&
        journey.parkedThoughts.length
          ? `
            <p class="hero-text">
              You also have
              ${journey.parkedThoughts.length}
              ${
                journey.parkedThoughts.length === 1
                  ? "thought"
                  : "thoughts"
              }
              safely parked.
            </p>
          `
          : ""
      }

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="pick-up-trail-button"
        >
          Pick Up My Trail
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "pick-up-trail-button"
    )
    .addEventListener(
      "click",
      () => {
        showJourneyWorkspace(
          journey,
          stepIndex
        );
      }
    );
}

function showJourneyPauseScreen(
  journey
) {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="pause-title"
    >
      <p class="eyebrow">
        Your Trail Is Here
      </p>

      <h2 id="pause-title">
        You can stop here
        or keep exploring.
      </h2>

      <p class="hero-text">
        Changing the plan is not failing the plan.
        Your suggested path is still here whenever
        you want to return to it.
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="review-path-button"
        >
          Review My Path
        </button>

        <button
          type="button"
          class="secondary-button"
          id="pause-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "review-path-button"
    )
    .addEventListener(
      "click",
      () => {
        showFirstJourneyPath(
          journey
        );
      }
    );

  document
    .getElementById(
      "pause-home-button"
    )
    .addEventListener(
      "click",
      () => {
        window.location.reload();
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

// ------------------------------------------------------------
// Compass Trail — Supabase Auth + Cloud Save V1
// ------------------------------------------------------------
// Publishable key is intentionally safe for browser use.
// Never place a Supabase secret/service-role key in this file.

const COMPASS_SUPABASE_URL =
  "https://akhaxxxqyzmrknowdalu.supabase.co";

const COMPASS_SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Lasm5e6nIFYLbmlj0bb2hg_zt9w0I_N";

const compassCloud =
  window.supabase?.createClient(
    COMPASS_SUPABASE_URL,
    COMPASS_SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    }
  );

let compassCloudSession = null;
let compassCloudSyncTimer = null;
let compassCloudSyncBusy = false;
let compassCloudSyncQueued = false;

function cloudStatus(message) {
  const node =
    document.getElementById(
      "compass-account-status"
    );

  if (node) {
    node.textContent = message;
  }
}

async function callCompassFunction(
  functionName,
  body,
  accessToken = ""
) {
  const headers = {
    "Content-Type": "application/json",
    apikey:
      COMPASS_SUPABASE_PUBLISHABLE_KEY,
  };

  if (accessToken) {
    headers.Authorization =
      `Bearer ${accessToken}`;
  }

  const response = await fetch(
    `${COMPASS_SUPABASE_URL}/functions/v1/${functionName}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );

  const result =
    await response.json().catch(
      () => ({})
    );

  if (!response.ok) {
    throw new Error(
      result.error ||
        "That could not be completed right now."
    );
  }

  return result;
}

function normalizeLearnerCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
}

function installAccountButton() {
  const nav =
    document.querySelector("nav");

  if (
    !nav ||
    document.getElementById(
      "compass-account-button"
    )
  ) {
    return;
  }

  // The old local-only profile button is replaced by
  // the real cross-device account entry point.
  const oldButton =
    document.getElementById(
      "device-profile-button"
    );

  if (oldButton) {
    oldButton.remove();
  }

  const button =
    document.createElement("button");

  button.type = "button";
  button.id = "compass-account-button";
  button.className = "nav-button";
  button.textContent =
    compassCloudSession
      ? (
          compassStudentState.learnerName ||
          "My Account"
        )
      : "My Account";

  button.addEventListener(
    "click",
    showCompassAccount
  );

  nav.appendChild(button);
}

function refreshAccountButton() {
  const button =
    document.getElementById(
      "compass-account-button"
    );

  if (!button) {
    installAccountButton();
    return;
  }

  button.textContent =
    compassCloudSession
      ? (
          compassStudentState.learnerName ||
          "My Account"
        )
      : "My Account";
}

function showCompassAccount(
  notice = ""
) {
  // This function is also used directly as a click handler.
  // In that case the browser passes a PointerEvent; it is not a user-facing notice.
  if (typeof notice !== "string") {
    notice = "";
  }

  const main =
    document.querySelector("main");

  if (!compassCloud) {
    main.innerHTML = `
      <section class="hero">
        <p class="eyebrow">My Account</p>
        <h2>Cloud connection is not ready.</h2>
        <p class="hero-text">
          Your on-device work is still here.
        </p>
      </section>
    `;
    return;
  }

  if (compassCloudSession) {
    showSignedInAccount(notice);
    return;
  }

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="account-title"
    >
      <p class="eyebrow">
        My Account
      </p>

      <h2 id="account-title">
        Pick up your trail on another device.
      </h2>

      <p class="hero-text">
        Use a Learner Code and Secret Code.
        No email, phone number or real name is required.
      </p>

      ${
        notice
          ? `
            <div
              class="undo-message"
              role="status"
            >
              ${escapeHtml(notice)}
            </div>
          `
          : ""
      }

      <div class="account-grid">
        <article class="home-card">
          <h3>Sign In</h3>

          <label for="account-login-code">
            <strong>Learner Code</strong>
          </label>
          <input
            id="account-login-code"
            type="text"
            autocomplete="username"
            placeholder="CT-XXXX-XXXX"
          />

          <label for="account-login-secret">
            <strong>Secret Code</strong>
          </label>
          <input
            id="account-login-secret"
            type="password"
            autocomplete="current-password"
          />

          <button
            type="button"
            id="account-login-button"
          >
            Sign In
          </button>
        </article>

        <article class="home-card">
          <h3>Create Learner Account</h3>

          <label for="account-register-nickname">
            <strong>Nickname</strong>
          </label>
          <input
            id="account-register-nickname"
            type="text"
            maxlength="40"
            autocomplete="off"
            placeholder="Choose any nickname"
          />

          <label for="account-register-secret">
            <strong>Create a Secret Code</strong>
          </label>
          <input
            id="account-register-secret"
            type="password"
            minlength="8"
            maxlength="72"
            autocomplete="new-password"
          />

          <p>
            Keep your Learner Code somewhere you can
            find again. Recovery options will be
            available if access is lost.
          </p>

          <button
            type="button"
            id="account-register-button"
          >
            Create Account
          </button>
        </article>
      </div>

      <p
        id="compass-account-status"
        class="path-note"
        role="status"
        aria-live="polite"
      ></p>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="account-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "account-login-button"
    )
    .addEventListener(
      "click",
      handleCompassLogin
    );

  document
    .getElementById(
      "account-register-button"
    )
    .addEventListener(
      "click",
      handleCompassRegister
    );

  document
    .getElementById(
      "account-home-button"
    )
    .addEventListener(
      "click",
      () => window.location.reload()
    );
}

async function handleCompassRegister() {
  const nickname =
    document
      .getElementById(
        "account-register-nickname"
      )
      .value
      .trim();

  const secretCode =
    document
      .getElementById(
        "account-register-secret"
      )
      .value;

  if (!nickname) {
    cloudStatus(
      "Choose a nickname first."
    );
    return;
  }

  if (
    secretCode.length < 8 ||
    secretCode.length > 72
  ) {
    cloudStatus(
      "Secret Code needs 8–72 characters."
    );
    return;
  }

  cloudStatus(
    "Creating your account…"
  );

  try {
    const result =
      await callCompassFunction(
        "learner-auth",
        {
          action: "register",
          nickname,
          secretCode,
        }
      );

    if (
      !result.session?.access_token ||
      !result.session?.refresh_token
    ) {
      throw new Error(
        "The account was created, but sign-in could not be restored."
      );
    }

    const { error } =
      await compassCloud.auth.setSession({
        access_token:
          result.session.access_token,
        refresh_token:
          result.session.refresh_token,
      });

    if (error) {
      throw error;
    }

    compassStudentState.learnerName =
      result.nickname || nickname;

    saveStudentState();

    showSignedInAccount(
      `Account ready. Your Learner Code is ${result.learnerCode}.`
    );

    scheduleCompassCloudSync(150);
  } catch (error) {
    cloudStatus(
      error.message ||
        "Account could not be created right now."
    );
  }
}

async function handleCompassLogin() {
  const learnerCode =
    normalizeLearnerCode(
      document
        .getElementById(
          "account-login-code"
        )
        .value
    );

  const secretCode =
    document
      .getElementById(
        "account-login-secret"
      )
      .value;

  if (
    !learnerCode ||
    !secretCode
  ) {
    cloudStatus(
      "Enter both codes to continue."
    );
    return;
  }

  cloudStatus("Signing in…");

  try {
    const result =
      await callCompassFunction(
        "learner-auth",
        {
          action: "login",
          learnerCode,
          secretCode,
        }
      );

    if (
      !result.session?.access_token ||
      !result.session?.refresh_token
    ) {
      throw new Error(
        "Sign-in could not be restored."
      );
    }

    const { error } =
      await compassCloud.auth.setSession({
        access_token:
          result.session.access_token,
        refresh_token:
          result.session.refresh_token,
      });

    if (error) {
      throw error;
    }

    compassStudentState.learnerName =
      result.nickname ||
      compassStudentState.learnerName;

    await loadCompassCloudState();

    saveStudentState();

    showSignedInAccount(
      "Signed in. Your saved trail is ready."
    );
  } catch (error) {
    cloudStatus(
      error.message ||
        "Those codes did not open an account."
    );
  }
}

function showSignedInAccount(
  notice = ""
) {
  const main =
    document.querySelector("main");

  const user =
    compassCloudSession?.user;

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="signed-account-title"
    >
      <p class="eyebrow">
        My Account
      </p>

      <h2 id="signed-account-title">
        ${
          compassStudentState.learnerName
            ? `Hi, ${escapeHtml(
                compassStudentState.learnerName
              )}.`
            : "Your trail is connected."
        }
      </h2>

      <p class="hero-text">
        This account can carry supported Compass Trail
        progress between devices.
      </p>

      ${
        notice
          ? `
            <div
              class="undo-message"
              role="status"
            >
              ${escapeHtml(notice)}
            </div>
          `
          : ""
      }

      <div class="comfort-panel">
        <div class="comfort-control">
          <strong>Cloud status</strong>
          <p>
            Signed in.
          </p>
        </div>

        <div class="comfort-control">
          <label for="account-new-secret">
            New Secret Code
          </label>
          <input
            id="account-new-secret"
            type="password"
            minlength="8"
            maxlength="72"
            autocomplete="new-password"
          />
          <button
            type="button"
            class="secondary-button"
            id="account-change-secret-button"
          >
            Change Secret Code
          </button>
        </div>

        <div class="comfort-control">
          <strong>Recovery</strong>
          <p>
            Losing a code does not mean losing the
            learner’s progress. Teacher-assisted
            recovery is being connected separately.
          </p>
        </div>
      </div>

      <p
        id="compass-account-status"
        class="path-note"
        role="status"
        aria-live="polite"
      ></p>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="account-sync-now-button"
        >
          Save My Trail Now
        </button>

        <button
          type="button"
          class="secondary-button"
          id="account-sign-out-button"
        >
          Sign Out
        </button>

        <button
          type="button"
          class="secondary-button"
          id="signed-account-home-button"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "account-change-secret-button"
    )
    .addEventListener(
      "click",
      handleChangeSecret
    );

  document
    .getElementById(
      "account-sync-now-button"
    )
    .addEventListener(
      "click",
      async () => {
        cloudStatus(
          "Saving your trail…"
        );
        const ok =
          await syncCompassCloudState();

        cloudStatus(
          ok
            ? "Your trail is saved."
            : "Your trail is still safe on this device. Cloud save can be tried again."
        );
      }
    );

  document
    .getElementById(
      "account-sign-out-button"
    )
    .addEventListener(
      "click",
      handleCompassSignOut
    );

  document
    .getElementById(
      "signed-account-home-button"
    )
    .addEventListener(
      "click",
      () => window.location.reload()
    );
}

async function handleChangeSecret() {
  const input =
    document.getElementById(
      "account-new-secret"
    );

  const newSecretCode =
    input.value;

  if (
    newSecretCode.length < 8 ||
    newSecretCode.length > 72
  ) {
    cloudStatus(
      "New Secret Code needs 8–72 characters."
    );
    return;
  }

  const token =
    compassCloudSession?.access_token;

  if (!token) {
    cloudStatus(
      "Please sign in again."
    );
    return;
  }

  cloudStatus(
    "Changing Secret Code…"
  );

  try {
    await callCompassFunction(
      "account-recovery",
      {
        action: "change_secret",
        newSecretCode,
      },
      token
    );

    input.value = "";

    cloudStatus(
      "Secret Code changed. Sign out and use the new code to test it."
    );
  } catch (error) {
    cloudStatus(
      error.message ||
        "Secret Code could not be changed right now."
    );
  }
}

async function handleCompassSignOut() {
  await syncCompassCloudState();

  await compassCloud.auth.signOut({
    scope: "local",
  });

  compassCloudSession = null;
  refreshAccountButton();

  showCompassAccount(
    "Signed out. Your cloud progress stays with your account."
  );
}

function scheduleCompassCloudSync(
  delay = 900
) {
  if (!compassCloudSession) {
    return;
  }

  window.clearTimeout(
    compassCloudSyncTimer
  );

  compassCloudSyncTimer =
    window.setTimeout(
      syncCompassCloudState,
      delay
    );
}

async function syncCompassCloudState() {
  if (
    !compassCloud ||
    !compassCloudSession?.user?.id
  ) {
    return false;
  }

  if (compassCloudSyncBusy) {
    compassCloudSyncQueued = true;
    return false;
  }

  compassCloudSyncBusy = true;

  try {
    const ownerId =
      compassCloudSession.user.id;

    // Profile nickname.
    if (compassStudentState.learnerName) {
      const { error: profileError } =
        await compassCloud
          .from("profiles")
          .update({
            nickname:
              compassStudentState.learnerName,
          })
          .eq("id", ownerId);

      if (profileError) {
        throw profileError;
      }
    }

    // One active Journey is synced in V1.
    const journey =
      compassStudentState.activeJourney;

    if (journey) {
      const journeyPayload = {
        owner_id: ownerId,
        title:
          String(
            journey.title ||
            "My Journey"
          ).slice(0, 200),
        goal:
          String(
            journey.goal || ""
          ),
        task_type:
          journey.taskType ||
          journey.type ||
          null,
        current_step_index:
          Math.max(
            0,
            Number(
              journey.currentStepIndex
            ) || 0
          ),
        status:
          journey.status === "completed"
            ? "completed"
            : "active",
      };

      let journeyId =
        compassStudentState.cloudJourneyId;

      if (journeyId) {
        const { error } =
          await compassCloud
            .from("journeys")
            .update(journeyPayload)
            .eq("id", journeyId)
            .eq("owner_id", ownerId);

        if (error) {
          throw error;
        }
      } else {
        const {
          data,
          error,
        } =
          await compassCloud
            .from("journeys")
            .insert(journeyPayload)
            .select("id")
            .single();

        if (error) {
          throw error;
        }

        journeyId = data.id;
        compassStudentState.cloudJourneyId =
          journeyId;
        saveStudentState();
      }

      const { error: clearStepsError } =
        await compassCloud
          .from("journey_steps")
          .delete()
          .eq("journey_id", journeyId);

      if (clearStepsError) {
        throw clearStepsError;
      }

      const steps =
        Array.isArray(journey.steps)
          ? journey.steps
          : [];

      if (steps.length) {
        const rows =
          steps.map(
            (step, position) => ({
              journey_id: journeyId,
              position,
              title:
                String(
                  step.title ||
                  `Step ${position + 1}`
                ).slice(0, 200),
              description:
                String(
                  step.description ||
                  step.subtitle ||
                  ""
                ),
              is_completed:
                Boolean(
                  step.isCompleted ||
                  step.completed ||
                  step.done
                ),
              completed_at:
                (
                  step.isCompleted ||
                  step.completed ||
                  step.done
                )
                  ? (
                      step.completedAt ||
                      new Date().toISOString()
                    )
                  : null,
            })
          );

        const { error } =
          await compassCloud
            .from("journey_steps")
            .insert(rows);

        if (error) {
          throw error;
        }
      }
    }

    // Small student tools are replaced as a snapshot.
    const { error: littleClear } =
      await compassCloud
        .from("little_things")
        .delete()
        .eq("owner_id", ownerId);

    if (littleClear) {
      throw littleClear;
    }

    if (littleThings.length) {
      const { error } =
        await compassCloud
          .from("little_things")
          .insert(
            littleThings.map(
              (item) => ({
                owner_id: ownerId,
                text:
                  String(
                    item.text || ""
                  ).slice(0, 500),
                is_completed:
                  Boolean(
                    item.done ||
                    item.is_completed
                  ),
              })
            )
          );

      if (error) {
        throw error;
      }
    }

    const { error: ideaClear } =
      await compassCloud
        .from("idea_garden_notes")
        .delete()
        .eq("owner_id", ownerId);

    if (ideaClear) {
      throw ideaClear;
    }

    if (ideaGardenNotes.length) {
      const { error } =
        await compassCloud
          .from("idea_garden_notes")
          .insert(
            ideaGardenNotes.map(
              (note) => ({
                owner_id: ownerId,
                body:
                  String(
                    note.text ||
                    note.body ||
                    ""
                  ).slice(0, 10000),
                shared_with_teachers: false,
              })
            )
          );

      if (error) {
        throw error;
      }
    }

    const { error: daysClear } =
      await compassCloud
        .from("my_days_items")
        .delete()
        .eq("owner_id", ownerId);

    if (daysClear) {
      throw daysClear;
    }

    if (myDaysItems.length) {
      const rows =
        myDaysItems.map(
          (item) => {
            let dueAt = null;

            if (
              item.date &&
              item.date !== "No date yet"
            ) {
              const parsed =
                new Date(
                  `${item.date}T12:00:00`
                );

              if (
                !Number.isNaN(
                  parsed.getTime()
                )
              ) {
                dueAt =
                  parsed.toISOString();
              }
            }

            return {
              owner_id: ownerId,
              title:
                String(
                  item.text ||
                  item.title ||
                  ""
                ).slice(0, 500),
              due_at: dueAt,
              reminder_rule:
                item.reminder || null,
              is_completed:
                Boolean(
                  item.done ||
                  item.is_completed
                ),
            };
          }
        );

      const { error } =
        await compassCloud
          .from("my_days_items")
          .insert(rows);

      if (error) {
        throw error;
      }
    }

    return true;
  } catch (error) {
    console.warn(
      "Compass Trail cloud save could not finish.",
      error
    );
    return false;
  } finally {
    compassCloudSyncBusy = false;

    if (compassCloudSyncQueued) {
      compassCloudSyncQueued = false;
      scheduleCompassCloudSync(250);
    }
  }
}

async function loadCompassCloudState() {
  if (
    !compassCloudSession?.user?.id
  ) {
    return;
  }

  const ownerId =
    compassCloudSession.user.id;

  try {
    const [
      profileResult,
      journeyResult,
      littleResult,
      ideaResult,
      daysResult,
    ] = await Promise.all([
      compassCloud
        .from("profiles")
        .select("nickname")
        .eq("id", ownerId)
        .single(),

      compassCloud
        .from("journeys")
        .select(
          "id,title,goal,task_type,current_step_index,status,updated_at"
        )
        .eq("owner_id", ownerId)
        .eq("status", "active")
        .order(
          "updated_at",
          { ascending: false }
        )
        .limit(1)
        .maybeSingle(),

      compassCloud
        .from("little_things")
        .select(
          "id,text,is_completed,created_at"
        )
        .eq("owner_id", ownerId)
        .order(
          "created_at",
          { ascending: true }
        ),

      compassCloud
        .from("idea_garden_notes")
        .select(
          "id,body,created_at"
        )
        .eq("owner_id", ownerId)
        .order(
          "created_at",
          { ascending: false }
        ),

      compassCloud
        .from("my_days_items")
        .select(
          "id,title,due_at,reminder_rule,is_completed,created_at"
        )
        .eq("owner_id", ownerId)
        .order(
          "created_at",
          { ascending: true }
        ),
    ]);

    if (
      !profileResult.error &&
      profileResult.data
    ) {
      compassStudentState.learnerName =
        profileResult.data.nickname || "";
    }

    if (
      !journeyResult.error &&
      journeyResult.data
    ) {
      const cloudJourney =
        journeyResult.data;

      const { data: steps, error } =
        await compassCloud
          .from("journey_steps")
          .select(
            "position,title,description,is_completed,completed_at"
          )
          .eq(
            "journey_id",
            cloudJourney.id
          )
          .order(
            "position",
            { ascending: true }
          );

      if (!error) {
        compassStudentState.cloudJourneyId =
          cloudJourney.id;

        compassStudentState.activeJourney = {
          title: cloudJourney.title,
          goal: cloudJourney.goal,
          taskType:
            cloudJourney.task_type,
          currentStepIndex:
            cloudJourney.current_step_index,
          status:
            cloudJourney.status,
          steps:
            (steps || []).map(
              (step) => ({
                title: step.title,
                description:
                  step.description,
                completed:
                  step.is_completed,
                completedAt:
                  step.completed_at,
              })
            ),
        };
      }
    }

    if (!littleResult.error) {
      littleThings.splice(
        0,
        littleThings.length,
        ...(littleResult.data || []).map(
          (item) => ({
            id: item.id,
            text: item.text,
            done: item.is_completed,
          })
        )
      );
    }

    if (!ideaResult.error) {
      ideaGardenNotes.splice(
        0,
        ideaGardenNotes.length,
        ...(ideaResult.data || []).map(
          (item) => ({
            id: item.id,
            text: item.body,
          })
        )
      );
    }

    if (!daysResult.error) {
      myDaysItems.splice(
        0,
        myDaysItems.length,
        ...(daysResult.data || []).map(
          (item) => ({
            id: item.id,
            text: item.title,
            date:
              item.due_at
                ? item.due_at.slice(0, 10)
                : "No date yet",
            reminder:
              item.reminder_rule ||
              "none",
            done:
              item.is_completed,
          })
        )
      );
    }

    saveStudentState();
    refreshAccountButton();
  } catch (error) {
    console.warn(
      "Compass Trail cloud restore could not finish.",
      error
    );
  }
}

async function bootCompassCloudV1() {
  if (!compassCloud) {
    console.warn(
      "Supabase browser client was not loaded."
    );
    installAccountButton();
    return;
  }

  const {
    data: { session },
  } =
    await compassCloud.auth.getSession();

  compassCloudSession =
    session || null;

  if (compassCloudSession) {
    await loadCompassCloudState();
  }

  installAccountButton();
  refreshAccountButton();

  compassCloud.auth.onAuthStateChange(
    (_event, sessionNow) => {
      compassCloudSession =
        sessionNow || null;
      refreshAccountButton();
    }
  );

  // Existing local save behavior remains as an offline fallback.
  // Cloud sync is debounced rather than firing on every click instantly.
  document.addEventListener(
    "click",
    () => scheduleCompassCloudSync()
  );

  document.addEventListener(
    "change",
    () => scheduleCompassCloudSync()
  );

  window.addEventListener(
    "beforeunload",
    () => scheduleCompassCloudSync(0)
  );
}

window.addEventListener(
  "load",
  bootCompassCloudV1
);

