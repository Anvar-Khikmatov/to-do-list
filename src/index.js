// import style from "./style.css"
import { dataBase, getStorage} from './logic.js';
import { createProjectElement } from "./dom.js"


document.addEventListener('DOMContentLoaded', () => {   
    const saved = getStorage('dataBase')
    Object.assign(dataBase, saved)
    Object.keys(dataBase).forEach(projectName => {
        createProjectElement(projectName)
    })
}) 