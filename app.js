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
  journeys: [],
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
        journeys:
          compassStudentState.journeys,
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

      compassStudentState.journeys =
        Array.isArray(saved.journeys)
          ? saved.journeys
          : [];

      if (
        compassStudentState.activeJourney &&
        compassStudentState.journeys.length === 0
      ) {
        const migrated =
          JSON.parse(
            JSON.stringify(
              compassStudentState.activeJourney
            )
          );

        migrated.localId =
          migrated.localId ||
          `journey-${Date.now()}`;

        compassStudentState.activeJourney =
          migrated;
        compassStudentState.journeys = [
          migrated
        ];
      }

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

function ensureJourneyLocalId(journey) {
  if (!journey) return null;

  journey.localId =
    journey.localId ||
    `journey-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

  return journey.localId;
}

function rememberJourney(journey) {
  if (!journey) {
    return;
  }

  const copy =
    JSON.parse(
      JSON.stringify(journey)
    );

  const localId =
    ensureJourneyLocalId(copy);

  const existingIndex =
    compassStudentState.journeys
      .findIndex(
        (item) =>
          item.localId === localId
      );

  if (existingIndex >= 0) {
    compassStudentState.journeys[
      existingIndex
    ] = copy;
  } else {
    compassStudentState.journeys.push(
      copy
    );
  }

  compassStudentState.activeJourney =
    copy;

  compassStudentState.cloudJourneyId =
    copy.cloudJourneyId ||
    compassStudentState.cloudJourneyId ||
    null;

  saveStudentState();
}

function selectSavedJourney(localId) {
  const journey =
    compassStudentState.journeys.find(
      (item) =>
        item.localId === localId
    );

  if (!journey) return;

  compassStudentState.activeJourney =
    JSON.parse(
      JSON.stringify(journey)
    );

  compassStudentState.cloudJourneyId =
    journey.cloudJourneyId || null;

  saveStudentState();

  showJourneyWorkspace(
    JSON.parse(
      JSON.stringify(journey)
    ),
    journey.currentStepIndex || 0,
    "Journey opened. Your saved step is shown."
  );
}

function showMyJourneys() {
  const main =
    document.querySelector("main");

  const journeys =
    Array.isArray(
      compassStudentState.journeys
    )
      ? compassStudentState.journeys
      : [];

  main.innerHTML = `
    <section class="material-page" aria-labelledby="my-journeys-title">
      <div class="material-heading">
        <p class="eyebrow">My Journeys</p>
        <h2 id="my-journeys-title">Choose a Journey to continue.</h2>
        <p class="hero-text">
          Each Journey keeps its own steps and current position.
        </p>
      </div>

      ${
        journeys.length
          ? `<div class="material-list">
              ${journeys.map((journey, index) => {
                const stepCount =
                  Array.isArray(journey.steps)
                    ? journey.steps.length
                    : 0;
                const current =
                  stepCount
                    ? Math.min(
                        Math.max(
                          Number(
                            journey.currentStepIndex
                          ) || 0,
                          0
                        ),
                        stepCount - 1
                      )
                    : 0;

                return `
                  <article class="material-card">
                    <div class="material-card-content">
                      <p class="material-position">Journey ${index + 1}</p>
                      <h3>${escapeHtml(journey.title || "My Journey")}</h3>
                      <p>
                        ${
                          stepCount
                            ? `Step ${current + 1} of ${stepCount}: ${escapeHtml(journey.steps[current]?.title || "")}`
                            : "No steps saved."
                        }
                      </p>
                    </div>
                    <div class="material-card-actions">
                      <button
                        type="button"
                        class="small-action-button open-saved-journey"
                        data-local-id="${escapeHtml(journey.localId || "")}"
                      >
                        Open Journey
                      </button>
                    </div>
                  </article>
                `;
              }).join("")}
            </div>`
          : `<p class="path-note">No saved Journeys yet.</p>`
      }

      <div class="hero-actions">
        <button type="button" class="secondary-button" id="my-journeys-home">
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .querySelectorAll(
      ".open-saved-journey"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () =>
          selectSavedJourney(
            button.dataset.localId
          )
      );
    });

  document
    .getElementById(
      "my-journeys-home"
    )
    ?.addEventListener(
      "click",
      backHome
    );
}

function addMyJourneysHomeCard() {
  if (
    document.getElementById(
      "my-journeys-home-card"
    )
  ) return;

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
    "my-journeys-home-card";
  card.className =
    "home-card";

  card.innerHTML = `
    <span class="card-icon" aria-hidden="true">🗺️</span>
    <h3>My Journeys</h3>
    <p>
      Open any saved Journey without replacing the others.
    </p>
    <button type="button" id="open-my-journeys-button">
      Open My Journeys
    </button>
  `;

  grid.prepend(card);

  document
    .getElementById(
      "open-my-journeys-button"
    )
    ?.addEventListener(
      "click",
      showMyJourneys
    );
}

window.addEventListener(
  "load",
  addMyJourneysHomeCard
);

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
        Progress can stay on this device.
        When you sign in, supported V1 learning data can also sync to your Compass Trail account.
        No real name is required.
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


// ------------------------------------------------------------
// Check-in + My Pace V1
// Direct, optional, diagnosis-free support.
// ------------------------------------------------------------

const COMPASS_FOCUS_STATE_KEY =
  "compassTrailFocusStateV1";

function loadCompassFocusState() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(
        COMPASS_FOCUS_STATE_KEY
      ) || "{}"
    );

    return {
      energy:
        typeof saved.energy === "string"
          ? saved.energy
          : "",
      timerMinutes:
        Number(saved.timerMinutes) || 10,
      timerEndsAt:
        Number(saved.timerEndsAt) || 0,
      timerPausedRemaining:
        Number(saved.timerPausedRemaining) || 0,
      reflection:
        typeof saved.reflection === "string"
          ? saved.reflection
          : "",
      lastCheckInAt:
        saved.lastCheckInAt || "",
      lastCheckOutAt:
        saved.lastCheckOutAt || "",
    };
  } catch (error) {
    console.warn(
      "Could not load Check-in and My Pace settings.",
      error
    );

    return {
      energy: "",
      timerMinutes: 10,
      timerEndsAt: 0,
      timerPausedRemaining: 0,
      reflection: "",
      lastCheckInAt: "",
      lastCheckOutAt: "",
    };
  }
}

let compassFocusState =
  loadCompassFocusState();

let compassFocusTimerInterval = null;

// Temporary navigation context for Recharge Cove.
let compassRechargeReturnContext = "";

function saveCompassFocusState() {
  try {
    localStorage.setItem(
      COMPASS_FOCUS_STATE_KEY,
      JSON.stringify(compassFocusState)
    );
  } catch (error) {
    console.warn(
      "Could not save Check-in and My Pace settings.",
      error
    );
  }
}

function clearCompassFocusTimerInterval() {
  if (compassFocusTimerInterval) {
    clearInterval(
      compassFocusTimerInterval
    );
    compassFocusTimerInterval = null;
  }
}

function compassEnergyPresentation() {
  if (compassFocusState.energy === "low") {
    return {
      label: "Low energy",
      message:
        "Fewer choices will be shown at once. Your learning goal stays the same.",
    };
  }

  if (
    compassFocusState.energy === "medium"
  ) {
    return {
      label: "Medium energy",
      message:
        "A few choices will be shown at once. Your learning goal stays the same.",
    };
  }

  if (
    compassFocusState.energy === "high"
  ) {
    return {
      label: "High energy",
      message:
        "The full set of choices can stay visible. Your learning goal stays the same.",
    };
  }

  return {
    label: "Check-in skipped",
    message:
      "No energy setting is active. You can still use every support.",
  };
}

function compassTimerRemainingMs() {
  if (
    compassFocusState.timerPausedRemaining >
    0
  ) {
    return compassFocusState
      .timerPausedRemaining;
  }

  if (!compassFocusState.timerEndsAt) {
    return (
      compassFocusState.timerMinutes *
      60 *
      1000
    );
  }

  return Math.max(
    0,
    compassFocusState.timerEndsAt -
      Date.now()
  );
}

function formatCompassTimer(ms) {
  const totalSeconds = Math.max(
    0,
    Math.ceil(ms / 1000)
  );
  const minutes =
    Math.floor(totalSeconds / 60);
  const seconds =
    totalSeconds % 60;

  return `${minutes}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function showCompassCheckIn(
  notice = ""
) {
  if (typeof notice !== "string") {
    notice = "";
  }

  clearCompassFocusTimerInterval();

  const main =
    document.querySelector("main");

  if (!main) return;

  const selected =
    compassFocusState.energy;

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="check-in-title"
    >
      <p class="eyebrow">
        Check-in
      </p>

      <h2 id="check-in-title">
        How much energy do you have for this right now?
      </h2>

      <p class="hero-text">
        Choose one option, or skip this.
        This is not a grade. Your answer only
        changes how much information is shown
        at once.
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

      <div
        class="home-grid"
        role="group"
        aria-label="Energy level"
      >
        <article class="home-card">
          <h3>Low energy</h3>
          <p>
            Show fewer choices at once.
          </p>
          <button
            type="button"
            class="compass-energy-choice"
            data-energy="low"
            aria-pressed="${
              selected === "low"
            }"
          >
            Choose Low Energy
          </button>
        </article>

        <article class="home-card">
          <h3>Medium energy</h3>
          <p>
            Show a few choices at once.
          </p>
          <button
            type="button"
            class="compass-energy-choice"
            data-energy="medium"
            aria-pressed="${
              selected === "medium"
            }"
          >
            Choose Medium Energy
          </button>
        </article>

        <article class="home-card">
          <h3>High energy</h3>
          <p>
            Keep the full set of choices visible.
          </p>
          <button
            type="button"
            class="compass-energy-choice"
            data-energy="high"
            aria-pressed="${
              selected === "high"
            }"
          >
            Choose High Energy
          </button>
        </article>
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="check-in-continue"
        >
          Continue
        </button>

        <button
          type="button"
          class="secondary-button"
          id="check-in-skip"
        >
          Skip Check-in
        </button>

        <button
          type="button"
          class="secondary-button"
          id="check-in-home"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .querySelectorAll(
      ".compass-energy-choice"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          compassFocusState.energy =
            button.dataset.energy || "";

          compassFocusState
            .lastCheckInAt =
            new Date().toISOString();

          saveCompassFocusState();

          showCompassCheckIn(
            "Energy setting saved."
          );
        }
      );
    });

  document
    .getElementById(
      "check-in-continue"
    )
    ?.addEventListener(
      "click",
      () => showCompassFocusSpace()
    );

  document
    .getElementById(
      "check-in-skip"
    )
    ?.addEventListener(
      "click",
      () => {
        compassFocusState.energy = "";
        compassFocusState
          .lastCheckInAt =
          new Date().toISOString();

        saveCompassFocusState();

        showCompassFocusSpace(
          "Check-in skipped. No energy setting was applied."
        );
      }
    );

  document
    .getElementById(
      "check-in-home"
    )
    ?.addEventListener(
      "click",
      backHome
    );
}


function openRechargeCoveFromMyPace() {
  compassRechargeReturnContext = "my-pace";

  if (
    typeof showHomeRechargeCove ===
    "function"
  ) {
    showHomeRechargeCove();
  }
}

function addRechargeReturnToMyPace() {
  if (
    compassRechargeReturnContext !==
    "my-pace"
  ) {
    return;
  }

  if (
    document.getElementById(
      "return-to-my-pace"
    )
  ) {
    return;
  }

  const main =
    document.querySelector("main");

  if (
    !main ||
    !/Recharge Cove/i.test(
      main.textContent || ""
    )
  ) {
    return;
  }

  const buttons =
    Array.from(
      main.querySelectorAll("button")
    );

  const homeButton =
    buttons.find((button) =>
      /Back Home/i.test(
        button.textContent || ""
      )
    );

  const toolkitButton =
    buttons.find((button) =>
      /My Toolkit/i.test(
        button.textContent || ""
      )
    );

  const referenceButton =
    homeButton || toolkitButton;

  const returnButton =
    document.createElement("button");

  returnButton.type = "button";
  returnButton.id =
    "return-to-my-pace";
  returnButton.className =
    referenceButton?.className ||
    "secondary-button";
  returnButton.textContent =
    "Return to My Pace";

  returnButton.addEventListener(
    "click",
    () => {
      compassRechargeReturnContext = "";

      if (
        compassFocusState
          .timerPausedRemaining > 0
      ) {
        showCompassTimer(
          "Break finished. Your timer is still paused."
        );
      } else {
        showCompassFocusSpace(
          "Break finished. Your progress is unchanged."
        );
      }
    }
  );

  if (referenceButton) {
    referenceButton
      .insertAdjacentElement(
        "beforebegin",
        returnButton
      );
  } else {
    const actions =
      main.querySelector(
        ".hero-actions"
      );

    if (actions) {
      actions.prepend(
        returnButton
      );
    } else {
      main.appendChild(
        returnButton
      );
    }
  }
}

function showCompassFocusSpace(
  notice = ""
) {
  if (typeof notice !== "string") {
    notice = "";
  }

  clearCompassFocusTimerInterval();

  const main =
    document.querySelector("main");

  if (!main) return;

  const presentation =
    compassEnergyPresentation();

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="focus-space-title"
    >
      <p class="eyebrow">
        My Pace
      </p>

      <h2 id="focus-space-title">
        Choose how you want to work right now.
      </h2>

      <p class="hero-text">
        ${escapeHtml(
          presentation.message
        )}
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
          <strong>
            Current check-in
          </strong>
          <p>
            ${escapeHtml(
              presentation.label
            )}
          </p>
          <button
            type="button"
            class="small-action-button"
            id="change-check-in"
          >
            Change Check-in
          </button>
        </div>

        <div class="comfort-control">
          <strong>
            Optional timer
          </strong>
          <p>
            The timer is a tool. When it ends,
            the timer does not change your completion status.
          </p>

          <label for="focus-timer-minutes">
            Minutes
          </label>

          <select id="focus-timer-minutes">
            ${[
              2, 5, 10, 15, 20,
              25, 30, 45, 60
            ]
              .map(
                (minutes) => `
                  <option
                    value="${minutes}"
                    ${
                      compassFocusState
                        .timerMinutes ===
                      minutes
                        ? "selected"
                        : ""
                    }
                  >
                    ${minutes}
                  </option>
                `
              )
              .join("")}
          </select>

          <button
            type="button"
            class="primary-button"
            id="start-focus-timer"
          >
            Start Timer
          </button>
        </div>

        <div class="comfort-control">
          <strong>
            Need a break?
          </strong>
          <p>
            Your progress stays saved when
            you take a break.
          </p>
          <button
            type="button"
            class="small-action-button"
            id="focus-break-button"
          >
            Open Recharge Cove
          </button>
        </div>
      </div>

      <div class="hero-actions">
        <button
          type="button"
          class="secondary-button"
          id="focus-check-out"
        >
          Finish for Now
        </button>

        <button
          type="button"
          class="secondary-button"
          id="focus-home"
        >
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "change-check-in"
    )
    ?.addEventListener(
      "click",
      () => showCompassCheckIn()
    );

  document
    .getElementById(
      "start-focus-timer"
    )
    ?.addEventListener(
      "click",
      () => {
        const select =
          document.getElementById(
            "focus-timer-minutes"
          );

        compassFocusState.timerMinutes =
          Number(select?.value) || 10;

        compassFocusState
          .timerPausedRemaining = 0;

        compassFocusState.timerEndsAt =
          Date.now() +
          compassFocusState
            .timerMinutes *
            60 *
            1000;

        saveCompassFocusState();
        showCompassTimer();
      }
    );

  document
    .getElementById(
      "focus-break-button"
    )
    ?.addEventListener(
      "click",
      () => {
        if (
          typeof showHomeRechargeCove ===
          "function"
        ) {
          openRechargeCoveFromMyPace();
        }
      }
    );

  document
    .getElementById(
      "focus-check-out"
    )
    ?.addEventListener(
      "click",
      () => showCompassCheckOut()
    );

  document
    .getElementById(
      "focus-home"
    )
    ?.addEventListener(
      "click",
      backHome
    );
}

function showCompassTimer(
  notice = ""
) {
  if (typeof notice !== "string") {
    notice = "";
  }

  clearCompassFocusTimerInterval();

  const main =
    document.querySelector("main");

  if (!main) return;

  const renderTimer = () => {
    const remaining =
      compassTimerRemainingMs();

    const finished =
      remaining <= 0 &&
      (
        compassFocusState.timerEndsAt >
          0 ||
        compassFocusState
          .timerPausedRemaining === 0
      );

    main.innerHTML = `
      <section
        class="material-page"
        aria-labelledby="timer-title"
      >
        <p class="eyebrow">
          My Pace Timer
        </p>

        <h2 id="timer-title">
          ${
            remaining <= 0
              ? "Timer finished."
              : "Time remaining"
          }
        </h2>

        <p class="hero-text">
          ${
            remaining <= 0
              ? "The timer ended. Your progress is unchanged. Choose what you want to do next."
              : "This timer does not grade your work. You can pause, stop, or take a break at any time."
          }
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
            <strong
              id="focus-timer-display"
              aria-live="polite"
            >
              ${formatCompassTimer(
                remaining
              )}
            </strong>
          </div>
        </div>

        <div class="hero-actions">
          ${
            compassFocusState.timerEndsAt
              ? `
                <button
                  type="button"
                  class="primary-button"
                  id="pause-focus-timer"
                >
                  Pause
                </button>
              `
              : ""
          }

          ${
            compassFocusState
              .timerPausedRemaining > 0
              ? `
                <button
                  type="button"
                  class="primary-button"
                  id="resume-focus-timer"
                >
                  Resume
                </button>
              `
              : ""
          }

          <button
            type="button"
            class="secondary-button"
            id="stop-focus-timer"
          >
            Stop Timer
          </button>

          <button
            type="button"
            class="secondary-button"
            id="timer-break-button"
          >
            Take a Break
          </button>

          <button
            type="button"
            class="secondary-button"
            id="timer-back-button"
          >
            Back to My Pace
          </button>
        </div>
      </section>
    `;

    document
      .getElementById(
        "pause-focus-timer"
      )
      ?.addEventListener(
        "click",
        () => {
          compassFocusState
            .timerPausedRemaining =
            compassTimerRemainingMs();

          compassFocusState
            .timerEndsAt = 0;

          saveCompassFocusState();

          showCompassTimer(
            "Timer paused."
          );
        }
      );

    document
      .getElementById(
        "resume-focus-timer"
      )
      ?.addEventListener(
        "click",
        () => {
          compassFocusState
            .timerEndsAt =
            Date.now() +
            compassFocusState
              .timerPausedRemaining;

          compassFocusState
            .timerPausedRemaining = 0;

          saveCompassFocusState();

          showCompassTimer(
            "Timer resumed."
          );
        }
      );

    document
      .getElementById(
        "stop-focus-timer"
      )
      ?.addEventListener(
        "click",
        () => {
          compassFocusState
            .timerEndsAt = 0;

          compassFocusState
            .timerPausedRemaining = 0;

          saveCompassFocusState();

          showCompassFocusSpace(
            "Timer stopped. Your progress was not changed."
          );
        }
      );

    document
      .getElementById(
        "timer-break-button"
      )
      ?.addEventListener(
        "click",
        () => {
          if (
            compassFocusState
              .timerEndsAt
          ) {
            compassFocusState
              .timerPausedRemaining =
              compassTimerRemainingMs();

            compassFocusState
              .timerEndsAt = 0;

            saveCompassFocusState();
          }

          if (
            typeof showHomeRechargeCove ===
            "function"
          ) {
            openRechargeCoveFromMyPace();
          }
        }
      );

    document
      .getElementById(
        "timer-back-button"
      )
      ?.addEventListener(
        "click",
        () =>
          showCompassFocusSpace()
      );
  };

  renderTimer();

  if (compassFocusState.timerEndsAt) {
    compassFocusTimerInterval =
      setInterval(
        () => {
          const display =
            document.getElementById(
              "focus-timer-display"
            );

          if (!display) {
            clearCompassFocusTimerInterval();
            return;
          }

          const remaining =
            compassTimerRemainingMs();

          display.textContent =
            formatCompassTimer(
              remaining
            );

          if (remaining <= 0) {
            clearCompassFocusTimerInterval();

            compassFocusState
              .timerEndsAt = 0;

            compassFocusState
              .timerPausedRemaining = 0;

            saveCompassFocusState();

            showCompassTimer();
          }
        },
        1000
      );
  }
}

function showCompassCheckOut(
  notice = ""
) {
  if (typeof notice !== "string") {
    notice = "";
  }

  clearCompassFocusTimerInterval();

  const main =
    document.querySelector("main");

  if (!main) return;

  main.innerHTML = `
    <section
      class="material-page"
      aria-labelledby="check-out-title"
    >
      <p class="eyebrow">
        Check-out
      </p>

      <h2 id="check-out-title">
        Do you want to save a short note before you finish?
      </h2>

      <p class="hero-text">
        This is optional and is not a grade.
        Write what helped, what was difficult,
        or what you want to remember next time.
        You can also skip it.
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

      <label for="check-out-reflection">
        <strong>
          Optional note
        </strong>
      </label>

      <textarea
        id="check-out-reflection"
        rows="5"
        maxlength="800"
        placeholder="Example: Breaking the first step into smaller parts helped."
      >${escapeHtml(
        compassFocusState.reflection
      )}</textarea>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="save-check-out"
        >
          Save Note & Finish
        </button>

        <button
          type="button"
          class="secondary-button"
          id="skip-check-out"
        >
          Skip & Finish
        </button>

        <button
          type="button"
          class="secondary-button"
          id="check-out-back"
        >
          Back
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "save-check-out"
    )
    ?.addEventListener(
      "click",
      () => {
        const value =
          document
            .getElementById(
              "check-out-reflection"
            )
            ?.value.trim() || "";

        compassFocusState.reflection =
          value;

        compassFocusState
          .lastCheckOutAt =
          new Date().toISOString();

        saveCompassFocusState();
        backHome();
      }
    );

  document
    .getElementById(
      "skip-check-out"
    )
    ?.addEventListener(
      "click",
      () => {
        compassFocusState
          .lastCheckOutAt =
          new Date().toISOString();

        saveCompassFocusState();
        backHome();
      }
    );

  document
    .getElementById(
      "check-out-back"
    )
    ?.addEventListener(
      "click",
      () => showCompassFocusSpace()
    );
}

function addCompassFocusHomeCard() {
  if (
    document.getElementById(
      "compass-focus-home-card"
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
    "compass-focus-home-card";

  card.className =
    "home-card";

  card.innerHTML = `
    <span
      class="card-icon"
      aria-hidden="true"
    >
      ⏱️
    </span>

    <h3>
      Check-in &amp; My Pace
    </h3>

    <p>
      Choose how much information to see
      at once and use an optional timer.
    </p>

    <button
      type="button"
      id="open-compass-focus-button"
    >
      Open Check-in
    </button>
  `;

  const myDaysButton =
    findButtonByLabel(
      "Open My Days"
    );

  const myDaysCard =
    myDaysButton?.closest(
      ".home-card"
    );

  if (
    myDaysCard &&
    myDaysCard.parentElement === grid
  ) {
    myDaysCard.insertAdjacentElement(
      "afterend",
      card
    );
  } else {
    grid.appendChild(card);
  }

  document
    .getElementById(
      "open-compass-focus-button"
    )
    ?.addEventListener(
      "click",
      () => showCompassCheckIn()
    );
}

window.addEventListener(
  "load",
  addCompassFocusHomeCard
);


// My Toolkit needs a direct, visible Home entry.
// The Toolkit already exists; this adds the missing Home card.
function addCompassToolkitHomeCard() {
  if (
    document.getElementById(
      "compass-toolkit-home-card"
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
    "compass-toolkit-home-card";

  card.className =
    "home-card";

  card.innerHTML = `
    <span
      class="card-icon"
      aria-hidden="true"
    >
      🧰
    </span>

    <h3>
      My Toolkit
    </h3>

    <p>
      Open learning supports such as
      Starting Sparks, Read With Me,
      Make It Smaller and Memory Tools.
    </p>

    <button
      type="button"
      id="open-compass-toolkit-button"
    >
      Open My Toolkit
    </button>
  `;

  const makeItMineButton =
    findButtonByLabel(
      "Personalise My Space"
    );

  const makeItMineCard =
    makeItMineButton?.closest(
      ".home-card"
    );

  if (
    makeItMineCard &&
    makeItMineCard.parentElement ===
      grid
  ) {
    makeItMineCard.insertAdjacentElement(
      "afterend",
      card
    );
  } else {
    grid.appendChild(card);
  }

  document
    .getElementById(
      "open-compass-toolkit-button"
    )
    ?.addEventListener(
      "click",
      showToolkitHub
    );
}

window.addEventListener(
  "load",
  addCompassToolkitHomeCard
);

// BIG V1 Completion Pack 2:
// Goal Look + Photo Studio / Lookbook + learner-owned visual character.
// These are optional creative supports. They do not affect progress or completion.
const COMPASS_LOOK_KEY = "compassTrailGoalLookV1";

function loadCompassLook() {
  try {
    return JSON.parse(
      localStorage.getItem(
        COMPASS_LOOK_KEY
      ) || "{}"
    );
  } catch (_) {
    return {};
  }
}

function saveCompassLook(state) {
  try {
    localStorage.setItem(
      COMPASS_LOOK_KEY,
      JSON.stringify(state)
    );
  } catch (_) {}
}

function addCompassGoalLookHomeCard() {
  if (
    document.getElementById(
      "compass-goal-look-home-card"
    )
  ) return;

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
    "compass-goal-look-home-card";
  card.className = "home-card";
  card.innerHTML = `
    <span class="card-icon" aria-hidden="true">✨</span>
    <h3>Goal Look &amp; Lookbook</h3>
    <p>
      Make an optional visual for a goal,
      character or future moment. This does
      not change your learning progress.
    </p>
    <button type="button" id="open-goal-look-button">
      Open Goal Look
    </button>
  `;

  grid.appendChild(card);

  document
    .getElementById(
      "open-goal-look-button"
    )
    ?.addEventListener(
      "click",
      showGoalLookStudio
    );
}

window.addEventListener(
  "load",
  addCompassGoalLookHomeCard
);

function showGoalLookStudio(
  notice = ""
) {
  if (typeof notice !== "string") {
    notice = "";
  }

  const state =
    loadCompassLook();

  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section class="material-page" aria-labelledby="goal-look-title">
      <div class="material-heading">
        <p class="eyebrow">Goal Look &amp; Lookbook</p>
        <h2 id="goal-look-title">
          Make a visual reminder that belongs to you.
        </h2>
        <p class="hero-text">
          This is optional. It is for expression and remembering a goal.
          It does not score, grade or change your Journey.
        </p>
      </div>

      ${
        notice
          ? `<div class="undo-message" role="status"><span>${escapeHtml(notice)}</span></div>`
          : ""
      }

      <div class="home-grid">
        ${toolkitActionCard(
          "🎯",
          "Goal Look",
          "Save a goal and choose a simple visual symbol for it.",
          "open-goal-look-editor"
        )}
        ${toolkitActionCard(
          "🙂",
          "My Character",
          "Choose a simple character symbol and name. No photo is required.",
          "open-character-editor"
        )}
        ${toolkitActionCard(
          "📷",
          "Photo Studio",
          "Add an optional photo preview to your Lookbook. The photo stays on this device in this V1.",
          "open-photo-studio"
        )}
        ${toolkitActionCard(
          "📚",
          "My Lookbook",
          "See the goal, character and photo you chose.",
          "open-lookbook"
        )}
      </div>

      <div class="hero-actions">
        <button type="button" class="secondary-button" id="goal-look-home">
          Back Home
        </button>
      </div>
    </section>
  `;

  document.getElementById("open-goal-look-editor")?.addEventListener("click", showGoalLookEditor);
  document.getElementById("open-character-editor")?.addEventListener("click", showCharacterEditor);
  document.getElementById("open-photo-studio")?.addEventListener("click", showPhotoStudio);
  document.getElementById("open-lookbook")?.addEventListener("click", showLookbook);
  document.getElementById("goal-look-home")?.addEventListener("click", backHome);
}

function showGoalLookEditor() {
  const state = loadCompassLook();
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="goal-look-editor-title">
      <p class="eyebrow">Goal Look</p>
      <h2 id="goal-look-editor-title">Choose what you want this visual to remind you about.</h2>

      <label for="goal-look-text"><strong>Goal or reminder</strong></label>
      <textarea id="goal-look-text" rows="4" maxlength="400"
        placeholder="For example: Finish my science presentation.">${escapeHtml(state.goal || "")}</textarea>

      <fieldset class="journey-planning-fieldset">
        <legend><strong>Choose a symbol</strong></legend>
        <div class="hero-actions">
          ${["🎯","🌱","⭐","🧭","📚","🏁"].map((symbol) => `
            <button
              type="button"
              class="secondary-button goal-symbol-choice"
              data-symbol="${symbol}"
              aria-pressed="${state.goalSymbol === symbol ? "true" : "false"}"
            >${symbol}</button>
          `).join("")}
        </div>
      </fieldset>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="save-goal-look">Save Goal Look</button>
        <button type="button" class="secondary-button" id="goal-look-editor-back">Back</button>
      </div>
      <div id="goal-look-editor-status" class="path-note" role="status"></div>
    </section>
  `;

  let selected =
    state.goalSymbol || "🎯";

  document.querySelectorAll(".goal-symbol-choice").forEach((button) => {
    button.addEventListener("click", () => {
      selected = button.dataset.symbol;
      document.querySelectorAll(".goal-symbol-choice").forEach((other) => {
        other.setAttribute("aria-pressed", String(other === button));
      });
    });
  });

  document.getElementById("save-goal-look").addEventListener("click", () => {
    const goal = document.getElementById("goal-look-text").value.trim();
    if (!goal) {
      document.getElementById("goal-look-editor-status").textContent =
        "Write a goal or reminder first.";
      return;
    }

    saveCompassLook({
      ...state,
      goal,
      goalSymbol: selected
    });
    showGoalLookStudio("Goal Look saved on this device. It is not synced to the cloud in this V1.");
  });

  document.getElementById("goal-look-editor-back").addEventListener("click", showGoalLookStudio);
}

function showCharacterEditor() {
  const state = loadCompassLook();
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="character-title">
      <p class="eyebrow">My Character</p>
      <h2 id="character-title">Choose a simple character for your space.</h2>
      <p class="hero-text">
        This is optional. It does not represent a diagnosis, score or learning level.
      </p>

      <label for="character-name"><strong>Character name</strong></label>
      <input id="character-name" type="text" maxlength="40"
        value="${escapeHtml(state.characterName || "")}"
        placeholder="Choose any name" />

      <fieldset class="journey-planning-fieldset">
        <legend><strong>Character symbol</strong></legend>
        <div class="hero-actions">
          ${["🦊","🐢","🐙","🦉","🐳","🤖"].map((symbol) => `
            <button
              type="button"
              class="secondary-button character-choice"
              data-symbol="${symbol}"
              aria-pressed="${state.characterSymbol === symbol ? "true" : "false"}"
            >${symbol}</button>
          `).join("")}
        </div>
      </fieldset>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="save-character">Save Character</button>
        <button type="button" class="secondary-button" id="character-back">Back</button>
      </div>
      <div id="character-status" class="path-note" role="status"></div>
    </section>
  `;

  let selected =
    state.characterSymbol || "🦊";

  document.querySelectorAll(".character-choice").forEach((button) => {
    button.addEventListener("click", () => {
      selected = button.dataset.symbol;
      document.querySelectorAll(".character-choice").forEach((other) => {
        other.setAttribute("aria-pressed", String(other === button));
      });
    });
  });

  document.getElementById("save-character").addEventListener("click", () => {
    const name = document.getElementById("character-name").value.trim();
    saveCompassLook({
      ...state,
      characterName: name || "My Character",
      characterSymbol: selected
    });
    showGoalLookStudio("Character saved on this device. It is not synced to the cloud in this V1.");
  });

  document.getElementById("character-back").addEventListener("click", showGoalLookStudio);
}

function showPhotoStudio() {
  const state = loadCompassLook();
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="photo-studio-title">
      <p class="eyebrow">Photo Studio</p>
      <h2 id="photo-studio-title">Add an optional photo to this Lookbook.</h2>
      <p class="hero-text">
        No photo is required. In this V1, the selected photo is previewed only for this browser session.
      </p>

      <input
        type="file"
        id="look-photo-input"
        accept="image/jpeg,image/png,image/webp"
      />

      <div id="look-photo-preview" class="material-preview-panel">
        <p>No photo selected.</p>
      </div>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="keep-look-photo" disabled>
          Keep This Preview
        </button>
        <button type="button" class="secondary-button" id="remove-look-photo">
          Remove Photo
        </button>
        <button type="button" class="secondary-button" id="photo-studio-back">
          Back
        </button>
      </div>
      <div id="photo-studio-status" class="path-note" role="status"></div>
    </section>
  `;

  let previewUrl = null;
  const input = document.getElementById("look-photo-input");
  const preview = document.getElementById("look-photo-preview");
  const keep = document.getElementById("keep-look-photo");

  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(file);

    preview.innerHTML = `
      <img
        src="${previewUrl}"
        alt="Your selected Lookbook preview"
        class="material-preview-image"
      />
    `;
    keep.disabled = false;
  });

  keep.addEventListener("click", () => {
    if (!previewUrl) return;
    window.compassLookPhotoPreview = previewUrl;
    document.getElementById("photo-studio-status").textContent =
      "Photo preview kept for this browser session.";
  });

  document.getElementById("remove-look-photo").addEventListener("click", () => {
    window.compassLookPhotoPreview = null;
    preview.innerHTML = "<p>No photo selected.</p>";
    keep.disabled = true;
    document.getElementById("photo-studio-status").textContent =
      "Photo removed from this Lookbook preview.";
  });

  document.getElementById("photo-studio-back").addEventListener("click", showGoalLookStudio);
}

function showLookbook() {
  const state = loadCompassLook();
  const main = document.querySelector("main");
  const photo = window.compassLookPhotoPreview || "";

  main.innerHTML = `
    <section class="material-page" aria-labelledby="lookbook-title">
      <div class="material-heading">
        <p class="eyebrow">My Lookbook</p>
        <h2 id="lookbook-title">Your saved visual choices.</h2>
      </div>

      <div class="home-grid">
        <article class="home-card">
          <span class="card-icon" aria-hidden="true">${state.goalSymbol || "🎯"}</span>
          <h3>Goal Look</h3>
          <p>${escapeHtml(state.goal || "No goal saved yet.")}</p>
        </article>

        <article class="home-card">
          <span class="card-icon" aria-hidden="true">${state.characterSymbol || "🙂"}</span>
          <h3>${escapeHtml(state.characterName || "My Character")}</h3>
          <p>Your optional character.</p>
        </article>

        <article class="home-card">
          <span class="card-icon" aria-hidden="true">📷</span>
          <h3>Photo</h3>
          ${
            photo
              ? `<img src="${photo}" alt="Your Lookbook photo preview" class="material-preview-image" />`
              : `<p>No photo preview kept in this browser session.</p>`
          }
        </article>
      </div>

      <div class="hero-actions">
        <button type="button" class="secondary-button" id="lookbook-back">Back to Goal Look</button>
      </div>
    </section>
  `;

  document.getElementById("lookbook-back").addEventListener("click", showGoalLookStudio);
}



const COMPASS_LANGUAGE_KEY =
  "compassTrailLanguageV1";

function getCompassLanguage() {
  return (
    localStorage.getItem(
      COMPASS_LANGUAGE_KEY
    ) || "en"
  );
}

function setCompassLanguage(
  language
) {
  const safeLanguage =
    language === "tr"
      ? "tr"
      : "en";

  localStorage.setItem(
    COMPASS_LANGUAGE_KEY,
    safeLanguage
  );

  document.documentElement.lang =
    safeLanguage;

  window.location.reload();
}

function compassText(
  english,
  turkish
) {
  return getCompassLanguage() === "tr"
    ? turkish
    : english;
}

function applyCompassLanguageBasics() {
  const language =
    getCompassLanguage();

  document.documentElement.lang =
    language;

  const replacements =
    language === "tr"
      ? [
          ["Bring Material", "Materyal Getir"],
          ["My Journey", "Yolculuğum"],
          ["Little Things", "Küçük Şeyler"],
          ["Idea Garden", "Fikir Bahçesi"],
          ["My Days", "Günlerim"],
          ["My Toolkit", "Araçlarım"],
          ["Make It Mine", "Kendime Göre Ayarla"],
          ["Back Home", "Ana Sayfaya Dön"],
          ["Open My Toolkit", "Araçlarımı Aç"],
          ["Open Check-in", "Check-in'i Aç"],
          ["Goal Look & Lookbook", "Hedef Görünümü ve Albüm"],
          ["Open Goal Look", "Hedef Görünümünü Aç"],
          ["Pick the support that helps now.", "Şu anda yardımcı olacak desteği seç."],
          ["Support is a tool, not a penalty.", "Destek bir araçtır, ceza değildir."],
          ["Add Favorite", "Favorilere Ekle"],
          ["Remove Favorite", "Favorilerden Çıkar"],
          ["Calculator", "Hesap Makinesi"],
          ["Idea Map", "Fikir Haritası"],
          ["Jigsaw Planner", "Parçalara Ayırma Planı"],
          ["Memory Palace", "Hafıza Sarayı"],
          ["Study Cards", "Çalışma Kartları"],
          ["Brain Dump", "Zihin Boşaltma"],
          ["Starting Sparks", "Başlangıç Fikirleri"],
          ["Make It Smaller", "Daha Küçük Adımlara Böl"],
          ["Read With Me", "Benimle Oku"],
          ["Memory Tools", "Hafıza Araçları"],
          ["Recharge Cove", "Mola Alanı"],
          ["Mark Complete", "Tamamlandı Olarak İşaretle"],
          ["Not complete yet.", "Henüz tamamlanmadı."],
          ["Complete.", "Tamamlandı."],
          ["Remove", "Kaldır"],
          ["Save", "Kaydet"],
          ["Cancel", "İptal"],
          ["Back", "Geri"],
          ["Continue", "Devam Et"],
          ["Use Updated Materials", "Güncellenmiş Materyalleri Kullan"],
          ["View or Change Materials", "Materyalleri Görüntüle veya Değiştir"],
          ["Return to Journey", "Yolculuğa Dön"],
          ["Review Text", "Metni Kontrol Et"],
          ["Read Scanned PDF", "Taranmış PDF'yi Oku"],
          ["Show Answer", "Cevabı Göster"],
          ["Hide Answer", "Cevabı Gizle"],
          ["Calculate", "Hesapla"],
          ["Clear", "Temizle"],
          ["No calculation yet.", "Henüz hesaplama yapılmadı."],
          ["Result:", "Sonuç:"],
          ["Goal Look", "Hedef Görünümü"],
          ["My Character", "Karakterim"],
          ["Photo Studio", "Fotoğraf Stüdyosu"],
          ["My Lookbook", "Albümüm"],
          ["Back to Goal Look", "Hedef Görünümüne Dön"],
          ["Save Goal Look", "Hedef Görünümünü Kaydet"],
          ["Save Character", "Karakteri Kaydet"],
          ["No photo selected.", "Fotoğraf seçilmedi."],
          ["Remove Photo", "Fotoğrafı Kaldır"],
          ["Check-in & My Pace", "Check-in ve Kendi Hızım"],
          ["Take a Break", "Mola Ver"],
          ["Pause", "Duraklat"],
          ["Resume", "Devam Ettir"],
          ["Stop", "Durdur"]
        ]
      : [];

  if (!replacements.length) {
    return;
  }

  const walker =
    document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );

  const nodes = [];

  while (walker.nextNode()) {
    nodes.push(
      walker.currentNode
    );
  }

  nodes.forEach((node) => {
    if (
      node.parentElement?.closest(
        "script, style, textarea"
      )
    ) {
      return;
    }

    let value =
      node.nodeValue;

    replacements.forEach(
      ([english, turkish]) => {
        value =
          value.replaceAll(
            english,
            turkish
          );
      }
    );

    node.nodeValue = value;
  });
}

function addCompassLanguageHomeCard() {
  if (
    document.getElementById(
      "compass-language-home-card"
    )
  ) return;

  const grid =
    document.querySelector(
      ".home-grid"
    );

  if (!grid) return;

  const current =
    getCompassLanguage();

  const card =
    document.createElement(
      "article"
    );

  card.id =
    "compass-language-home-card";
  card.className =
    "home-card";

  card.innerHTML = `
    <span class="card-icon" aria-hidden="true">🌐</span>
    <h3>${compassText("Language","Dil")}</h3>
    <p>
      ${compassText(
        "Choose the interface language. Turkish coverage is being completed across V1.",
        "Arayüz dilini seç. Türkçe kapsamı V1 boyunca tamamlanıyor."
      )}
    </p>

    <label for="compass-language-select">
      <strong>${compassText("Interface language","Arayüz dili")}</strong>
    </label>

    <select id="compass-language-select">
      <option value="en" ${current === "en" ? "selected" : ""}>English</option>
      <option value="tr" ${current === "tr" ? "selected" : ""}>Türkçe</option>
    </select>

    <div class="hero-actions">
      <button type="button" id="save-compass-language">
        ${compassText("Use This Language","Bu Dili Kullan")}
      </button>
    </div>
  `;

  grid.appendChild(card);

  document
    .getElementById(
      "save-compass-language"
    )
    ?.addEventListener(
      "click",
      () => {
        setCompassLanguage(
          document.getElementById(
            "compass-language-select"
          ).value
        );
      }
    );
}

window.addEventListener(
  "load",
  () => {
    applyCompassLanguageBasics();
    addCompassLanguageHomeCard();
    applyCompassLanguageBasics();
  }
);


function ensureCompassStatusRegion() {
  if (
    document.getElementById(
      "compass-global-status"
    )
  ) return;

  const region =
    document.createElement("div");

  region.id =
    "compass-global-status";
  region.setAttribute(
    "role",
    "status"
  );
  region.setAttribute(
    "aria-live",
    "polite"
  );
  region.setAttribute(
    "aria-atomic",
    "true"
  );
  region.style.position =
    "absolute";
  region.style.width =
    "1px";
  region.style.height =
    "1px";
  region.style.overflow =
    "hidden";
  region.style.clip =
    "rect(0 0 0 0)";
  region.style.whiteSpace =
    "nowrap";

  document.body.appendChild(
    region
  );
}

function announceCompassStatus(
  message
) {
  ensureCompassStatusRegion();
  const region =
    document.getElementById(
      "compass-global-status"
    );
  region.textContent = "";
  window.setTimeout(
    () => {
      region.textContent =
        String(message || "");
    },
    20
  );
}

window.addEventListener(
  "load",
  ensureCompassStatusRegion
);



const COMPASS_THEME_KEY = "compassTrailTheme";

function getCompassTheme() {
  const saved = localStorage.getItem(COMPASS_THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return "light";
}

function applyCompassTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.compassTheme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;

  const button = document.getElementById("compass-theme-toggle");
  if (button) {
    const dark = nextTheme === "dark";
    button.textContent = dark ? "Light Theme" : "Dark Theme";
    button.setAttribute("aria-pressed", String(dark));
    button.setAttribute(
      "aria-label",
      dark ? "Use light theme" : "Use dark theme"
    );
  }
}

function setCompassTheme(theme) {
  localStorage.setItem(COMPASS_THEME_KEY, theme === "dark" ? "dark" : "light");
  applyCompassTheme(getCompassTheme());
  announceCompassStatus?.(
    getCompassTheme() === "dark"
      ? "Dark theme is on."
      : "Light theme is on."
  );
}

function toggleCompassTheme() {
  setCompassTheme(getCompassTheme() === "dark" ? "light" : "dark");
}

function ensureCompassThemeToggle() {
  applyCompassTheme(getCompassTheme());

  if (document.getElementById("compass-theme-toggle")) return;

  const nav =
    document.querySelector("header nav") ||
    document.querySelector(".top-nav") ||
    document.querySelector("header");

  if (!nav) return;

  const button = document.createElement("button");
  button.type = "button";
  button.id = "compass-theme-toggle";
  button.className = "theme-toggle";
  button.addEventListener("click", toggleCompassTheme);
  nav.appendChild(button);

  applyCompassTheme(getCompassTheme());
}

applyCompassTheme(getCompassTheme());
window.addEventListener("DOMContentLoaded", ensureCompassThemeToggle);
window.addEventListener("load", ensureCompassThemeToggle);


const COMPASS_REAUTH_WINDOW_MS = 10 * 60 * 1000;
let compassLastSensitiveReauthAt = 0;

function markCompassSensitiveReauth() {
  compassLastSensitiveReauthAt = Date.now();
}

function compassSensitiveReauthIsFresh() {
  return (
    compassLastSensitiveReauthAt > 0 &&
    Date.now() - compassLastSensitiveReauthAt < COMPASS_REAUTH_WINDOW_MS
  );
}

function showAccountSafety() {
  const main = document.querySelector("main");
  const signedIn = Boolean(compassCloudSession?.user?.id);

  main.innerHTML = `
    <section class="material-page" aria-labelledby="account-safety-title">
      <div class="material-heading">
        <p class="eyebrow">Account Safety</p>
        <h2 id="account-safety-title">Account and data controls</h2>
        <p class="hero-text">
          These controls explain what happens before a sensitive account action.
          Compass Trail does not silently delete learning data.
        </p>
      </div>

      <div class="material-list">
        <article class="material-card">
          <div class="material-card-content">
            <h3>Signed-in status</h3>
            <p>${signedIn ? "You are signed in." : "You are signed out."}</p>
          </div>
        </article>

        <article class="material-card">
          <div class="material-card-content">
            <h3>Change Secret Code</h3>
            <p>
              Changing your Secret Code does not remove your Journeys or learning data.
              The existing account recovery function handles the change.
            </p>
            <button type="button" id="account-safety-open-account">
              Open My Account
            </button>
          </div>
        </article>

        <article class="material-card">
          <div class="material-card-content">
            <h3>Delete account</h3>
            <p>
              Account deletion is not enabled yet.
              It will require a fresh identity check, a clear confirmation,
              and backend deletion rules before it can be used.
            </p>
            <button type="button" disabled aria-disabled="true">
              Delete Account — Not Available Yet
            </button>
          </div>
        </article>

        <article class="material-card">
          <div class="material-card-content">
            <h3>Local data</h3>
            <p>
              Local browser data and cloud account data are separate.
              A final deletion flow must state exactly which data will be removed.
            </p>
          </div>
        </article>
      </div>

      <div class="hero-actions">
        <button type="button" class="secondary-button" id="account-safety-home">
          Back Home
        </button>
      </div>
    </section>
  `;

  document
    .getElementById("account-safety-open-account")
    ?.addEventListener("click", showCompassAccount);

  document
    .getElementById("account-safety-home")
    ?.addEventListener("click", backHome);
}

function addAccountSafetyHomeCard() {
  if (document.getElementById("account-safety-home-card")) return;
  const grid = document.querySelector(".home-grid");
  if (!grid) return;

  const card = document.createElement("article");
  card.id = "account-safety-home-card";
  card.className = "home-card";
  card.innerHTML = `
    <span class="card-icon" aria-hidden="true">🔐</span>
    <h3>Account Safety</h3>
    <p>See account, Secret Code and data-control information.</p>
    <button type="button" id="open-account-safety-button">
      Open Account Safety
    </button>
  `;
  grid.appendChild(card);
  document
    .getElementById("open-account-safety-button")
    ?.addEventListener("click", showAccountSafety);
}

window.addEventListener("load", addAccountSafetyHomeCard);


const COMPASS_UPLOAD_LIMITS = {
  image: 15 * 1024 * 1024,
  pdf: 30 * 1024 * 1024,
  document: 15 * 1024 * 1024
};

function getCompassMaterialKind(file) {
  const name = String(file?.name || "").toLowerCase();
  const type = String(file?.type || "").toLowerCase();

  if (type.startsWith("image/") || /\.(png|jpe?g|webp|heic|heif)$/i.test(name)) {
    return "image";
  }
  if (type === "application/pdf" || /\.pdf$/i.test(name)) {
    return "pdf";
  }
  if (
    type === "text/plain" ||
    type.includes("wordprocessingml") ||
    /\.(txt|docx)$/i.test(name)
  ) {
    return "document";
  }
  return "unsupported";
}

function validateCompassMaterialFile(file) {
  if (!file) {
    return { ok: false, message: "No file was selected." };
  }

  const kind = getCompassMaterialKind(file);
  if (kind === "unsupported") {
    return {
      ok: false,
      message: "This file type is not supported. Use an image, PDF, TXT or DOCX file."
    };
  }

  const max = COMPASS_UPLOAD_LIMITS[kind];
  if (Number(file.size || 0) > max) {
    const mb = Math.round(max / 1024 / 1024);
    return {
      ok: false,
      message: `This ${kind} file is too large. Use a file smaller than ${mb} MB.`
    };
  }

  return { ok: true, kind };
}

function installCompassUploadValidation() {
  document.addEventListener(
    "change",
    (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.type !== "file") return;

      const files = Array.from(input.files || []);
      if (!files.length) return;

      const invalid = files
        .map((file) => ({ file, result: validateCompassMaterialFile(file) }))
        .filter((entry) => !entry.result.ok);

      if (!invalid.length) return;

      const message = invalid
        .map((entry) => `${entry.file.name}: ${entry.result.message}`)
        .join(" ");

      input.value = "";
      announceCompassStatus?.(message);

      const existing = document.getElementById("compass-upload-validation-message");
      existing?.remove();

      const note = document.createElement("p");
      note.id = "compass-upload-validation-message";
      note.className = "path-note";
      note.setAttribute("role", "status");
      note.textContent = message;
      input.insertAdjacentElement("afterend", note);
    },
    true
  );
}

window.addEventListener("DOMContentLoaded", installCompassUploadValidation);

function focusCompassScreenHeading() {
  requestAnimationFrame(() => {
    const main = document.querySelector("main");
    const heading = main?.querySelector("h1, h2");
    if (!heading) return;
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: false });
  });
}

function installCompassScreenFocusManagement() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("button, a");
    if (!button) return;
    setTimeout(() => {
      const main = document.querySelector("main");
      if (!main) return;
      const active = document.activeElement;
      if (active && document.contains(active) && active !== document.body) return;
      focusCompassScreenHeading();
    }, 0);
  });
}

window.addEventListener("DOMContentLoaded", installCompassScreenFocusManagement);


const COMPASS_I18N_EXTRA = {
  tr: {
    "V1 Check": "V1 Kontrolü",
    "Open V1 Check": "V1 Kontrolünü Aç",
    "Account Safety": "Hesap Güvenliği",
    "Open Account Safety": "Hesap Güvenliğini Aç",
    "Account and data controls": "Hesap ve veri kontrolleri",
    "Signed-in status": "Oturum durumu",
    "You are signed in.": "Oturum açık.",
    "You are signed out.": "Oturum kapalı.",
    "Change Secret Code": "Gizli Kodu Değiştir",
    "Delete account": "Hesabı sil",
    "Local data": "Yerel veriler",
    "Back Home": "Ana Sayfaya Dön",
    "Dark Theme": "Koyu Tema",
    "Light Theme": "Açık Tema",
    "My Journeys": "Yolculuklarım",
    "Open Journey": "Yolculuğu Aç",
    "Save to Cloud Now": "Şimdi Buluta Kaydet",
    "Refresh Check": "Kontrolü Yenile",
    "Mark Complete": "Tamamlandı Olarak İşaretle",
    "Remove": "Kaldır",
    "Complete.": "Tamamlandı.",
    "Not complete yet.": "Henüz tamamlanmadı.",
    "View or Change Materials": "Materyalleri Gör veya Değiştir",
    "Return to Journey": "Yolculuğa Dön",
    "Use Updated Materials": "Güncellenen Materyalleri Kullan",
    "Read Scanned PDF": "Taranmış PDF'yi Oku",
    "Review Text": "Metni Kontrol Et",
    "My Toolkit": "Araçlarım",
    "Make It Smaller": "Daha Küçük Hale Getir",
    "Starting Sparks": "Başlangıç Fikirleri",
    "Read With Me": "Benimle Oku",
    "Memory Tools": "Hafıza Araçları",
    "Memory Palace": "Hafıza Sarayı",
    "Study Cards": "Çalışma Kartları",
    "Brain Dump": "Aklındakileri Yaz",
    "Recharge Cove": "Mola Alanı",
    "My Days": "Günlerim",
    "Idea Garden": "Fikir Alanı",
    "Little Things": "Küçük İşler",
    "My Account": "Hesabım",
    "Language": "Dil"
  }
};

function translateCompassExactText(text) {
  if (getCompassLanguage?.() !== "tr") return text;
  return COMPASS_I18N_EXTRA.tr[text] || text;
}

function applyCompassExtraTranslations(root = document.body) {
  if (!root || getCompassLanguage?.() !== "tr") return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed) return;
    const translated = COMPASS_I18N_EXTRA.tr[trimmed];
    if (!translated) return;
    node.nodeValue = raw.replace(trimmed, translated);
  });

  document.querySelectorAll("[aria-label]").forEach((el) => {
    const label = el.getAttribute("aria-label");
    const translated = COMPASS_I18N_EXTRA.tr[label];
    if (translated) el.setAttribute("aria-label", translated);
  });
}

function installCompassTranslationObserver() {
  if (window.__compassTranslationObserverInstalled) return;
  window.__compassTranslationObserverInstalled = true;

  const observer = new MutationObserver(() => {
    if (getCompassLanguage?.() === "tr") {
      applyCompassExtraTranslations(document.body);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  applyCompassExtraTranslations(document.body);
}

window.addEventListener("DOMContentLoaded", installCompassTranslationObserver);

function showWhereWasI() {
  const main = document.querySelector("main");
  const journey = compassStudentState.activeJourney;

  if (!journey) {
    main.innerHTML = `
      <section class="material-page" aria-labelledby="where-was-i-title">
        <div class="material-heading">
          <p class="eyebrow">Where Was I?</p>
          <h2 id="where-was-i-title">There is no current Journey yet.</h2>
          <p class="hero-text">
            Create or open a Journey first. Compass Trail will then show your saved position here.
          </p>
        </div>
        <button type="button" class="secondary-button" id="where-was-i-home">Back Home</button>
      </section>
    `;
    document.getElementById("where-was-i-home")?.addEventListener("click", backHome);
    applyCompassExtraTranslations(main);
    return;
  }

  const steps = Array.isArray(journey.steps) ? journey.steps : [];
  const rawIndex = Number(journey.currentStepIndex ?? journey.currentStep ?? 0);
  const stepIndex = Math.max(0, Math.min(Number.isFinite(rawIndex) ? rawIndex : 0, Math.max(steps.length - 1, 0)));
  const step = steps[stepIndex];
  const stepText =
    typeof step === "string"
      ? step
      : step?.title || step?.text || step?.label || "Current step";

  main.innerHTML = `
    <section class="material-page" aria-labelledby="where-was-i-title">
      <div class="material-heading">
        <p class="eyebrow">Where Was I?</p>
        <h2 id="where-was-i-title">${escapeHtml(journey.task || journey.title || "Current Journey")}</h2>
        <p class="hero-text">
          Your saved position is step ${steps.length ? stepIndex + 1 : 0}${steps.length ? ` of ${steps.length}` : ""}.
        </p>
      </div>
      <article class="material-card">
        <div class="material-card-content">
          <h3>Current step</h3>
          <p>${escapeHtml(stepText)}</p>
          <p>Opening this summary does not change your progress.</p>
        </div>
      </article>
      <div class="hero-actions">
        <button type="button" class="primary-button" id="where-was-i-continue">Continue Where I Left Off</button>
        <button type="button" class="secondary-button" id="where-was-i-home">Back Home</button>
      </div>
    </section>
  `;

  document.getElementById("where-was-i-continue")?.addEventListener("click", () => {
    if (typeof showJourneyWorkspace === "function") {
      showJourneyWorkspace(journey, stepIndex);
    } else if (typeof showWorkspace === "function") {
      showWorkspace(journey, stepIndex);
    }
  });
  document.getElementById("where-was-i-home")?.addEventListener("click", backHome);
  applyCompassExtraTranslations(main);
}

function addWhereWasIHomeCard() {
  if (document.getElementById("where-was-i-home-card")) return;
  const grid=document.querySelector(".home-grid");
  if(!grid) return;
  const card=document.createElement("article");
  card.id="where-was-i-home-card";
  card.className="home-card";
  card.innerHTML=`
    <span class="card-icon" aria-hidden="true">📍</span>
    <h3>Where Was I?</h3>
    <p>See the saved position in your current Journey.</p>
    <button type="button" id="open-where-was-i">Show My Position</button>
  `;
  grid.appendChild(card);
  document.getElementById("open-where-was-i")?.addEventListener("click",showWhereWasI);
  applyCompassExtraTranslations(card);
}
window.addEventListener("load",addWhereWasIHomeCard);

function addV1DiagnosticsHomeCard() {
  if (document.getElementById("v1-diagnostics-home-card")) return;

  const grid = document.querySelector(".home-grid");
  if (!grid) return;

  const card = document.createElement("article");
  card.id = "v1-diagnostics-home-card";
  card.className = "home-card";
  card.innerHTML = `
    <span class="card-icon" aria-hidden="true">🧪</span>
    <h3>V1 Check</h3>
    <p>
      Check several important V1 systems in one place.
      This screen does not change your learning progress.
    </p>
    <button type="button" id="open-v1-diagnostics-button">
      Open V1 Check
    </button>
  `;

  grid.appendChild(card);

  document
    .getElementById("open-v1-diagnostics-button")
    ?.addEventListener("click", showV1Diagnostics);
}

window.addEventListener("load", addV1DiagnosticsHomeCard);

function getV1DiagnosticRows() {
  const journeys = Array.isArray(compassStudentState.journeys)
    ? compassStudentState.journeys
    : [];

  const signedIn = Boolean(compassCloudSession?.user?.id);

  return [
    {
      name: "Local Journey list",
      result: journeys.length > 0 ? "READY" : "NO DATA YET",
      detail: journeys.length
        ? `${journeys.length} Journey${journeys.length === 1 ? "" : "s"} saved on this device.`
        : "Create or restore a Journey to test this."
    },
    {
      name: "Multi-Journey state",
      result: Array.isArray(compassStudentState.journeys) ? "READY" : "CHECK",
      detail: "Journeys use a list instead of a single-only local state."
    },
    {
      name: "Cloud account",
      result: signedIn ? "SIGNED IN" : "SIGNED OUT",
      detail: signedIn
        ? "Cloud save and restore can be tested with this fake account."
        : "Sign in to test cloud save and cross-browser restore."
    },
    {
      name: "Cloud Journey IDs",
      result:
        journeys.length &&
        journeys.every((journey) => journey.cloudJourneyId)
          ? "SYNCED IDS"
          : "NOT ALL SYNCED",
      detail:
        journeys.filter((journey) => journey.cloudJourneyId).length +
        " of " +
        journeys.length +
        " local Journeys currently have a cloud Journey ID."
    },
    {
      name: "Scanned PDF OCR",
      result:
        typeof readScannedPdfText === "function" &&
        typeof runScannedPdfOcr === "function"
          ? "CODE PRESENT"
          : "CHECK",
      detail:
        "A real scanned PDF is still required to mark OCR behavior as tested."
    },
    {
      name: "Selectable PDF extraction",
      result:
        typeof readPdfText === "function" ||
        typeof extractPdfText === "function"
          ? "CODE PRESENT"
          : "CHECK",
      detail:
        "A selectable-text PDF regression is still required. It must not be routed to scanned-PDF OCR."
    },
    {
      name: "Where Was I",
      result:
        typeof showWhereWasI === "function" ? "READY" : "CHECK",
      detail:
        "The learner can inspect the saved Journey position without changing progress."
    },
    {
      name: "Turkish interface coverage",
      result:
        typeof applyCompassExtraTranslations === "function" ? "EXPANDED" : "CHECK",
      detail:
        "Key V1 navigation and support labels have Turkish coverage. Final whole-site language review is still required."
    },
    {
      name: "Material upload validation",
      result:
        typeof validateCompassMaterialFile === "function" ? "READY" : "CHECK",
      detail:
        "Images, PDFs, TXT and DOCX files have explicit browser-side type and size checks. Server-side checks are still required for future cloud material storage."
    },
    {
      name: "Account deletion",
      result: "NOT ENABLED",
      detail:
        "Frontend deletion remains disabled until reauthentication and backend deletion behavior are implemented and tested."
    },
    {
      name: "Teacher end-to-end access",
      result: "TEST PENDING",
      detail:
        "Teacher role, class permissions and teacher reset require a real end-to-end test before V1 can be closed."
    },
    {
      name: "Theme setting",
      result:
        typeof getCompassTheme === "function"
          ? String(getCompassTheme()).toUpperCase()
          : "CHECK",
      detail:
        "Light and dark themes are persistent on this device and do not change learning progress."
    },
    {
      name: "Language setting",
      result:
        typeof getCompassLanguage === "function"
          ? String(getCompassLanguage()).toUpperCase()
          : "CHECK",
      detail:
        "The current interface language setting is shown here. Full translation coverage is still audited separately."
    },
    {
      name: "Global status announcements",
      result:
        typeof announceCompassStatus === "function"
          ? "READY"
          : "CHECK",
      detail:
        "Shared polite ARIA status support for screen-reader announcements."
    }
  ];
}

function showV1Diagnostics() {
  const main = document.querySelector("main");
  const rows = getV1DiagnosticRows();

  main.innerHTML = `
    <section class="material-page" aria-labelledby="v1-check-title">
      <div class="material-heading">
        <p class="eyebrow">V1 Check</p>
        <h2 id="v1-check-title">Important systems in one screen.</h2>
        <p class="hero-text">
          READY or CODE PRESENT means the required code was found.
          It does not replace a real behavior test.
        </p>
      </div>

      <div class="material-list">
        ${rows.map((row) => `
          <article class="material-card">
            <div class="material-card-content">
              <h3>${escapeHtml(row.name)}</h3>
              <p><strong>${escapeHtml(row.result)}</strong></p>
              <p>${escapeHtml(row.detail)}</p>
            </div>
          </article>
        `).join("")}
      </div>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="run-cloud-sync-now">
          Save to Cloud Now
        </button>
        <button type="button" class="secondary-button" id="refresh-v1-check">
          Refresh Check
        </button>
        <button type="button" class="secondary-button" id="v1-check-home">
          Back Home
        </button>
      </div>

      <div id="v1-check-status" class="path-note" role="status">
        No manual cloud save requested on this screen yet.
      </div>
    </section>
  `;

  document.getElementById("run-cloud-sync-now")?.addEventListener("click", async () => {
    const status = document.getElementById("v1-check-status");

    if (!compassCloudSession?.user?.id) {
      status.textContent = "Sign in before testing cloud save.";
      return;
    }

    status.textContent = "Saving to cloud…";

    try {
      await syncCompassCloudState();
      status.textContent =
        "Cloud save request finished. Refresh the check to inspect Journey cloud IDs.";
      announceCompassStatus?.("Cloud save request finished.");
    } catch (error) {
      console.error(error);
      status.textContent =
        "Cloud save did not finish. No local Journey was removed.";
    }
  });

  document.getElementById("refresh-v1-check")?.addEventListener("click", showV1Diagnostics);
  document.getElementById("v1-check-home")?.addEventListener("click", backHome);
}

function backHome() {
  window.location.reload();
}

function showLittleThings(
  notice = ""
) {
  // This screen can also be opened directly by a click handler.
  // Browsers pass a PointerEvent to that handler; it is not a user-facing message.
  if (typeof notice !== "string") {
    notice = "";
  }
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
              ? "Marked complete. You can undo this anytime."
              : "Marked not complete. It is back on your list."
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
            "Removed from Little Things."
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
                  ? "Complete."
                  : "Not complete yet."
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
                  : "Mark Complete"
              }
            </button>

            <button
              type="button"
              class="small-action-button little-thing-remove"
              data-id="${item.id}"
            >
              Remove
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
  // This screen can also be opened directly by a click handler.
  // Browsers pass a PointerEvent to that handler; it is not a user-facing message.
  if (typeof notice !== "string") {
    notice = "";
  }
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
          Save notes and ideas here.
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
              Remove
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
  // This screen can also be opened directly by a click handler.
  // Browsers pass a PointerEvent to that handler; it is not a user-facing message.
  if (typeof notice !== "string") {
    notice = "";
  }
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


const COMPASS_TOOLKIT_FAVORITES_KEY =
  "compassTrailToolkitFavoritesV1";

function loadToolkitFavorites() {
  try {
    const value = JSON.parse(
      localStorage.getItem(
        COMPASS_TOOLKIT_FAVORITES_KEY
      ) || "[]"
    );

    return Array.isArray(value)
      ? value
      : [];
  } catch (_) {
    return [];
  }
}

function saveToolkitFavorites(
  favorites
) {
  try {
    localStorage.setItem(
      COMPASS_TOOLKIT_FAVORITES_KEY,
      JSON.stringify(favorites)
    );
  } catch (_) {}
}

function toggleToolkitFavorite(
  toolId
) {
  const favorites =
    loadToolkitFavorites();

  const next =
    favorites.includes(toolId)
      ? favorites.filter(
          (id) => id !== toolId
        )
      : [...favorites, toolId];

  saveToolkitFavorites(next);
  showToolkitHub(
    "Toolkit favorites updated."
  );
}

function showToolkitHub(
  notice = ""
) {
  if (typeof notice !== "string") {
    notice = "";
  }

  const main =
    document.querySelector("main");

  const favorites =
    loadToolkitFavorites();

  const tools = [
    ["🧩","Make It Smaller","Turn one task into a few concrete moves.","toolkit-smaller",showStandaloneMakeSmaller],
    ["🌱","Starting Sparks","Get several clear ways to begin.","toolkit-sparks",showStartingSparks],
    ["🅿️","Park It","Put an unrelated thought somewhere safe for later.","toolkit-park",() => showStandaloneParkIt()],
    ["🌿","Recharge Cove","Take a pause without losing your place.","toolkit-recharge",showHomeRechargeCove],
    ["📖","Read With Me","Read pasted learning text aloud and control the voice pace.","toolkit-read",showReadWithMe],
    ["🧠","Memory Tools","Use chunking or build a mnemonic from what you need to remember.","toolkit-memory",showMemoryTools],
    ["🧮","Calculator","Use a simple calculator without leaving your learning space.","toolkit-calculator",showToolkitCalculator],
    ["🗺️","Idea Map","Turn a topic into connected branches you can edit.","toolkit-idea-map",showIdeaMap],
    ["🧱","Jigsaw Planner","Split a topic into parts, work on each part, then put them back together.","toolkit-jigsaw",showJigsawPlanner],
    ["🏠","Memory Palace","Place things to remember in familiar locations, in a fixed order.","toolkit-palace",showMemoryPalace],
    ["🃏","Study Cards","Make simple question-and-answer cards and reveal answers when you choose.","toolkit-study-cards",showStudyCards],
    ["🧺","Brain Dump","Write everything down first, then sort it into Now, Later or Not Needed.","toolkit-brain-dump",showBrainDump]
  ];

  const ordered = [
    ...tools.filter(
      (tool) =>
        favorites.includes(tool[3])
    ),
    ...tools.filter(
      (tool) =>
        !favorites.includes(tool[3])
    )
  ];

  main.innerHTML = `
    <section class="material-page" aria-labelledby="toolkit-title">
      <div class="material-heading">
        <p class="eyebrow">My Toolkit</p>
        <h2 id="toolkit-title">Pick the support that helps now.</h2>
        <p class="hero-text">
          Support is a tool, not a penalty. You do not need a reason to use one.
          Favorite tools appear first on this device.
        </p>
      </div>

      ${
        notice
          ? `<div class="undo-message" role="status"><span>${escapeHtml(notice)}</span></div>`
          : ""
      }

      <div class="home-grid">
        ${ordered.map((tool) => {
          const [icon,title,description,id] = tool;
          const isFavorite =
            favorites.includes(id);

          return `
            <article class="home-card">
              <span class="card-icon" aria-hidden="true">${icon}</span>
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(description)}</p>
              <div class="hero-actions">
                <button
                  type="button"
                  class="secondary-button toolkit-open-button"
                  data-tool-id="${id}"
                >
                  Open ${escapeHtml(title)}
                </button>
                <button
                  type="button"
                  class="small-action-button toolkit-favorite-button"
                  data-tool-id="${id}"
                  aria-pressed="${isFavorite}"
                >
                  ${isFavorite ? "Remove Favorite" : "Add Favorite"}
                </button>
              </div>
            </article>
          `;
        }).join("")}
      </div>

      <div class="hero-actions">
        <button type="button" class="secondary-button" id="toolkit-home-button">Back Home</button>
      </div>
    </section>
  `;

  const actionMap =
    Object.fromEntries(
      tools.map(
        (tool) => [
          tool[3],
          tool[4]
        ]
      )
    );

  document
    .querySelectorAll(
      ".toolkit-open-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          actionMap[
            button.dataset.toolId
          ]?.();
        }
      );
    });

  document
    .querySelectorAll(
      ".toolkit-favorite-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          toggleToolkitFavorite(
            button.dataset.toolId
          );
        }
      );
    });

  document
    .getElementById(
      "toolkit-home-button"
    )
    ?.addEventListener(
      "click",
      backHome
    );
}

function toolkitActionCard(icon, title, description, id) {
  return `
    <article class="home-card">
      <span class="card-icon" aria-hidden="true">${icon}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
      <button type="button" class="secondary-button" id="${id}">Open ${escapeHtml(title)}</button>
    </article>
  `;
}

function toolkitCard(icon, title, description) {
  return `
    <article class="home-card">
      <span class="card-icon" aria-hidden="true">${icon}</span>
      <h3>${title}</h3>
      <p>${description}</p>
    </article>
  `;
}

function toolkitBackButton() {
  return `<button type="button" class="secondary-button" id="toolkit-back-button">Back to My Toolkit</button>`;
}

function wireToolkitBack() {
  document.getElementById("toolkit-back-button")?.addEventListener("click", showToolkitHub);
}


function safeCalculate(expression) {
  const cleaned = String(expression || "")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/\s+/g, "");

  if (!cleaned) {
    return { ok: false, message: "Enter a calculation first." };
  }

  if (!/^[0-9+\-*/().%]+$/.test(cleaned)) {
    return {
      ok: false,
      message: "Use numbers, parentheses, +, −, ×, ÷ or % only."
    };
  }

  let index = 0;

  function peek() {
    return cleaned[index] || "";
  }

  function consume(char) {
    if (peek() === char) {
      index += 1;
      return true;
    }
    return false;
  }

  function number() {
    const start = index;
    let dots = 0;

    while (/[0-9.]/.test(peek())) {
      if (peek() === ".") dots += 1;
      index += 1;
    }

    if (start === index || dots > 1) {
      throw new Error("number");
    }

    const value = Number(cleaned.slice(start, index));
    if (!Number.isFinite(value)) throw new Error("number");
    return value;
  }

  function primary() {
    if (consume("+")) return primary();
    if (consume("-")) return -primary();

    if (consume("(")) {
      const value = expressionLevel();
      if (!consume(")")) throw new Error("parenthesis");
      return value;
    }

    return number();
  }

  function percent() {
    let value = primary();
    while (consume("%")) value /= 100;
    return value;
  }

  function term() {
    let value = percent();

    while (true) {
      if (consume("*")) {
        value *= percent();
      } else if (consume("/")) {
        const divisor = percent();
        if (divisor === 0) throw new Error("zero");
        value /= divisor;
      } else {
        break;
      }
    }

    return value;
  }

  function expressionLevel() {
    let value = term();

    while (true) {
      if (consume("+")) {
        value += term();
      } else if (consume("-")) {
        value -= term();
      } else {
        break;
      }
    }

    return value;
  }

  try {
    const value = expressionLevel();

    if (index !== cleaned.length || !Number.isFinite(value)) {
      throw new Error("syntax");
    }

    return {
      ok: true,
      value: Math.abs(value) < 1e-12 ? 0 : Number(value.toPrecision(12))
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error.message === "zero"
          ? "Division by zero does not have a finite result."
          : "Check the calculation. Use complete numbers and matching parentheses."
    };
  }
}

function showToolkitCalculator() {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="calculator-title">
      <p class="eyebrow">Calculator</p>
      <h2 id="calculator-title">Calculate one expression.</h2>
      <p class="hero-text">
        This calculator accepts numbers, parentheses, +, −, ×, ÷ and %.
      </p>

      <label for="calculator-input">
        <strong>Calculation</strong>
      </label>

      <input
        id="calculator-input"
        type="text"
        inputmode="decimal"
        autocomplete="off"
        placeholder="For example: (24 + 6) ÷ 3"
      />

      <div class="hero-actions">
        <button type="button" class="primary-button" id="calculate-button">
          Calculate
        </button>
        <button type="button" class="secondary-button" id="calculator-clear-button">
          Clear
        </button>
        ${toolkitBackButton()}
      </div>

      <div id="calculator-result" class="path-note" role="status">
        No calculation yet.
      </div>
    </section>
  `;

  wireToolkitBack();

  const input = document.getElementById("calculator-input");
  const result = document.getElementById("calculator-result");

  const calculate = () => {
    const answer = safeCalculate(input.value);
    result.textContent = answer.ok
      ? `Result: ${answer.value}`
      : answer.message;
  };

  document.getElementById("calculate-button").addEventListener("click", calculate);
  document.getElementById("calculator-clear-button").addEventListener("click", () => {
    input.value = "";
    result.textContent = "No calculation yet.";
    input.focus();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") calculate();
  });
}

function showIdeaMap() {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="idea-map-title">
      <p class="eyebrow">Idea Map</p>
      <h2 id="idea-map-title">Put one topic in the centre and add connected branches.</h2>

      <label for="idea-map-topic"><strong>Central topic</strong></label>
      <input id="idea-map-topic" type="text" maxlength="120" />

      <label for="idea-map-branches"><strong>Branches — one per line</strong></label>
      <textarea
        id="idea-map-branches"
        rows="7"
        maxlength="1500"
        placeholder="Main idea 1&#10;Main idea 2&#10;Main idea 3"
      ></textarea>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="build-idea-map-button">
          Build Idea Map
        </button>
        ${toolkitBackButton()}
      </div>

      <div id="idea-map-result" aria-live="polite"></div>
    </section>
  `;

  wireToolkitBack();

  document.getElementById("build-idea-map-button").addEventListener("click", () => {
    const topic = document.getElementById("idea-map-topic").value.trim();
    const branches = document.getElementById("idea-map-branches").value
      .split("\n")
      .map((value) => value.trim())
      .filter(Boolean)
      .slice(0, 12);
    const result = document.getElementById("idea-map-result");

    if (!topic || !branches.length) {
      result.innerHTML = `<p class="path-note">Add a central topic and at least one branch.</p>`;
      return;
    }

    result.innerHTML = `
      <section class="basket-section" aria-label="Editable idea map">
        <h3>${escapeHtml(topic)}</h3>
        <p class="hero-text">Each branch is editable. Change the wording whenever you need.</p>
        <div class="material-list">
          ${branches.map((branch, index) => `
            <label>
              <strong>Branch ${index + 1}</strong>
              <textarea class="chunk-edit-field" rows="2">${escapeHtml(branch)}</textarea>
            </label>
          `).join("")}
        </div>
      </section>
    `;
  });
}

function showJigsawPlanner() {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="jigsaw-title">
      <p class="eyebrow">Jigsaw Planner</p>
      <h2 id="jigsaw-title">Split one topic into parts, then reconnect the parts.</h2>
      <p class="hero-text">
        This is a planning scaffold. It does not grade your answers.
      </p>

      <label for="jigsaw-topic"><strong>Topic or task</strong></label>
      <input id="jigsaw-topic" type="text" maxlength="160" />

      <label for="jigsaw-parts"><strong>How many parts?</strong></label>
      <select id="jigsaw-parts">
        <option value="2">2 parts</option>
        <option value="3" selected>3 parts</option>
        <option value="4">4 parts</option>
        <option value="5">5 parts</option>
        <option value="6">6 parts</option>
      </select>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="build-jigsaw-button">
          Make the Parts
        </button>
        ${toolkitBackButton()}
      </div>

      <div id="jigsaw-result" aria-live="polite"></div>
    </section>
  `;

  wireToolkitBack();

  document.getElementById("build-jigsaw-button").addEventListener("click", () => {
    const topic = document.getElementById("jigsaw-topic").value.trim();
    const count = Number(document.getElementById("jigsaw-parts").value);
    const result = document.getElementById("jigsaw-result");

    if (!topic) {
      result.innerHTML = `<p class="path-note">Write the topic or task first.</p>`;
      return;
    }

    result.innerHTML = `
      <section class="basket-section">
        <h3>${escapeHtml(topic)}</h3>
        <p class="hero-text">
          Give each part one clear focus. At the end, write what the parts show together.
        </p>

        <div class="material-list">
          ${Array.from({ length: count }, (_, index) => `
            <label>
              <strong>Part ${index + 1}</strong>
              <textarea
                class="chunk-edit-field"
                rows="3"
                placeholder="What belongs in this part?"
              ></textarea>
            </label>
          `).join("")}
        </div>

        <label for="jigsaw-reconnect">
          <strong>Put the parts back together</strong>
        </label>
        <textarea
          id="jigsaw-reconnect"
          rows="4"
          placeholder="What do these parts show when you look at them together?"
        ></textarea>
      </section>
    `;
  });
}


function showMemoryPalace() {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="memory-palace-title">
      <p class="eyebrow">Memory Palace</p>
      <h2 id="memory-palace-title">Connect items to familiar places in a fixed order.</h2>
      <p class="hero-text">
        Choose a familiar place, then enter the things you want to remember.
        Compass Trail will pair each item with one location.
      </p>

      <label for="palace-place"><strong>Familiar place</strong></label>
      <select id="palace-place">
        <option value="home">Home</option>
        <option value="classroom">Classroom</option>
        <option value="route">A familiar route</option>
      </select>

      <label for="palace-items"><strong>Things to remember — one per line</strong></label>
      <textarea id="palace-items" rows="8" maxlength="1600"
        placeholder="Item 1&#10;Item 2&#10;Item 3"></textarea>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="build-palace-button">Build Memory Route</button>
        ${toolkitBackButton()}
      </div>

      <div id="palace-result" aria-live="polite"></div>
    </section>
  `;

  wireToolkitBack();

  const locations = {
    home: ["Front door", "Hallway", "Sofa", "Table", "Kitchen sink", "Bed", "Window", "Desk"],
    classroom: ["Door", "Teacher desk", "Board", "First desk", "Bookshelf", "Window", "Clock", "Back wall"],
    route: ["Starting point", "First turn", "Crossing", "Landmark", "Middle point", "Second turn", "Last landmark", "Destination"]
  };

  document.getElementById("build-palace-button").addEventListener("click", () => {
    const place = document.getElementById("palace-place").value;
    const items = document.getElementById("palace-items").value
      .split("\\n")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 8);
    const result = document.getElementById("palace-result");

    if (!items.length) {
      result.innerHTML = `<p class="path-note">Add at least one thing to remember.</p>`;
      return;
    }

    result.innerHTML = `
      <section class="basket-section">
        <h3>Your memory route</h3>
        <p class="hero-text">
          Follow these locations in order. Imagine each item clearly at its paired location.
        </p>
        <div class="suggested-path">
          ${items.map((item, index) =>
            pathStep(
              index + 1,
              locations[place][index],
              escapeHtml(item)
            )
          ).join("")}
        </div>
      </section>
    `;
  });
}


function showStudyCards() {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="study-cards-title">
      <p class="eyebrow">Study Cards</p>
      <h2 id="study-cards-title">Make question-and-answer cards.</h2>
      <p class="hero-text">
        Enter one card per line using a vertical bar between the question and answer.
      </p>

      <label for="study-card-input"><strong>Cards</strong></label>
      <textarea id="study-card-input" rows="9" maxlength="3000"
        placeholder="What is photosynthesis? | A process plants use to convert light into chemical energy.&#10;What is H2O? | Water"></textarea>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="build-study-cards">Make Cards</button>
        ${toolkitBackButton()}
      </div>

      <div id="study-card-result" aria-live="polite"></div>
    </section>
  `;

  wireToolkitBack();

  document.getElementById("build-study-cards").addEventListener("click", () => {
    const rows = document.getElementById("study-card-input").value
      .split("\n")
      .map((row) => row.trim())
      .filter(Boolean)
      .slice(0, 20);

    const cards = rows
      .map((row) => {
        const splitAt = row.indexOf("|");
        if (splitAt < 1) return null;
        return {
          question: row.slice(0, splitAt).trim(),
          answer: row.slice(splitAt + 1).trim()
        };
      })
      .filter((card) => card?.question && card?.answer);

    const result = document.getElementById("study-card-result");

    if (!cards.length) {
      result.innerHTML = `<p class="path-note">Add at least one complete card using: question | answer</p>`;
      return;
    }

    result.innerHTML = `
      <div class="material-list">
        ${cards.map((card, index) => `
          <article class="material-card">
            <div class="material-card-content">
              <p class="material-position">Card ${index + 1}</p>
              <h3>${escapeHtml(card.question)}</h3>
              <div id="study-answer-${index}" hidden>
                <p><strong>Answer:</strong> ${escapeHtml(card.answer)}</p>
              </div>
              <button
                type="button"
                class="small-action-button reveal-study-answer"
                data-index="${index}"
                aria-expanded="false"
                aria-controls="study-answer-${index}"
              >Show Answer</button>
            </div>
          </article>
        `).join("")}
      </div>
    `;

    result.querySelectorAll(".reveal-study-answer").forEach((button) => {
      button.addEventListener("click", () => {
        const answer = document.getElementById(`study-answer-${button.dataset.index}`);
        const willShow = answer.hidden;
        answer.hidden = !willShow;
        button.setAttribute("aria-expanded", String(willShow));
        button.textContent = willShow ? "Hide Answer" : "Show Answer";
      });
    });
  });
}

function showBrainDump() {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="brain-dump-title">
      <p class="eyebrow">Brain Dump</p>
      <h2 id="brain-dump-title">Write things down before deciding what to do with them.</h2>
      <p class="hero-text">
        Enter one thought or task per line. Nothing is marked complete automatically.
      </p>

      <label for="brain-dump-input"><strong>Thoughts or tasks — one per line</strong></label>
      <textarea id="brain-dump-input" rows="9" maxlength="3000"></textarea>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="sort-brain-dump">Make Sorting Cards</button>
        ${toolkitBackButton()}
      </div>

      <div id="brain-dump-result" aria-live="polite"></div>
    </section>
  `;

  wireToolkitBack();

  document.getElementById("sort-brain-dump").addEventListener("click", () => {
    const items = document.getElementById("brain-dump-input").value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 30);
    const result = document.getElementById("brain-dump-result");

    if (!items.length) {
      result.innerHTML = `<p class="path-note">Write at least one thought or task first.</p>`;
      return;
    }

    result.innerHTML = `
      <div class="material-list">
        ${items.map((item, index) => `
          <article class="material-card">
            <div class="material-card-content">
              <h3>${escapeHtml(item)}</h3>
              <label for="brain-choice-${index}"><strong>Where should this go?</strong></label>
              <select id="brain-choice-${index}">
                <option value="">Choose</option>
                <option value="Now">Now</option>
                <option value="Later">Later</option>
                <option value="Not Needed">Not Needed</option>
              </select>
              <p class="path-note brain-choice-status" data-index="${index}">
                No category selected.
              </p>
            </div>
          </article>
        `).join("")}
      </div>
    `;

    items.forEach((_, index) => {
      document.getElementById(`brain-choice-${index}`).addEventListener("change", (event) => {
        result.querySelector(`.brain-choice-status[data-index="${index}"]`).textContent =
          event.target.value
            ? `Category: ${event.target.value}`
            : "No category selected.";
      });
    });
  });
}

function showStartingSparks() {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="hero" aria-labelledby="sparks-title">
      <p class="eyebrow">Starting Sparks</p>
      <h2 id="sparks-title">Choose one clear way to begin.</h2>
      <p class="hero-text">
        Write the task. Compass Trail will give you several concrete first moves.
        Choose the one that feels easiest to start.
      </p>

      <label for="sparks-task">
        <strong>What are you trying to start?</strong>
      </label>
      <textarea
        id="sparks-task"
        rows="4"
        maxlength="500"
        placeholder="For example: write the introduction to my history presentation."
      ></textarea>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="make-sparks-button">
          Show Starting Options
        </button>
        ${toolkitBackButton()}
      </div>

      <div id="sparks-result" aria-live="polite"></div>
    </section>
  `;

  wireToolkitBack();

  document.getElementById("make-sparks-button").addEventListener("click", () => {
    const task = document.getElementById("sparks-task").value.trim();
    const result = document.getElementById("sparks-result");

    if (!task) {
      result.innerHTML = `<p class="path-note">Write the task first. A few words are enough.</p>`;
      return;
    }

    const options = [
      {
        title: "Set up only",
        text: `Open what you need for “${task}”. Stop there if that is enough for now.`
      },
      {
        title: "Define the finish point",
        text: `Write one sentence that says what “${task}” needs when this part is finished.`
      },
      {
        title: "Do two minutes",
        text: `Work on the smallest visible part of “${task}” for two minutes. Then choose whether to continue.`
      },
      {
        title: "Find one missing answer",
        text: `Write one question you need answered before you can continue with “${task}”.`
      }
    ];

    result.innerHTML = `
      <fieldset class="journey-planning-fieldset">
        <legend><strong>Pick one starting move</strong></legend>
        <p class="hero-text">Selecting one does not remove the others. You can change your choice.</p>

        <div class="material-list">
          ${options.map((option, index) => `
            <article class="material-card">
              <div>
                <h3>${escapeHtml(option.title)}</h3>
                <p>${escapeHtml(option.text)}</p>
              </div>
              <div class="material-card-actions">
                <button
                  type="button"
                  class="small-action-button spark-choice-button"
                  data-spark-index="${index}"
                  aria-pressed="false"
                >
                  Choose This
                </button>
              </div>
            </article>
          `).join("")}
        </div>
      </fieldset>

      <div id="spark-choice-status" class="path-note" role="status">
        No starting move selected yet.
      </div>
    `;

    result.querySelectorAll(".spark-choice-button").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.sparkIndex);
        result.querySelectorAll(".spark-choice-button").forEach((other) => {
          other.setAttribute("aria-pressed", "false");
          other.textContent = "Choose This";
        });
        button.setAttribute("aria-pressed", "true");
        button.textContent = "Selected";
        document.getElementById("spark-choice-status").innerHTML =
          `<strong>Your starting move:</strong> ${escapeHtml(options[index].text)} <br>You only need to do this move now.`;
      });
    });
  });
}
function showStandaloneMakeSmaller() {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="hero" aria-labelledby="standalone-smaller-title">
      <p class="eyebrow">Make It Smaller</p>
      <h2 id="standalone-smaller-title">Turn one task into smaller moves.</h2>
      <label for="smaller-task"><strong>What needs to be done?</strong></label>
      <textarea id="smaller-task" rows="4" maxlength="500"></textarea>
      <div class="hero-actions">
        <button type="button" class="primary-button" id="split-task-button">Make Smaller Moves</button>
        ${toolkitBackButton()}
      </div>
      <div id="smaller-result" aria-live="polite"></div>
    </section>`;
  wireToolkitBack();
  document.getElementById("split-task-button").addEventListener("click", () => {
    const task=document.getElementById("smaller-task").value.trim();
    const result=document.getElementById("smaller-result");
    if(!task){result.innerHTML=`<p class="path-note">Write the task first.</p>`;return;}
    const moves=[
      "Get the material or tool you need.",
      "Identify one part you can work on now.",
      "Work only on that part.",
      "Check what changed and choose the next small part."
    ];
    result.innerHTML=`<div class="suggested-path">${moves.map((d,i)=>pathStep(i + 1, `Move ${i + 1}`, escapeHtml(d))).join("")}</div>`;
  });
}

function showStandaloneParkIt() {
  const main=document.querySelector("main");
  main.innerHTML=`
    <section class="hero" aria-labelledby="standalone-park-title">
      <p class="eyebrow">Park It</p>
      <h2 id="standalone-park-title">Save a thought so you do not need to hold it in mind.</h2>
      <label for="park-thought"><strong>Thought to save</strong></label>
      <textarea id="park-thought" rows="4" maxlength="500"></textarea>
      <div class="hero-actions">
        <button type="button" class="primary-button" id="save-park-thought">Save This Thought</button>
        ${toolkitBackButton()}
      </div>
      <div id="park-result" aria-live="polite"></div>
    </section>`;
  wireToolkitBack();
  document.getElementById("save-park-thought").addEventListener("click",()=>{
    const value=document.getElementById("park-thought").value.trim();
    const result=document.getElementById("park-result");
    if(!value){result.innerHTML=`<p class="path-note">Write the thought first.</p>`;return;}
    try {
      const key="compassTrailStandaloneParkedThoughts";
      const saved=JSON.parse(localStorage.getItem(key)||"[]");
      saved.push({id:crypto.randomUUID(),text:value,createdAt:new Date().toISOString()});
      localStorage.setItem(key,JSON.stringify(saved));
    } catch (_) {}
    document.getElementById("park-thought").value="";
    result.innerHTML=`<p class="path-note">Saved. You can return to the task without keeping this thought in mind.</p>`;
  });
}

let compassReadWithMeUtterance = null;

function stopReadWithMe() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  compassReadWithMeUtterance = null;
}

function showReadWithMe() {
  stopReadWithMe();
  const materialText = getJourneySourceText().trim();
  const main=document.querySelector("main");
  main.innerHTML=`
    <section class="hero" aria-labelledby="read-with-me-title">
      <p class="eyebrow">Read With Me</p>
      <h2 id="read-with-me-title">Listen to learning text at your pace.</h2>
      <p class="hero-text">Paste text below, or use confirmed text from your Material Basket.</p>
      <label for="read-with-me-text"><strong>Text to read</strong></label>
      <textarea id="read-with-me-text" rows="10" maxlength="12000">${escapeHtml(materialText)}</textarea>
      <label for="read-with-me-rate"><strong>Reading speed</strong></label>
      <select id="read-with-me-rate">
        <option value="0.7">0.7×</option>
        <option value="0.85">0.85×</option>
        <option value="1" selected>1×</option>
        <option value="1.2">1.2×</option>
        <option value="1.5">1.5×</option>
      </select>
      <div class="hero-actions">
        <button type="button" class="primary-button" id="read-start-button">Read Aloud</button>
        <button type="button" class="secondary-button" id="read-pause-button">Pause</button>
        <button type="button" class="secondary-button" id="read-resume-button">Resume</button>
        <button type="button" class="secondary-button" id="read-stop-button">Stop</button>
        ${toolkitBackButton()}
      </div>
      <div id="read-status" class="path-note" role="status">Not reading.</div>
    </section>`;
  wireToolkitBack();
  const status=document.getElementById("read-status");
  document.getElementById("read-start-button").addEventListener("click",()=>{
    const value=document.getElementById("read-with-me-text").value.trim();
    if(!value){status.textContent="Add text before choosing Read Aloud.";return;}
    if(!("speechSynthesis" in window)){status.textContent="Read aloud is not available in this browser.";return;}
    stopReadWithMe();
    const utterance=new SpeechSynthesisUtterance(value);
    utterance.rate=Number(document.getElementById("read-with-me-rate").value)||1;
    const lang=(document.documentElement.lang||navigator.language||"en").toLowerCase();
    utterance.lang=lang.startsWith("tr")?"tr-TR":"en-US";
    utterance.onend=()=>{status.textContent="Reading finished.";compassReadWithMeUtterance=null;};
    utterance.onerror=()=>{status.textContent="Reading stopped. You can start it again.";compassReadWithMeUtterance=null;};
    compassReadWithMeUtterance=utterance;
    window.speechSynthesis.speak(utterance);
    status.textContent="Reading aloud.";
  });
  document.getElementById("read-pause-button").addEventListener("click",()=>{if(window.speechSynthesis?.speaking){window.speechSynthesis.pause();status.textContent="Reading paused.";}});
  document.getElementById("read-resume-button").addEventListener("click",()=>{if(window.speechSynthesis?.paused){window.speechSynthesis.resume();status.textContent="Reading aloud.";}});
  document.getElementById("read-stop-button").addEventListener("click",()=>{stopReadWithMe();status.textContent="Reading stopped.";});
}

function showMemoryTools() {
  const main=document.querySelector("main");
  main.innerHTML=`
    <section class="hero" aria-labelledby="memory-tools-title">
      <p class="eyebrow">Memory Tools</p>
      <h2 id="memory-tools-title">Choose how to organise what you need to remember.</h2>
      <p class="hero-text">These tools organise your text. They do not decide what is important for you.</p>
      <div class="hero-actions">
        <button type="button" class="primary-button" id="open-chunking-button">Chunking</button>
        <button type="button" class="secondary-button" id="open-mnemonic-button">Mnemonic Builder</button>
        ${toolkitBackButton()}
      </div>
    </section>`;
  wireToolkitBack();
  document.getElementById("open-chunking-button").addEventListener("click",showChunkingTool);
  document.getElementById("open-mnemonic-button").addEventListener("click",showMnemonicTool);
}

function showChunkingTool() {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="hero" aria-labelledby="chunking-title">
      <p class="eyebrow">Memory Tools · Chunking</p>
      <h2 id="chunking-title">Split a list into smaller groups.</h2>
      <p class="hero-text">
        Add the items first. Then choose whether you want a specific number of groups
        or a specific number of items in each group.
      </p>

      <label for="chunking-text">
        <strong>Items to remember</strong>
      </label>
      <textarea
        id="chunking-text"
        rows="7"
        maxlength="5000"
        placeholder="apple, banana, orange, grape, lemon, peach"
      ></textarea>

      <fieldset class="journey-planning-fieldset">
        <legend><strong>How should Compass Trail split them?</strong></legend>

        <label>
          <input type="radio" name="chunk-mode" value="groups" checked>
          Number of groups
        </label>
        <select id="chunk-group-count" aria-label="Number of groups">
          <option value="2">2 groups</option>
          <option value="3" selected>3 groups</option>
          <option value="4">4 groups</option>
          <option value="5">5 groups</option>
          <option value="6">6 groups</option>
        </select>

        <label>
          <input type="radio" name="chunk-mode" value="size">
          Items in each group
        </label>
        <select id="chunk-size" aria-label="Items in each group">
          <option value="2">2 items</option>
          <option value="3" selected>3 items</option>
          <option value="4">4 items</option>
          <option value="5">5 items</option>
        </select>
      </fieldset>

      <div class="hero-actions">
        <button type="button" class="primary-button" id="make-chunks-button">
          Make Groups
        </button>
        <button type="button" class="secondary-button" id="memory-back-button">
          Back to Memory Tools
        </button>
      </div>

      <div id="chunking-result" aria-live="polite"></div>
    </section>
  `;

  document.getElementById("memory-back-button").addEventListener("click", showMemoryTools);

  document.getElementById("make-chunks-button").addEventListener("click", () => {
    const items = document.getElementById("chunking-text").value
      .split(/[\n,;]+/)
      .map((value) => value.trim())
      .filter(Boolean);

    const result = document.getElementById("chunking-result");

    if (items.length < 2) {
      result.innerHTML = `<p class="path-note">Add at least two items to make groups.</p>`;
      return;
    }

    const mode = document.querySelector('input[name="chunk-mode"]:checked')?.value || "groups";
    let chunks = [];

    if (mode === "groups") {
      const requested = Math.max(2, Number(document.getElementById("chunk-group-count").value) || 3);
      const groupCount = Math.min(requested, items.length);

      // Distribute in order as evenly as possible across the requested number of groups.
      let cursor = 0;
      for (let groupIndex = 0; groupIndex < groupCount; groupIndex += 1) {
        const remainingItems = items.length - cursor;
        const remainingGroups = groupCount - groupIndex;
        const take = Math.ceil(remainingItems / remainingGroups);
        chunks.push(items.slice(cursor, cursor + take));
        cursor += take;
      }
    } else {
      const size = Math.max(2, Number(document.getElementById("chunk-size").value) || 3);
      for (let i = 0; i < items.length; i += size) {
        chunks.push(items.slice(i, i + size));
      }
    }

    result.innerHTML = `
      <div class="material-heading">
        <h3>Your groups</h3>
        <p class="hero-text">
          There are ${chunks.length} groups. You can edit the text inside any group.
        </p>
      </div>

      <div class="material-list">
        ${chunks.map((group, index) => `
          <article class="material-card">
            <label for="chunk-group-${index}">
              <strong>Group ${index + 1}</strong>
            </label>
            <textarea
              id="chunk-group-${index}"
              class="chunk-edit-field"
              rows="3"
              data-chunk-index="${index}"
            >${escapeHtml(group.join("\n"))}</textarea>
          </article>
        `).join("")}
      </div>

      <p class="path-note">
        These groups are a suggestion. Editing a group does not change your original list.
      </p>
    `;
  });
}
function showMnemonicTool() {
  const main=document.querySelector("main");
  main.innerHTML=`
    <section class="hero" aria-labelledby="mnemonic-title">
      <p class="eyebrow">Memory Tools · Mnemonic Builder</p>
      <h2 id="mnemonic-title">Build a first-letter memory cue.</h2>
      <p class="hero-text">Enter the items in the order you need to remember them. Compass Trail will show the first-letter cue and a sentence frame you can edit yourself.</p>
      <label for="mnemonic-text"><strong>Items to remember</strong></label>
      <textarea id="mnemonic-text" rows="8" maxlength="5000" placeholder="Mercury, Venus, Earth, Mars"></textarea>
      <div class="hero-actions">
        <button type="button" class="primary-button" id="make-mnemonic-button">Build My Cue</button>
        <button type="button" class="secondary-button" id="mnemonic-back-button">Back to Memory Tools</button>
      </div>
      <div id="mnemonic-result" aria-live="polite"></div>
    </section>`;
  document.getElementById("mnemonic-back-button").addEventListener("click",showMemoryTools);
  document.getElementById("make-mnemonic-button").addEventListener("click",()=>{
    const items=document.getElementById("mnemonic-text").value.split(/[\n,;]+/).map(v=>v.trim()).filter(Boolean);
    const result=document.getElementById("mnemonic-result");
    if(items.length<2){result.innerHTML=`<p class="path-note">Add at least two items first.</p>`;return;}
    const initials=items.map(v=>Array.from(v.trim())[0]?.toUpperCase()||"").join("");
    result.innerHTML=`
      <div class="suggested-path">
        ${pathStep(1, "First-letter cue", escapeHtml(initials))}
        ${pathStep(2, "Sentence frame", escapeHtml(`Write a sentence with ${items.length} words. Start the words with: ${initials.split("").join(" · ")}.`))}
      </div>
      <p class="path-note">The sentence is yours to create. It can be ordinary, funny or very literal — use what is easiest to remember.</p>`;
  });
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
        ${
          compassRechargeReturnContext === "my-pace"
            ? `
              <button
                type="button"
                class="secondary-button"
                id="return-to-my-pace"
              >
                Return to My Pace
              </button>
            `
            : ""
        }

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


  document
    .getElementById("return-to-my-pace")
    ?.addEventListener("click", () => {
      compassRechargeReturnContext = "";

      if (
        compassFocusState
          .timerPausedRemaining > 0
      ) {
        showCompassTimer(
          "Break finished. Your timer is still paused."
        );
      } else {
        showCompassFocusSpace(
          "Break finished. Your progress is unchanged."
        );
      }
    });
}

const materialBasket = [];

let lastRemovedMaterial = null;
let lastRemovedIndex = null;
let materialBasketReturnContext = null;


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
          You can add, replace, review or remove materials later without changing your current Journey step.
        </p>

        ${
          materialBasketReturnContext?.journey
            ? `
              <div class="path-note" role="status">
                You are editing materials for your current Journey.
                Your current step is saved.
              </div>
            `
            : ""
        }
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
          ${
            materialBasketReturnContext?.journey
              ? "Return to Journey"
              : "Back"
          }
        </button>

        <button
          type="button"
          class="primary-button"
          id="build-path-button"
        >
          ${
            materialBasketReturnContext?.journey
              ? "Use Updated Materials"
              : "Build My Path"
          }
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
      () => {
        if (materialBasketReturnContext?.journey) {
          returnToJourneyFromMaterials(
            "Your Journey step is unchanged."
          );
          return;
        }

        showJourneyStartScreen();
      }
    );

  document
    .getElementById("build-path-button")
    .addEventListener(
      "click",
      () => {
        if (materialBasketReturnContext?.journey) {
          returnToJourneyFromMaterials(
            "Your materials were updated. Your Journey step is unchanged."
          );
          return;
        }

        showPathPreview();
      }
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
                    class="small-action-button replace-material-button"
                    data-material-id="${material.id}"
                  >
                    Replace
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
      ".replace-material-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          replaceMaterial(
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

function replaceMaterial(materialId) {
  const material =
    materialBasket.find(
      (item) =>
        item.id === materialId
    );

  if (!material) return;

  if (material.type === "text") {
    showReplaceTextMaterial(
      material
    );
    return;
  }

  const input =
    document.createElement(
      "input"
    );

  input.type = "file";

  if (material.type === "photo") {
    input.accept =
      "image/jpeg,image/png,image/webp";
  } else if (
    material.type === "pdf"
  ) {
    input.accept =
      "application/pdf";
  } else {
    input.accept =
      ".docx,.txt,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";
  }

  input.addEventListener(
    "change",
    () => {
      const file =
        input.files?.[0];

      if (!file) return;

      if (
        material.previewUrl &&
        material.type === "photo"
      ) {
        try {
          URL.revokeObjectURL(
            material.previewUrl
          );
        } catch (_) {}
      }

      material.name = file.name;
      material.size = file.size;
      material.file = file;
      material.text = "";
      material.extractedText = "";
      material.extractionStatus =
        "not-reviewed";
      material.photoResult = null;
      material.pdfOcrResult = null;
      material.previewUrl =
        material.type === "photo"
          ? URL.createObjectURL(file)
          : null;

      renderMaterialBasket();
    },
    { once: true }
  );

  input.click();
}

function showReplaceTextMaterial(
  material
) {
  const main =
    document.querySelector("main");

  main.innerHTML = `
    <section
      class="hero"
      aria-labelledby="replace-text-title"
    >
      <p class="eyebrow">
        Replace Material
      </p>

      <h2 id="replace-text-title">
        Replace this text material.
      </h2>

      <p class="hero-text">
        The old text stays unchanged until you choose Save Replacement.
      </p>

      <label for="replacement-text">
        <strong>Replacement text</strong>
      </label>

      <textarea
        id="replacement-text"
        rows="10"
        maxlength="12000"
      >${escapeHtml(
        material.text ||
        material.extractedText ||
        ""
      )}</textarea>

      <div class="hero-actions">
        <button
          type="button"
          class="primary-button"
          id="save-text-replacement"
        >
          Save Replacement
        </button>

        <button
          type="button"
          class="secondary-button"
          id="cancel-text-replacement"
        >
          Cancel
        </button>
      </div>
    </section>
  `;

  document
    .getElementById(
      "save-text-replacement"
    )
    .addEventListener(
      "click",
      () => {
        const value =
          document
            .getElementById(
              "replacement-text"
            )
            .value
            .trim();

        if (!value) {
          document
            .getElementById(
              "replacement-text"
            )
            .focus();

          return;
        }

        material.text = value;
        material.extractedText =
          value;
        material.extractionStatus =
          "not-reviewed";
        material.name =
          createTextMaterialName(
            value
          );

        showMaterialBasket();
      }
    );

  document
    .getElementById(
      "cancel-text-replacement"
    )
    .addEventListener(
      "click",
      () => showMaterialBasket()
    );
}

function openJourneyMaterials(
  journey,
  stepIndex
) {
  materialBasketReturnContext = {
    journey,
    stepIndex,
  };

  showMaterialBasket(
    "mixed"
  );
}

function returnToJourneyFromMaterials(
  notice = ""
) {
  const context =
    materialBasketReturnContext;

  materialBasketReturnContext =
    null;

  if (!context?.journey) {
    showJourneyStartScreen();
    return;
  }

  context.journey.sourceText =
    getJourneySourceText();

  rememberJourney(
    context.journey
  );

  showJourneyWorkspace(
    context.journey,
    context.stepIndex,
    notice
  );
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


// ------------------------------------------------------------
// Scanned PDF OCR V1
// ------------------------------------------------------------

async function readScannedPdfText(
  file,
  onProgress = () => {}
) {
  if (!file) {
    return {
      status: "error",
      text: "",
      pages: [],
    };
  }

  if (
    !window.pdfjsLib ||
    typeof window.pdfjsLib.getDocument !==
      "function"
  ) {
    throw new Error(
      "PDF reading is not available right now."
    );
  }

  if (
    !window.Tesseract ||
    typeof window.Tesseract.recognize !==
      "function"
  ) {
    throw new Error(
      "Visual text reading is not available right now."
    );
  }

  const bytes =
    new Uint8Array(
      await file.arrayBuffer()
    );

  const pdf =
    await window.pdfjsLib
      .getDocument({
        data: bytes,
      })
      .promise;

  const pageResults = [];
  const combinedText = [];

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber += 1
  ) {
    onProgress(
      `Reading scanned PDF page ${pageNumber} of ${pdf.numPages}…`
    );

    const page =
      await pdf.getPage(
        pageNumber
      );

    const viewport =
      page.getViewport({
        scale: 2,
      });

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width =
      Math.ceil(
        viewport.width
      );

    canvas.height =
      Math.ceil(
        viewport.height
      );

    const context =
      canvas.getContext(
        "2d",
        {
          alpha: false,
        }
      );

    if (!context) {
      throw new Error(
        "This PDF page could not be prepared for reading."
      );
    }

    context.fillStyle =
      "#ffffff";

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    await page
      .render({
        canvasContext:
          context,
        viewport,
      })
      .promise;

    const ocr =
      await window.Tesseract.recognize(
        canvas,
        "eng",
        {
          logger(message) {
            if (
              message.status ===
                "recognizing text" &&
              typeof message.progress ===
                "number"
            ) {
              const percent =
                Math.round(
                  message.progress *
                    100
                );

              onProgress(
                `Reading scanned PDF page ${pageNumber} of ${pdf.numPages}: ${percent}%`
              );
            }
          },
        }
      );

    const pageText =
      String(
        ocr?.data?.text || ""
      ).trim();

    pageResults.push({
      pageNumber,
      text: pageText,
      confidence:
        typeof ocr?.data
          ?.confidence ===
        "number"
          ? ocr.data.confidence
          : null,
    });

    if (pageText) {
      combinedText.push(
        pdf.numPages > 1
          ? `Page ${pageNumber}\n${pageText}`
          : pageText
      );
    }
  }

  const text =
    combinedText
      .join("\n\n")
      .trim();

  return {
    status:
      text.length > 0
        ? "ready"
        : "empty",
    text,
    pages:
      pageResults,
    source:
      "scanned-pdf-ocr",
  };
}

async function runScannedPdfOcr(
  material
) {
  const status =
    document.getElementById(
      "extraction-status"
    );

  const resultBox =
    document.getElementById(
      "extraction-result"
    );

  if (status) {
    status.textContent =
      "Preparing scanned PDF for visual text reading…";
  }

  if (resultBox) {
    resultBox.innerHTML = `
      <p class="hero-text">
        Compass Trail will read each PDF page as an image.
        You can check and edit the text before it is used.
      </p>
    `;
  }

  try {
    const result =
      await readScannedPdfText(
        material.file,
        (message) => {
          const liveStatus =
            document.getElementById(
              "extraction-status"
            );

          if (liveStatus) {
            liveStatus.textContent =
              message;
          }
        }
      );

    material.pdfOcrResult =
      result;

    showExtractionResult(
      material,
      result
    );
  } catch (error) {
    console.error(
      "Scanned PDF OCR failed:",
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
          Scanned PDF
        </p>

        <h2>
          This PDF does not contain selectable text.
        </h2>

        <p class="hero-text">
          Compass Trail can read each page visually.
          You will be able to check and edit the text
          before it is used.
        </p>

        <p
          id="extraction-status"
          role="status"
          class="hero-text"
        >
          Ready to read this scanned PDF.
        </p>

        <div id="extraction-result"></div>

        <div class="hero-actions">
          <button
            type="button"
            class="primary-button"
            id="read-scanned-pdf-button"
          >
            Read Scanned PDF
          </button>

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
        "read-scanned-pdf-button"
      )
      .addEventListener(
        "click",
        async (event) => {
          const button =
            event.currentTarget;

          button.disabled =
            true;

          button.textContent =
            "Reading PDF…";

          await runScannedPdfOcr(
            material
          );
        }
      );

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
        Plan This Journey
      </p>

      <h2 id="journey-details-title">
        What are you working on?
      </h2>

      <p class="hero-text">
        Give Compass Trail only the information
        that helps you make a useful plan.
      </p>

      <form
        id="journey-details-form"
        class="journey-form"
      >
        <label for="journey-title">
          <strong>Task or goal</strong>
          <span>
            For example: science presentation,
            maths homework or a chapter to read.
          </span>
        </label>

        <input
          type="text"
          id="journey-title"
          maxlength="100"
          placeholder="My science presentation"
          required
        />

        <fieldset class="journey-planning-fieldset">
          <legend>
            <strong>What kind of task is this?</strong>
          </legend>
          <p class="hero-text">
            Choose one if you know. If you are not sure,
            Compass Trail can use the title and your materials.
          </p>

          <select id="journey-task-type">
            <option value="auto">I'm not sure — help me choose</option>
            <option value="reading">Reading</option>
            <option value="writing">Writing / essay</option>
            <option value="questions">Questions / worksheet</option>
            <option value="study">Exam study / revision</option>
            <option value="research">Research</option>
            <option value="presentation">Presentation</option>
            <option value="maths">Maths practice</option>
            <option value="project">Project / creative task</option>
            <option value="general">Something else</option>
          </select>
        </fieldset>

        <label for="journey-current-state">
          <strong>Where are you now?</strong>
          <span>
            This changes where the suggested path starts.
          </span>
        </label>

        <select id="journey-current-state">
          <option value="not-started">I haven't started yet</option>
          <option value="started">I've started, but there is more to do</option>
          <option value="stuck">I'm stuck and need a different entry point</option>
          <option value="nearly-done">I'm nearly done</option>
        </select>

        <label for="journey-today-done">
          <strong>What does done look like today?</strong>
          <span>
            Optional. Make this concrete and small enough for today.
          </span>
        </label>

        <textarea
          id="journey-today-done"
          rows="3"
          maxlength="300"
          placeholder="For example: finish the first three slides."
        ></textarea>

        <label for="journey-goal">
          <strong>Overall goal</strong>
          <span>
            Optional. What needs to be true when this whole Journey is complete?
          </span>
        </label>

        <textarea
          id="journey-goal"
          rows="3"
          maxlength="400"
          placeholder="For example: have the presentation ready to give."
        ></textarea>

        <label for="journey-deadline">
          <strong>Deadline</strong>
          <span>
            Optional. If you add one, Compass Trail will spread
            the suggested steps across the available days.
          </span>
        </label>

        <input
          type="date"
          id="journey-deadline"
        />

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

  const deadlineInput =
    document.getElementById(
      "journey-deadline"
    );

  if (deadlineInput) {
    const today =
      new Date();

    const localToday =
      new Date(
        today.getTime() -
        today.getTimezoneOffset() *
          60000
      )
        .toISOString()
        .slice(0, 10);

    deadlineInput.min =
      localToday;
  }

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

        const valueOf =
          (id) =>
            document
              .getElementById(id)
              ?.value
              ?.trim() || "";

        const journey =
          buildJourneySuggestion(
            valueOf("journey-title"),
            valueOf("journey-goal"),
            {
              selectedTaskType:
                valueOf(
                  "journey-task-type"
                ),
              currentState:
                valueOf(
                  "journey-current-state"
                ),
              todayDone:
                valueOf(
                  "journey-today-done"
                ),
              deadline:
                valueOf(
                  "journey-deadline"
                ),
            }
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
  journeyGoal,
  planning = {}
) {
  const sourceText =
    getJourneySourceText();

  const analysisText = [
    journeyTitle,
    journeyGoal,
    planning.todayDone || "",
    sourceText,
  ]
    .join("\n")
    .toLowerCase();

  const detectedTaskType =
    detectJourneyTaskType(
      analysisText
    );

  const taskType =
    planning.selectedTaskType &&
    planning.selectedTaskType !==
      "auto"
      ? planning.selectedTaskType
      : detectedTaskType;

  let steps =
    createJourneySteps(
      taskType
    ).map(
      (step) => ({
        id: crypto.randomUUID(),
        title: step.title,
        description:
          step.description,
      })
    );

  steps =
    adaptJourneyStepsToCurrentState(
      steps,
      planning.currentState
    );

  const journey = {
    title: journeyTitle,
    goal: journeyGoal,
    taskType,
    taskTypeWasSuggested:
      !planning.selectedTaskType ||
      planning.selectedTaskType ===
        "auto",
    sourceText,
    currentState:
      planning.currentState ||
      "not-started",
    todayDone:
      planning.todayDone || "",
    deadline:
      planning.deadline || "",
    steps,
  };

  applyJourneySchedule(
    journey
  );

  return journey;
}

function adaptJourneyStepsToCurrentState(
  steps,
  currentState
) {
  if (
    currentState ===
      "nearly-done" &&
    steps.length > 2
  ) {
    return steps.slice(-2);
  }

  if (
    currentState ===
      "started" &&
    steps.length > 3
  ) {
    return steps.slice(1);
  }

  if (
    currentState ===
      "stuck"
  ) {
    return [
      {
        id: crypto.randomUUID(),
        title: "Choose a Smaller Entry Point",
        description:
          "Pick one concrete part you can work on without solving the whole task first.",
      },
      ...steps,
    ];
  }

  return steps;
}

function getLocalDateOnly(
  date = new Date()
) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

function parseLocalDate(
  value
) {
  if (!value) return null;

  const parts =
    value
      .split("-")
      .map(Number);

  if (
    parts.length !== 3 ||
    parts.some(
      (part) =>
        !Number.isFinite(part)
    )
  ) {
    return null;
  }

  return new Date(
    parts[0],
    parts[1] - 1,
    parts[2]
  );
}

function formatJourneyDate(
  date
) {
  return new Intl.DateTimeFormat(
    undefined,
    {
      month: "short",
      day: "numeric",
    }
  ).format(date);
}

function applyJourneySchedule(
  journey
) {
  journey.scheduleNote = "";
  journey.scheduleWarning = "";

  const deadline =
    parseLocalDate(
      journey.deadline
    );

  if (
    !deadline ||
    !journey.steps.length
  ) {
    return;
  }

  const today =
    getLocalDateOnly();

  const millisecondsPerDay =
    24 * 60 * 60 * 1000;

  const daysAvailable =
    Math.floor(
      (
        deadline.getTime() -
        today.getTime()
      ) /
        millisecondsPerDay
    ) + 1;

  if (daysAvailable <= 0) {
    journey.scheduleWarning =
      "The selected deadline has already passed. The path is unchanged.";

    return;
  }

  journey.steps.forEach(
    (step, index) => {
      const dayOffset =
        journey.steps.length === 1
          ? Math.max(
              0,
              daysAvailable - 1
            )
          : Math.round(
              index *
                Math.max(
                  0,
                  daysAvailable - 1
                ) /
                Math.max(
                  1,
                  journey.steps.length - 1
                )
            );

      const targetDate =
        new Date(today);

      targetDate.setDate(
        today.getDate() +
          dayOffset
      );

      step.suggestedDate =
        targetDate
          .toISOString()
          .slice(0, 10);

      step.suggestedDateLabel =
        formatJourneyDate(
          targetDate
        );
    }
  );

  if (
    daysAvailable <
    journey.steps.length
  ) {
    journey.scheduleWarning =
      `There are ${journey.steps.length} suggested steps and ${daysAvailable} available day${daysAvailable === 1 ? "" : "s"}. Some steps share a day. You can change the path or the dates.`;
  } else {
    journey.scheduleNote =
      `The ${journey.steps.length} suggested steps are spread across ${daysAvailable} available day${daysAvailable === 1 ? "" : "s"}. These dates are suggestions.`;
  }
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

        ${
          journey.todayDone
            ? `
              <p class="hero-text">
                <strong>Done for today:</strong>
                ${escapeHtml(
                  journey.todayDone
                )}
              </p>
            `
            : ""
        }

        ${
          journey.deadline
            ? `
              <p class="hero-text">
                <strong>Deadline:</strong>
                ${escapeHtml(
                  journey.deadline
                )}
              </p>
            `
            : ""
        }

        ${
          journey.scheduleWarning
            ? `
              <div
                class="path-note"
                role="status"
              >
                <strong>Plan check:</strong>
                ${escapeHtml(
                  journey.scheduleWarning
                )}
              </div>
            `
            : journey.scheduleNote
              ? `
                <p class="path-note">
                  ${escapeHtml(
                    journey.scheduleNote
                  )}
                </p>
              `
              : ""
        }

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

        ${
          step.suggestedDateLabel
            ? `
              <p class="path-note">
                Suggested date:
                <strong>
                  ${escapeHtml(
                    step.suggestedDateLabel
                  )}
                </strong>
              </p>
            `
            : ""
        }

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
          id="journey-materials-button"
        >
          View or Change Materials
        </button>

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
          "Step marked complete. Here is the next step."
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
      "journey-materials-button"
    )
    .addEventListener(
      "click",
      () => {
        openJourneyMaterials(
          journey,
          safeIndex
        );
      }
    );

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
        Sign in to continue your saved work on another device.
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

  cloudStatus(
    "Checking your session…"
  );

  try {
    const {
      data: { session },
      error: sessionError,
    } = await compassCloud.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!session?.access_token) {
      cloudStatus(
        "Please sign in again."
      );
      return;
    }

    compassCloudSession = session;

    cloudStatus(
      "Changing Secret Code…"
    );

    await callCompassFunction(
      "account-recovery",
      {
        action: "change_secret",
        newSecretCode,
      },
      session.access_token
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

    // Sync every locally saved Journey. Legacy activeJourney is included
    // automatically when an older local state is migrated.
    const localJourneys =
      Array.isArray(
        compassStudentState.journeys
      ) &&
      compassStudentState.journeys.length
        ? compassStudentState.journeys
        : (
            compassStudentState.activeJourney
              ? [
                  compassStudentState.activeJourney
                ]
              : []
          );

    for (
      const journey of localJourneys
    ) {
      ensureJourneyLocalId(
        journey
      );

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
        journey.cloudJourneyId ||
        (
          compassStudentState
            .activeJourney?.localId ===
          journey.localId
            ? compassStudentState
                .cloudJourneyId
            : null
        );

      if (journeyId) {
        const { error } =
          await compassCloud
            .from("journeys")
            .update(journeyPayload)
            .eq("id", journeyId)
            .eq("owner_id", ownerId);

        if (error) throw error;
      } else {
        const { data, error } =
          await compassCloud
            .from("journeys")
            .insert(journeyPayload)
            .select("id")
            .single();

        if (error) throw error;

        journeyId = data.id;
        journey.cloudJourneyId =
          journeyId;
      }

      if (
        compassStudentState
          .activeJourney?.localId ===
        journey.localId
      ) {
        compassStudentState
          .cloudJourneyId =
          journeyId;

        compassStudentState
          .activeJourney.cloudJourneyId =
          journeyId;
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

        if (error) throw error;
      }
    }

    saveStudentState();
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
        .order(
          "updated_at",
          { ascending: false }
        ),

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
      Array.isArray(
        journeyResult.data
      )
    ) {
      const restoredJourneys = [];

      for (
        const cloudJourney of
        journeyResult.data
      ) {
        const {
          data: steps,
          error,
        } =
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

        if (error) continue;

        restoredJourneys.push({
          localId:
            `cloud-${cloudJourney.id}`,
          cloudJourneyId:
            cloudJourney.id,
          title:
            cloudJourney.title,
          goal:
            cloudJourney.goal,
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
        });
      }

      if (
        restoredJourneys.length
      ) {
        compassStudentState.journeys =
          restoredJourneys;

        compassStudentState.activeJourney =
          JSON.parse(
            JSON.stringify(
              restoredJourneys[0]
            )
          );

        compassStudentState.cloudJourneyId =
          restoredJourneys[0]
            .cloudJourneyId;
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

  // A normal debounced save remains the main path.
  // beforeunload is not treated as a guaranteed network-save event.
  window.addEventListener(
    "online",
    () => scheduleCompassCloudSync(100)
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState === "hidden") {
        syncCompassCloudState();
      }
    }
  );
}

window.addEventListener(
  "load",
  bootCompassCloudV1
);
