class SkillView {
  generateMarkup(title, hasRemoveButton) {
    return `
            <div class="skill">
                <div class="skill__title">${title}</div>
               ${hasRemoveButton ? '<div class="skill__remove-btn"></div>' : ""}
            </div>
        `;
  }
}

export default new SkillView();
