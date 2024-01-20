export class View {
  render(data) {
    const markup = this.generateMarkup(data);
    this._parent.insertAdjacentHTML("beforeEnd", markup);
  }

  renderError() {
    this._parent.innerHTML = "";
    // document.querySelector(".main__jobs").innerHTML = "";
    document.querySelector(".main__error").classList.remove("hide");
  }

  clear() {
    this._parent.innerHTML = "";
  }
}
