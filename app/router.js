import { AboutController } from "./controllers/AboutController.js";
import { HomeController } from "./controllers/HomeController.js";
import { JotsController } from "./controllers/JotsController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";



export const router = [
  {
    path: '',
    controller: JotsController,
    view: /*html*/`
    <div class="container-fluid">
      <div class="row m-none">
      <div class="col-4 bg-info text-white jot-list">
      <section id="jot-count"></section>
      <h5 class="mt-4"><span id="jot-list"><span></h5>
      </div>
      <div class="col-8" id="active-jot"></div>
      </div>
    </div>
    `
  }
]