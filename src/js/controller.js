export class Controller {
  constructor(model, jobView, skillView, filterBarView) {
    this.model = model;
    this.jobView = jobView;
    this.skillView = skillView;
    this.filterBarView = filterBarView;
  }

  async controlJobs() {
    await this.model.getJobs();
    const jobs = this.model.state.jobs;
    if (!jobs?.length) {
      alert("No jobs retrieved");
      return;
    }

    jobs.forEach((job) => {
      const jobHTML = this.jobView.render(job);
      const skillsHTML = job.skills.forEach((skill) =>
        this.skillView.generateMarkup(skill, false)
      );
      const newHTML = jobHTML;
      this.jobView.update(newHTML);
    });
  }

  async initApp() {
    await this.model.fetchData();
    this.controlJobs();
  }
}
