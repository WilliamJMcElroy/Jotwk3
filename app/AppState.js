import { Jot } from "./models/Jot.js"
import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/isValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])


  /** @type {import('./models/Jot.js').Jot[]} */
  jots = loadState('jots', [Jot])





  // jots = [
  //   // new Jot({
  //   //   name: "First Jot",
  //   //   description: "Jotting, words words words",
  //   // }),
  //   // new Jot({
  //   //   name: "Second Jot",
  //   //   description: "Lorem Ipsum and whatnot",
  //   // }),
  //   // new Jot({
  //   //   name: "Third Jot",
  //   //   description: "You know words aren't really my forte"
  //   // }),
  // ]
  /** @type {import('./models/Jot.js').Jot | null} */
  activeJot = null

  init() {

  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})