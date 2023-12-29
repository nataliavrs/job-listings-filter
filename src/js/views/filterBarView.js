import { View } from "./View.js";
class FilterBar extends View {
  _parent = document.querySelector(".header");
  _data;

  generateMarkup(data) {
    this._data = data;
    return `
        <div class="filter-bar">
          <div class="filter-bar__filters">
          </div>
          <div class="filter-bar__clear-btn">Clear</div>
        </div>
    `;
  }

  renderFilters() {
    const filtersContainer = this._parent.querySelector(".filter-bar__filters");
    const filters = this._data
      .map((filter) => this.generateSkillMarkup(0, filter, true))
      .join("");
    filtersContainer.innerHTML = filters;
  }
}

export default new FilterBar();
