import model from "./model.js";
import { Controller } from "./controller.js";
import jobView from "./views/jobView.js";
import skillView from "./views/skillView.js";
import filterBarView from "./views/filterBarView.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Init app 😊");
  const controller = new Controller(model, jobView, skillView, filterBarView);
  await controller.initApp();
});
