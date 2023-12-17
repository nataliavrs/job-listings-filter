class Model {
  state = {
    data: [],
    jobs: [],
  };

  async fetchData() {
    try {
      const response = await fetch("http://localhost:3001/jobs");
      const data = await response.json();
      this.state.data = data;
    } catch (error) {
      console.log(error);
    }
  }

  async getJobs() {
    await this.fetchData();

    const jobs = this.state.data.map((job) => ({
      ...job,
      skills: [].concat(
        job.role,
        job.tools,
        job.languages,
        job.position,
        job.level
      ),
    }));

    this.state.jobs = jobs;
  }
}

export default new Model();
