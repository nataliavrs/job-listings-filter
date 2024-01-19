import { View } from "./View.js";
class FilterView extends View {
  _parent = document.querySelector(".header");
  _data;

  generateMarkup() {
    return `
        <div class="filter-bar hide">
          <div class="filter-bar__filters">
          </div>
          <div class="filter-bar__clear-btn">Clear</div>
        </div>
    `;
  }

  clearFilters() {
    const filtersParent = document.querySelector(".filter-bar__filters");
    filtersParent.innerHTML = "";
  }

  hideFilterBar() {
    const filterBar = document.querySelector(".filter-bar");
    filterBar.classList.add("hide");
  }

  showFilterBar() {
    const filterBar = document.querySelector(".filter-bar");
    filterBar.classList.remove("hide");
  }
}

export default new FilterView();
