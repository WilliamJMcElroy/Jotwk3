import { AppState } from "../AppState.js";
import { setHTML, setText } from "../utils/Writer.js";
import { jotsService } from "../services/JotsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { Jot } from "../models/Jot.js";

function _drawCount() {
    document.getElementById("jots-count").innerHTML = `${AppState.jots.length}`;
}
function _drawJotList() {
    const jots = AppState.jots
    let template = ''
    jots.forEach(jot => template += jot.JotTemplate)
    setHTML('jot-list', template)
    setText('jot-count', jots.length)
}

function _drawActiveJot() {
    let active = AppState.activeJot

    setHTML('active-jot', active.ActiveJotTemplate)
    return
}

export class JotsController {
    constructor() {

        console.log('Jots Controller');
        _drawJotList()
        AppState.on('jots', _drawJotList)
        AppState.on('activeJot', _drawActiveJot)
    }
    async removeJot(jotData) {
        if (await Pop.confirm('Are you sure?'))
            jotsService.removeJot(jotData)

    }

    setActiveJot(jotID) {
        jotsService.setActiveJot(jotID)
        console.log('now selecting', jotID)

    }

    createJot() {
        window.event.preventDefault()
        const formEvent = window.event.target
        const formData = getFormData(formEvent)
        console.log('this is jotData', formData)
        _drawCount
        jotsService.createJot(formData)
        // @ts-ignore
        formEvent.reset()
    }

    saveJots() {
        let textAreaElem = document.querySelector('textarea')
        let updatedJot = textAreaElem.value
        jotsService.saveJot(updatedJot)
    }

}