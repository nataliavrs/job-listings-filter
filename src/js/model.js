import { END_POINTS } from "./settings.js";

class Model {
  state = {
    jobs: [],
  };

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
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
      alert("Error retrieving jobs", error);
    }
  }
}

export default new Model();
