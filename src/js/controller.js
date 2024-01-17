export class Controller {
  constructor(model, jobView, filterBarView, skillView) {
    this.model = model;
    this.jobView = jobView;
    this.filterBarView = filterBarView;
    this.skillView = skillView;
  }

  generateJobs(jobs) {
    jobs.forEach((job) => {
      this.jobView.render(job);
      this.skillView.generateJobFilters(job.skills, job.id);
    });
    this.jobView.addHandlerRender(this.filterJobs.bind(this));
  }

  filterJobs(skillFilter) {
    // Se filtro già esiste non ne aggiungo altro ripetuto e non rifaccio filtro
    if (this.model.state.filters.includes(skillFilter)) return;
    // Renderizzo la barra di filtri se non l'ho già fatto
    if (!this.model.state.filters.length) {
      this.filterBarView.render();
    }
    // Se c'è già un filtro attivo, faccio il filtro non su tutti i jobs ma sui jobs filtrati attualmente
    const jobs = this.model.state.filters.length
      ? this.model.state.filteredJobs
      : this.model.state.jobs;

    this.model.state.filteredJobs = jobs.filter((job) =>
      job.skills.some((skill) => skill === skillFilter)
    );

    // Renderizzo il nuovo filtro
    this.model.state.filters.push(skillFilter);
    this.skillView.generateActiveFilter(
      skillFilter,
      this.clearFilter.bind(this)
    );

    // REFACTOR Renderizzo i nuovi jobs, ma solo quelli fra i filtrati
    this.jobView.clear();
    this.generateJobs(this.model.state.filteredJobs);
  }

  clearFilter(selectedFilter) {
    this.model.state.filters = this.model.state.filters.filter(
      (f) => f !== selectedFilter
    );
    console.log(this.model.state.filters);
    const jobs = this.model.state.jobs.filter((job) =>
      job.skills.some((skill) =>
        // BUG non funziona perché deve includere tutti i filtri attivi e non soltanto uno dei filtri
        this.model.state.filters.includes(skill)
      )
    );

    const jobsToShow = jobs.length ? jobs : this.model.state.jobs;
    this.jobView.clear();
    this.generateJobs(jobsToShow);
    this.model.state.filteredJobs = jobsToShow;
  }

  async initApp() {
    await this.model.getJobs();
    this.generateJobs(this.model.state.jobs);
  }
}
