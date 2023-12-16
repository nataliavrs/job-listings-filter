class FilterBar {
  _parent = document.querySelector(".header");

  generateMarkup() {
    return `
        <div class="filter-bar">
        <div class="filter-bar__skills">
        </div>
            <div class="filter-bar__clear-btn">Clear</div>
        </div>
        `;
  }
}

export default new FilterBar();
