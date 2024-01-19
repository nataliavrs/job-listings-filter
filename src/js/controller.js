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
    // Tolgo il filtro cancellato dai filtri nello state
    this.model.state.filters = this.model.state.filters.filter(
      (f) => f !== selectedFilter
    );
    // Se non ci sono più filtri faccio vedere tutti i jobs
    if (!this.model.state.filters.length) {
      this.jobView.clear();
      this.generateJobs(this.model.state.jobs);
      return;
    }
    // Se ci sono filtri, filtro i jobs, voglio solo quelli in cui tutti i filtri siano presenti nelle sue skills
    const jobsWithFilters = this.model.state.jobs.filter((job) =>
      this.model.state.filters.every((f) => job.skills.includes(f))
    );

    this.jobView.clear();
    this.generateJobs(jobsWithFilters);
    // Aggiorno lo state dei jobs filtrati
    this.model.state.filteredJobs = jobsWithFilters;
  }

  async initApp() {
    await this.model.getJobs();
    this.generateJobs(this.model.state.jobs);
  }
}
