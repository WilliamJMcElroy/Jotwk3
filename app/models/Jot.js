import { generateId } from "../utils/generateId.js"
import { AppState } from "../AppState.js"

export class Jot {


    constructor(data) {
        this.id = generateId()
        this.name = data.name
        this.createdDate = new Date().toLocaleDateString() || data.createdDate
        this.reportedDate = data.reportedDate ? new Date(data.reportedDate) : new Date()
        this.reportBody = data.reportBody || ". . . . . "
        this.color = data.color
    }
    get JotTemplate() {
        return `<p class="selectable" onclick="app.JotsController.setActiveJot('${this.id}')">${this.name}<i class="mdi mdi-note" style="color:${this.color};"></i>
        <p>Created on: ${this.createdDate}<p>
        <p>Updated at: ${this.reportedDate.toLocaleDateString()} ${this.reportedDate.toLocaleTimeString()}</p>
        </p>
    <button onclick="app.JotsController.removeJot('${this.id}')" class="btn btn-danger mdi mdi-delete"></button>`
    }

    get ActiveJotTemplate() {
        return `<form onsubmit="app.JotsController.saveJots()">
    <h2 class="text-white"><i class="mdi mdi-note" style="color:${this.color};"></i>${this.name}</h2>
    <h3 class="text-white">Last Updated:${this.reportedDate.toDateString()} ${this.reportedDate.toLocaleTimeString()}</h3>
    <textarea class="w-100" name="reportBodyContent" id="reportBodyContent" >${this.reportBody}</textarea>
    <button>Save Jot</button>
    </form>`

    }
}