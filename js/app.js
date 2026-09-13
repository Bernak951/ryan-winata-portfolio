/* ==========================================================
   APP
   ----------------------------------------------------------
   Purpose:
   Data-driven rendering for the portfolio.

   Currently handles:
   - Experience section (data/experience.json)

   Architecture:
   data/experience.json -> app.js -> index.html -> experience.css

   Notes:
   - Vanilla JavaScript only (no framework / no dependency).
   - Fails gracefully so the rest of the page keeps working
     even if the JSON cannot be loaded (e.g. opened via file://).
   ========================================================== */

(function () {
  "use strict";

  const EXPERIENCE_DATA_URL = "data/experience.json";
  const EXPERIENCE_MOUNT_ID = "experience-list";

  /* ==========================================================
     UTIL: create a small DOM element with optional class/text
  ========================================================== */
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

  /* ==========================================================
     RENDER: a single experience entry as a semantic <article>
  ========================================================== */
  function renderExperienceCard(entry) {
    const card = createElement("article", "experience-card");

    // Header: role + company + period
    const header = createElement("div", "experience-card-header");

    const role = createElement("h3", "experience-role", entry.role || "");
    header.appendChild(role);

    const meta = createElement("p", "experience-meta");

    if (entry.company) {
      meta.appendChild(createElement("span", "experience-company", entry.company));
    }
    if (entry.period) {
      meta.appendChild(createElement("span", "experience-period", entry.period));
    }
    if (entry.location) {
      meta.appendChild(createElement("span", "experience-location", entry.location));
    }
    header.appendChild(meta);
    card.appendChild(header);

    // Summary
    if (entry.summary) {
      card.appendChild(createElement("p", "experience-summary", entry.summary));
    }

    // Highlights (defensive: only render if a non-empty array)
    if (Array.isArray(entry.highlights) && entry.highlights.length > 0) {
      const list = createElement("ul", "experience-highlights");
      entry.highlights.forEach(function (item) {
        if (item) {
          list.appendChild(createElement("li", null, item));
        }
      });
      card.appendChild(list);
    }

    // Skills / tags
    if (Array.isArray(entry.skills) && entry.skills.length > 0) {
      const tags = createElement("ul", "experience-skills");
      entry.skills.forEach(function (skill) {
        if (skill) {
          tags.appendChild(createElement("li", "experience-skill", skill));
        }
      });
      card.appendChild(tags);
    }

    return card;
  }

  /* ==========================================================
     RENDER: full experience list into the mount point
  ========================================================== */
  function renderExperience(entries, mount) {
    mount.innerHTML = "";

    if (!Array.isArray(entries) || entries.length === 0) {
      mount.appendChild(
        createElement("p", "experience-empty", "Experience details are currently unavailable.")
      );
      return;
    }

    const fragment = document.createDocumentFragment();
    entries.forEach(function (entry) {
      if (entry && typeof entry === "object") {
        fragment.appendChild(renderExperienceCard(entry));
      }
    });
    mount.appendChild(fragment);
  }

  /* ==========================================================
     GRACEFUL ERROR STATE
  ========================================================== */
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

  /* ==========================================================
     LOAD: fetch + safe parse
  ========================================================== */
  function loadExperience() {
    const mount = document.getElementById(EXPERIENCE_MOUNT_ID);

    // Defensive: nothing to do if the section is not on the page.
    if (!mount) {
      return;
    }

    fetch(EXPERIENCE_DATA_URL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to load experience data: " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        renderExperience(data, mount);
      })
      .catch(function (error) {
        // Handles network errors, HTTP errors, invalid JSON, and file:// blocks.
        console.warn("Experience section: " + error.message);
        renderExperienceError(mount);
      });
  }

  /* ==========================================================
     INIT
  ========================================================== */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadExperience);
  } else {
    loadExperience();
  }
})();
