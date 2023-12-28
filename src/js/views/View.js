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

  /*
  update(data) {
    const newMarkup = this.generateMarkup(data);
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parent.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      Updates changed TEXT
      if (!newEl.isEqualNode(curEl)) {
        curEl.textContent = newEl.textContent;
      }

      Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  */
}
