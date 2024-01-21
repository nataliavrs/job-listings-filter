import { View } from "./View.js";

class SkillView extends View {
  _data;

  generateActiveFilter(filter, handler) {
    const parent = document.querySelector(".filter-bar__filters");
    const skillNode = document.createElement("div");
    skillNode.className = "skill";
    skillNode.innerHTML = `
      <div class="skill__title">${filter}</div>
      <div class="skill__remove-btn">X</div>                                   
    `;
    skillNode.addEventListener("click", (e) => {
      if (e.target.classList.contains("skill__remove-btn")) {
        handler(
          e.target.parentElement.querySelector(".skill__title").innerText
        );
      }
    });
    parent.appendChild(skillNode);
  }

  generateJobFilters(skills, jobId) {
    const parent = document.querySelector(`.job__skills[data-id="${jobId}"]`);
    parent.innerHTML = skills
      .map((skill) => {
        return `
          <div class="skill">
              <div class="skill__title">${skill}</div>
          </div>
        `;
      })
      .join("");
  }
}

export default new SkillView();
