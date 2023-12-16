export class Controller {
  constructor(model, jobView, skillView, filterBarView) {
    this.model = model;
    this.jobView = jobView;
    this.skillView = skillView;
    this.filterBarView = filterBarView;
  }

  controlJobs() {
    const jobs = this.model.state.jobs;
    jobs.forEach((job) => {
      this.jobView.render(job);
    });
    console.log(jobs);
  }

  async initApp() {
    await this.model.fetchData();
    this.controlJobs();
  }
}
