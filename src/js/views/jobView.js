import { View } from "./View.js";

class JobView extends View {
  _parent = document.querySelector(".main__jobs");

  generateMarkup(job) {
    return `<div class="job">
    <div class="job__info">
      <div class="job__logo">
        <img src="${job?.logo}" alt="Company Logo" />
      </div>

      <div class="job__details">
        <div class="job__main-details">
          <div class="job__company">
            ${job?.company}
            <div class="job__company-tags">
              <div class="job__tag--new">${job?.new ? "NEW" : ""}</div>
              <div class="job__tag--featured">${
                job?.featured ? "FEATURED" : ""
              }</div>
          </div>
          </div>
        </div>

        <div class="job__position">${job?.position}</div>

        <div class="job__secondary-details">
          <span class="details__postedAt">${job?.postedAt}</span>
          <span class="details__contract">${job?.contract}</span>
          <span class="details__location">${job?.location}</span>
        </div>
      </div>
    </div>

    <div class="job__skills" data-id=${job?.id}></div>
    
  </div>`;
  }

  addHandlerRender(handler) {
    const jobSkillsContainers = document.querySelectorAll(".job__skills");
    const jobSkillsContainersArray = Array.from(jobSkillsContainers);

    jobSkillsContainersArray.forEach((container) =>
      container.addEventListener("click", (e) => {
        if (Array.from(e.target.classList).includes("skill__title")) {
          const selectedSkill = e.target.closest(".skill").innerText;
          handler(selectedSkill);
        }
      })
    );
  }

  hideSpinner() {
    this._parent.classList.remove("loading");
  }
}

export default new JobView();
