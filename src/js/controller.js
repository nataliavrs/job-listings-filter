export class Controller {
  constructor(model, jobView, filterBarView, skillView) {
    this.model = model;
    this.jobView = jobView;
    this.filterBarView = filterBarView;
    this.skillView = skillView;
  }

  generateJobs(jobs) {
    this.jobView.clear();
    jobs.forEach((job) => {
      this.jobView.render(job);
      this.skillView.generateJobFilters(job.skills, job.id);
    });
    this.jobView.addHandlerRender(this.filterJobs.bind(this));
  }

  filterJobs(skillFilter) {
    if (this.model.state.filters.includes(skillFilter)) return;
    if (!this.model.state.filters.length) {
      this.filterBarView.showFilterBar();
    }
    const jobs = this.model.state.filters.length
      ? this.model.state.filteredJobs
      : this.model.state.jobs;
    this.model.state.filteredJobs = jobs.filter((job) =>
      job.skills.some((skill) => skill === skillFilter)
    );
    this.model.state.filters.push(skillFilter);
    this.skillView.generateActiveFilter(
      skillFilter,
      this.clearFilter.bind(this)
    );
    this.generateJobs(this.model.state.filteredJobs);
    this.jobView.hideLoading();
  }

  async clearFilter(selectedFilter) {
    try {
      this.model.state.filters = this.model.state.filters.filter(
        (f) => f !== selectedFilter
      );
      this.filterBarView.clearFilters();
      if (!this.model.state.filters.length) {
        this.filterBarView.hideFilterBar();
        await this.getNewJobsAndRender();
        return;
      }
      this.model.state.filters.map((f) =>
        this.skillView.generateActiveFilter(f, this.clearFilter.bind(this))
      );
      const jobsWithFilters = this.model.state.jobs.filter((job) =>
        this.model.state.filters.every((f) => job.skills.includes(f))
      );
      this.generateJobs(jobsWithFilters);
      this.model.state.filteredJobs = jobsWithFilters;
    } catch (error) {
      console.error("Error retrieving jobs while clearing filter:", error);
      this.jobView.renderError();
    }
  }

  async getNewJobsAndRender() {
    try {
      this.jobView.renderSpinner();
      await this.model.getJobs();
      this.jobView.hideLoading();
      this.generateJobs(this.model.state.jobs);
    } catch (error) {
      throw error;
    }
  }

  async clearAllFilters() {
    try {
      this.filterBarView.hideFilterBar();
      this.filterBarView.clearFilters();
      this.model.state.filters = [];
      await this.getNewJobsAndRender();
    } catch (error) {
      console.error("Error retrieving jobs while deleting all filters:", error);
      this.jobView.renderError();
    }
  }

  async initApp() {
    try {
      await this.getNewJobsAndRender();
      this.filterBarView.render();
      this.filterBarView.addHandlerRender(this.clearAllFilters.bind(this));
    } catch (error) {
      console.error("Error retrieving jobs while initializing app:", error);
      this.jobView.renderError();
    }
  }
}
