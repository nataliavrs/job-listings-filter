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

    console.log(this._parent);

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

  deleteFilter(selectedFilter) {
    // Seleziono il contenitore dei filtri
    const parent = document.querySelector(".filter-bar__filters");
    // Creo un array con tutti i nodi dei titoli dei filtri
    const skillsArr = Array.from(
      parent.querySelectorAll(".skill .skill.title")
    );
    // Tolgo da questo array il filtro appena cancellato
    const filtered = skillsArr.filter(
      (skillTitle) => skillTitle.innerHTML !== selectedFilter
    );
    console.log(skillsArr);
    console.log(filtered);
    this.clear();
    filtered.forEach((f) => console.log(f.innerHTML));
    filtered.forEach((f) => parent.appendChild(f));
  }

  clearFilter() {
    const parent = document.querySelector(".filter-bar__filters");
    parent.innerHTML = "";
  }
}

export default new SkillView();
