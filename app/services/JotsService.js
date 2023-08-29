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
        AppState.activeJot = activeJot

    }

    saveJot(updatedJot) {
        let savedJot = AppState.activeJot
        savedJot.reportBody = updatedJot.description
        savedJot.reportedDate = new Date()
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
        let filteredArray = AppState.jots.filter(j => j.id != jotData)
        AppState.jots = filteredArray
        saveState()
    }


}

export const jotsService = new JotsService()