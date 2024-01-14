import { View } from "./View.js";
class FilterView extends View {
  _parent = document.querySelector(".header");
  _data;

  generateMarkup() {
    return `
        <div class="filter-bar">
          <div class="filter-bar__filters">
          </div>
          <div class="filter-bar__clear-btn">Clear</div>
        </div>
    `;
  }
}

export default new FilterView();
