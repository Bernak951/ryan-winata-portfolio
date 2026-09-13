// ==========================================================
// RESUME DROPDOWN
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

      const dropdown = document.querySelector(".resume-dropdown");
      const toggle = document.querySelector(".resume-dropdown-toggle");

      if (dropdown && toggle) {

            toggle.addEventListener("click", (e) => {

                  e.stopPropagation();

                  const isOpen = dropdown.classList.toggle("open");
                  toggle.setAttribute("aria-expanded", isOpen);

            });

            document.addEventListener("click", (e) => {

                  if (!dropdown.contains(e.target)) {

                        dropdown.classList.remove("open");
                        toggle.setAttribute("aria-expanded", "false");

                  }

            });

            document.addEventListener("keydown", (e) => {

                  if (e.key === "Escape") {

                        dropdown.classList.remove("open");
                        toggle.setAttribute("aria-expanded", "false");

                  }

            });

      }

});


// ==========================================================
// EXPERIENCE
// ----------------------------------------------------------
// Data-driven rendering for the portfolio.
//
// Architecture:
// data/experience.json -> app.js -> index.html -> experience.css
//
// Notes:
// - Vanilla JavaScript only.
// - Fails gracefully if the JSON cannot be loaded.
// ==========================================================

(function () {

      "use strict";

      const EXPERIENCE_DATA_URL = "data/experience.json";
      const EXPERIENCE_MOUNT_ID = "experience-list";


      // ==========================================================
      // UTIL: create a small DOM element
      // ==========================================================

      function createElement(tag, className, text) {

            const el = document.createElement(tag);

            if (className) {
                  el.className = className;
            }

            if (text !== undefined && text !== null) {
                  el.textContent = String(text);
            }

            return el;
      }


      // ==========================================================
      // RENDER: single experience entry
      // ==========================================================

      function renderExperienceCard(entry) {

            const card = createElement("article", "experience-card");

            // Header: role + company + period
            const header = createElement("div", "experience-card-header");

            const role = createElement(
                  "h3",
                  "experience-role",
                  entry.role || ""
            );

            header.appendChild(role);

            const meta = createElement("p", "experience-meta");

            if (entry.company) {
                  meta.appendChild(
                        createElement(
                              "span",
                              "experience-company",
                              entry.company
                        )
                  );
            }

            if (entry.period) {
                  meta.appendChild(
                        createElement(
                              "span",
                              "experience-period",
                              entry.period
                        )
                  );
            }

            if (entry.location) {
                  meta.appendChild(
                        createElement(
                              "span",
                              "experience-location",
                              entry.location
                        )
                  );
            }

            header.appendChild(meta);
            card.appendChild(header);


            // Summary
            if (entry.summary) {
                  card.appendChild(
                        createElement(
                              "p",
                              "experience-summary",
                              entry.summary
                        )
                  );
            }


            // Highlights
            if (
                  Array.isArray(entry.highlights) &&
                  entry.highlights.length > 0
            ) {

                  const list = createElement(
                        "ul",
                        "experience-highlights"
                  );

                  entry.highlights.forEach(function (item) {

                        if (item) {
                              list.appendChild(
                                    createElement("li", null, item)
                              );
                        }

                  });

                  card.appendChild(list);
            }


            // Skills / tags
            if (
                  Array.isArray(entry.skills) &&
                  entry.skills.length > 0
            ) {

                  const tags = createElement(
                        "ul",
                        "experience-skills"
                  );

                  entry.skills.forEach(function (skill) {

                        if (skill) {
                              tags.appendChild(
                                    createElement(
                                          "li",
                                          "experience-skill",
                                          skill
                                    )
                              );
                        }

                  });

                  card.appendChild(tags);
            }

            return card;
      }


      // ==========================================================
      // RENDER: full experience list
      // ==========================================================

      function renderExperience(entries, mount) {

            mount.innerHTML = "";

            if (!Array.isArray(entries) || entries.length === 0) {

                  mount.appendChild(
                        createElement(
                              "p",
                              "experience-empty",
                              "Experience details are currently unavailable."
                        )
                  );

                  return;
            }

            const fragment = document.createDocumentFragment();

            entries.forEach(function (entry) {

                  if (entry && typeof entry === "object") {
                        fragment.appendChild(
                              renderExperienceCard(entry)
                        );
                  }

            });

            mount.appendChild(fragment);
      }


      // ==========================================================
      // ERROR STATE
      // ==========================================================

      function renderExperienceError(mount) {

            if (!mount) {
                  return;
            }

            mount.innerHTML = "";

            mount.appendChild(
                  createElement(
                        "p",
                        "experience-error",
                        "Experience details could not be loaded right now."
                  )
            );
      }


      // ==========================================================
      // LOAD: fetch experience data
      // ==========================================================

      function loadExperience() {

            const mount = document.getElementById(
                  EXPERIENCE_MOUNT_ID
            );

            if (!mount) {
                  return;
            }

            fetch(EXPERIENCE_DATA_URL)

                  .then(function (response) {

                        if (!response.ok) {

                              throw new Error(
                                    "Failed to load experience data: " +
                                    response.status
                              );
                        }

                        return response.json();
                  })

                  .then(function (data) {

                        renderExperience(data, mount);

                  })

                  .catch(function (error) {

                        console.warn(
                              "Experience section: " +
                              error.message
                        );

                        renderExperienceError(mount);

                  });
      }


      // ==========================================================
      // INIT
      // ==========================================================

      if (document.readyState === "loading") {

            document.addEventListener(
                  "DOMContentLoaded",
                  loadExperience
            );

      } else {

            loadExperience();

      }

})();