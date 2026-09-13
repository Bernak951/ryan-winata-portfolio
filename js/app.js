// ==========================================================
// RESUME DROPDOWN
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

      const dropdown = document.querySelector(".resume-dropdown");
      const toggle = document.querySelector(".resume-dropdown-toggle");

      if (!dropdown || !toggle) return;

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

});
