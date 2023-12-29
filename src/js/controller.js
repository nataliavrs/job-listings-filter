export class Controller {
  constructor(model, jobView, skillView, filterBarView) {
    this.model = model;
    this.jobView = jobView;
    this.skillView = skillView;
    this.filterBarView = filterBarView;
  }

  generateJobs(jobs) {
    this.jobView.render(jobs);
    this.jobView.addHandlerRender(this.filterJobs.bind(this));
  }

  filterJobs(skillFilter) {
    if (this.model.state.filters.includes(skillFilter)) return;

    const filteredJobs = this.model.state.jobs.filter((job) =>
      job.skills.find((skill) => skill === skillFilter)
    );
    this.model.state.filters.push(skillFilter);
    this.jobView.clear();
    this.generateJobs(filteredJobs);
  }

  async initApp() {
    await this.model.getJobs();
    this.generateJobs(this.model.state.jobs);
  }
}
