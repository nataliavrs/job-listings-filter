import { END_POINTS } from "./settings.js";

class Model {
  state = {
    jobs: [],
    filteredJobs: [],
    filters: [],
  };

  async fetchData(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`${res.statusText} ${res.status}`);
    }

    const data = await res.json();
    return data;
  }

  async getJobs() {
    try {
      const jobs = await this.fetchData(END_POINTS.jobs);
      const mappedJobs = jobs.map((job) => ({
        ...job,
        skills: [].concat(job.role, job.tools, job.languages, job.level),
      }));
      this.state.jobs = mappedJobs;
    } catch (error) {
      throw error;
    }
  }
}

export default new Model();
