class Model {
  state = {
    jobs: [],
  };

  async fetchData() {
    try {
      const response = await fetch("http://localhost:3001/jobs");
      const data = await response.json();
      this.state.jobs = data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Model();
