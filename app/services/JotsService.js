import { AppState } from "../AppState.js"
import { Jot } from "../models/Jot.js"
import { saveState } from "../utils/Store.js"
import { generateId } from "../utils/generateId.js"
import { JotsController } from "../controllers/JotsController.js"
import { setHTML } from "../utils/Writer.js"


function _saveState() {
    saveState('jots', AppState.jots)
}


class JotsService {
    setActiveJot(jotID) {

        let selectedJot = AppState.jots.find(j => j.id == jotID)
        let activeJot = selectedJot
    }

    saveJot() {
        let text = document.querySelector('textarea')
        let updatedJot = text.value
        let currentJot = AppState.activeJot
        currentJot.reportBody = text
        this.reportedDate = new Date()
        this.id = generateId()
        const index = AppState.jots.findIndex(j => j.id == this.id)
        console.log(index);
        AppState.jots.splice(index, 1, currentJot)
        AppState.emit('jots')

        // debugger
        console.log(AppState.jots, AppState.activeJot)
        _saveState()
    }
    createJot(formData) {
        let newJot = new Jot(formData)
        AppState.jots.push(newJot)
        console.log(newJot)
        AppState.emit('jots')
        console.log(AppState.jots)
        let activeJot = newJot
        _saveState()
    }

    removeJot(jotData) {
        console.log("working???", jotData);
        let filteredArray = AppState.jots.filter(j => j.id != jotData)
        AppState.jots = filteredArray
        console.log('New array in AppState:', AppState.jots);
        saveState('jots', AppState.jots)
    }


}

export const jotsService = new JotsService()