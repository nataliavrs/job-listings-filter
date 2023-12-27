export class View {
  render(data) {
    const markup = this.generateMarkup(data);
    this._parent.insertAdjacentHTML("beforeEnd", markup);
  }

  generateSkillMarkup(id, skill, hasRemoveButton) {
    return `
            <div class="skill" data-id="${id}">
                <div class="skill__title">${skill}</div>
                ${
                  hasRemoveButton
                    ? '<div class="skill__remove-btn">X</div>'
                    : ""
                }
            </div>
          `;
  }

  update() {
    this._parent.innerHTML = "";
  }
}
