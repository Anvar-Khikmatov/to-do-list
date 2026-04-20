import './style.css';
import { state, getCurrentProject, dataBase, getStorage, setStorage } from './logic.js';
import { createProjectElement, displayCurrentProject, displayTasksNumber, displayCurrentTask } from "./dom.js"

document.addEventListener('DOMContentLoaded', () => {   
    const saved = getStorage('dataBase');
    
    if (saved && Object.keys(saved).length > 0) {
        for (let key in dataBase) delete dataBase[key];
        Object.assign(dataBase, saved);
    } else {
        setStorage('dataBase', dataBase);
    }
    
    const projectNames = Object.keys(dataBase);
    if (projectNames.length === 0) return;

    projectNames.forEach(name => createProjectElement(name));
    
    const initialProject = projectNames[0];
    getCurrentProject(initialProject); 
    displayCurrentProject(initialProject);
    displayTasksNumber(initialProject);
    displayCurrentTask();
});