export class Controller {
  constructor(model, jobView, skillView, filterBarView) {
    this.model = model;
    this.jobView = jobView;
    this.skillView = skillView;
    this.filterBarView = filterBarView;
  }

  controlJobs() {
    const jobs = this.model.state.jobs;
    if (!jobs.length) alert("No jobs in state");
    jobs.forEach((job) => {
      this.jobView.render(job);
    });
  }

  async initApp() {
    await this.model.getJobs();
    this.controlJobs();
  }
}
