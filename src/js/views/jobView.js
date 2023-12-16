class JobView {
  _parent = document.querySelector("main");

  generateMarkup() {
    return `
        <div class="job">
        <div class="job__info">
          <div class="job__logo">
            <img src="src/images/loop-studios.svg" alt="Company Logo" />
          </div>
          <div class="job__company"></div>
          <div class="job__position"></div>
          <div class="job__tags">
            <div class="job__tag--new"></div>
            <div class="job__tag--featured"></div>
          </div>
          <div class="job__details">
            <span class="details__postedAt"></span>
            <span class="details__contract"></span>
            <span class="details__location"></span>
          </div>
        </div>
        <div class="job__skills">
        </div>
      </div>
        `;
  }
}

export default new JobView();
