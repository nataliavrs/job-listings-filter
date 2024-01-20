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
    // Se filtro già esiste non ne aggiungo altro ripetuto e non rifaccio filtro
    if (this.model.state.filters.includes(skillFilter)) return;
    // Renderizzo la barra di filtri se non l'ho già fatto
    if (!this.model.state.filters.length) {
      this.filterBarView.showFilterBar();
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

    this.generateJobs(this.model.state.filteredJobs);
  }

  async clearFilter(selectedFilter) {
    try {
      // Tolgo il filtro cancellato dai filtri nello state
      this.model.state.filters = this.model.state.filters.filter(
        (f) => f !== selectedFilter
      );
      // Pulisco i filtri
      this.filterBarView.clearFilters();
      // Se non ci sono più filtri faccio vedere tutti i jobs e nascondo la barra dei filtri
      if (!this.model.state.filters.length) {
        this.filterBarView.hideFilterBar();
        await this.model.getJobs();
        // throw error;
        this.generateJobs(this.model.state.jobs);
        return;
      }
      // Tolgo il filtro cancellato dall'UI renderizzando quelli rimasti
      this.model.state.filters.map((f) =>
        this.skillView.generateActiveFilter(f, this.clearFilter.bind(this))
      );
      // Se ci sono filtri, filtro i jobs, voglio solo quelli in cui tutti i filtri siano presenti nelle sue skills
      const jobsWithFilters = this.model.state.jobs.filter((job) =>
        this.model.state.filters.every((f) => job.skills.includes(f))
      );

      this.generateJobs(jobsWithFilters);
      // Aggiorno lo state dei jobs filtrati
      this.model.state.filteredJobs = jobsWithFilters;
    } catch (error) {
      console.error("Error retrieving jobs while clearing filter:");
      this.jobView.renderError();
    }
  }

  async clearAll() {
    try {
      this.filterBarView.hideFilterBar();
      this.filterBarView.clearFilters();
      this.model.state.filters = [];
      await this.model.getJobs();
      this.generateJobs(this.model.state.jobs);
      // throw error;
    } catch (error) {
      console.error("Error retrieving jobs while deleting all filters:");
      this.jobView.renderError();
    }
  }

  async initApp() {
    try {
      await this.model.getJobs();
      this.generateJobs(this.model.state.jobs);
      this.filterBarView.render();
      this.filterBarView.addHandlerRender(this.clearAll.bind(this));
      // throw error;
    } catch (error) {
      console.error("Error retrieving jobs while initializing app:");
      this.jobView.renderError();
    }
  }
}
