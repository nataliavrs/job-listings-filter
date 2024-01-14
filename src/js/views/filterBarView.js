import { View } from "./View.js";
class FilterBar extends View {
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

  renderFilters(filters) {
    const filtersContainer = this._parent.querySelector(".filter-bar__filters");
    filtersContainer.innerHTML = filters
      .map((filter) => this.generateSkillMarkup(0, filter, true))
      .join("");
  }
}

export default new FilterBar();
