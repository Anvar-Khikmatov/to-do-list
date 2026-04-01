export const dataBase = {}
let activeProject = null;
        

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






