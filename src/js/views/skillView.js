import { View } from "./View.js";
class SkillView extends View {
  _data;

  generateActiveFilters(filters, handler) {
    const parent = document.querySelector(".filter-bar__filters");
    parent.innerHTML = filters
      .map((filter) => {
        return `
                <div class="skill">
                    <div class="skill__title">${filter}</div>
                    <div class="skill__remove-btn">X</div>                                   
                </div>
              `;
      })
      .join("");
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

  addHandlerRender(handler, skillFilter) {
    // TODO devo avere il valore del filtro su cui clicco
    const removeBtns = document.querySelectorAll(".skill__remove-btn");
    const removeBtnsArr = Array.from(removeBtns);
    removeBtnsArr.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        // if (Array.from(e.target.classList).includes("skill__title")) {
        //   const selectedSkill = e.target.closest(".skill").innerText;
        handler();
        // }
      })
    );
  }
}

export default new SkillView();
