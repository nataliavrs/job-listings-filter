export class View {
  render(data) {
    const markup = this.generateMarkup(data);
    console.log(this._parent);
    this._parent.insertAdjacentHTML("beforeEnd", markup);
  }
}
