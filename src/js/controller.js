export class Controller {
  constructor(model, jobView, skillView, filterBarView) {
    this.model = model;
    this.jobView = jobView;
    this.skillView = skillView;
    this.filterBarView = filterBarView;
  }

  showJobs() {
    const jobs = this.model.state.jobs;
    if (!jobs.length) alert("No jobs in state");
    this.jobView.render(jobs);
  }

  filterJobs(skillTitle) {
    // Update jobs (in state)
    const filteredJobs = this.model.state.jobs.filter((job) =>
      job.skills.find((skill) => skill === skillTitle)
    );
    this.model.state.filteredJobs = filteredJobs;
    // Update job's view
    this.jobView.render(this.model.state.filteredJobs);
  }

  async initApp() {
    await this.model.getJobs();
    this.showJobs();
    this.jobView.addHandlerRender(this.filterJobs.bind(this));
  }
}
