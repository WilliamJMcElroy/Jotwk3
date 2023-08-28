import { generateId } from "../utils/generateId.js"
import { AppState } from "../AppState.js"

export class Jot {

    constructor(data) {
        this.id = generateId()
        this.name = data.name
        this.createdDate = new Date() // TAKE OUT OF TERNARY, not changing created date, only reported 
        this.reportedDate = data.reportedDate ? new Date(data.reportedDate) : new Date()
        this.reportBody = data.reportBody || ". . . . . "
        this.color = data.color
    }
    get JotTemplate() {
        return `<p class="selectable" onclick="app.JotsController.setActiveJot('${this.id}')">${this.name}<i class="mdi mdi-note" style="color:${this.color};"></i>
        <p>Created on: ${this.createdDate.toLocaleDateString()}</p>
        <p>Updated on: ${this.reportedDate.toLocaleDateString()} ${this.reportedDate.toLocaleTimeString()}</p>
        </p>
    <button onclick="app.JotsController.removeJot('${this.id}')" class="btn btn-danger mdi mdi-delete"></button>`
    }

    get ActiveJotTemplate() {
        return `<form onsubmit="app.JotsController.setActiveJot('${this.id}')">
    <h2><i class="mdi mdi-note" style="color:${this.color};"></i>${this.name}</h2>
    <textarea class="w-100" name="reportBody" id="reportBody" >${this.reportBody}</textarea>
    <button>Save Jot</button>
    </form>`

    }
}