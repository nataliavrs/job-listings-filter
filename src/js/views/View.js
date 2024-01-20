export class View {
  render(data) {
    const markup = this.generateMarkup(data);
    this._parent.insertAdjacentHTML("beforeEnd", markup);
  }

  renderError() {
    this._parent.innerHTML = "";
    document.querySelector(".main__error").classList.remove("hide");
  }

  clear() {
    this._parent.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <h4 class="loader__message">Loading new jobs...</h4>
      <span class="loader"></span>
    `;
    this.clear();
    this._parent.classList.add("loading");
    this._parent.insertAdjacentHTML("beforeEnd", markup);
  }
}
