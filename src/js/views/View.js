export class View {
  render(data) {
    const markup = this.generateMarkup(data);
    this._parent.insertAdjacentHTML("beforeEnd", markup);
  }

  generateSkillMarkup(skill, hasRemoveButton) {
    return `
            <div class="skill">
                <div class="skill__title">${skill}</div>
                ${
                  hasRemoveButton
                    ? '<div class="skill__remove-btn">X</div>'
                    : ""
                }
            </div>
          `;
  }
}
