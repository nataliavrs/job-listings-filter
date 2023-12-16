import data from "./data.json";

class Model {
  state = {
    jobs: [],
  };

  async fetchData() {
    try {
      const response = await fetch(data);

      const data = await response.json();
      this.state.jobs = data.data;
      console.log(data);
      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Model();
