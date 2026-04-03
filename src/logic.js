export const dataBase = {}
export let activeProject = null;
        

export function updateActiveProject(editedProjectName){
    activeProject = editedProjectName
}

export function getCurrentProject(currentProject){
    activeProject = currentProject;
}


export function storeProjectName(projectTitle){
    activeProject = projectTitle
    dataBase[activeProject] = []
}

export function storeTasks(tasks){
    dataBase[activeProject].push(tasks)
}

export function deleteProject(projectElement){
    delete dataBase[projectElement]
}


export function deleteTasks(taskIndex){
    dataBase[activeProject].splice(taskIndex, 1)
}

export function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : {}
}