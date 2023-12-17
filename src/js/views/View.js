export class View {
  render(data) {
    const markup = this.generateMarkup(data);
    this._parent.insertAdjacentHTML("beforeEnd", markup);
  }

  update(data) {}
}
