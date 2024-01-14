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
    // Renderizzo i filtri
    this.model.state.filters.push(skillFilter);
    this.filterBarView.renderFilters(this.model.state.filters);
    // Renderizzo i jobs filtrati
    this.jobView.clear();
    this.generateJobs(this.model.state.filteredJobs);
  }

  async initApp() {
    await this.model.getJobs();
    this.generateJobs(this.model.state.jobs);
  }
}
