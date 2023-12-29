export class Controller {
  constructor(model, jobView, filterBarView) {
    this.model = model;
    this.jobView = jobView;
    this.filterBarView = filterBarView;
  }

  generateJobs(jobs) {
    this.jobView.render(jobs);
    this.jobView.addHandlerRender(this.filterJobs.bind(this));
  }

  filterJobs(skillFilter) {
    if (this.model.state.filters.includes(skillFilter)) return;
    if (!this.model.state.filters.length) {
      this.filterBarView.render(this.model.state.filters);
    }

    const filteredJobs = this.model.state.jobs.filter((job) =>
      job.skills.find((skill) => skill === skillFilter)
    );
    this.model.state.filters.push(skillFilter);
    this.filterBarView.renderFilters();
    this.jobView.clear();
    this.generateJobs(filteredJobs);
  }

  async initApp() {
    await this.model.getJobs();
    this.generateJobs(this.model.state.jobs);
  }
}
