export { dataBase, activeProject, getCurrentProject, storeProjectName, storeTasks, editProject, deleteProject, deleteTasks, setStorage, getStorage } 

const dataBase = {}
let activeProject = null
        
function getCurrentProject(currentProject){
    activeProject = currentProject;
    setStorage("dataBase", dataBase)   
}

function storeProjectName(projectTitle){
    activeProject = projectTitle
    dataBase[activeProject] = []
    setStorage("dataBase", dataBase)   
}

function storeTasks(tasks){
    dataBase[activeProject].push(tasks)
    setStorage("dataBase", dataBase)   
}

function editProject(editedProjectName){
    dataBase[editedProjectName] = dataBase[activeProject]
    delete dataBase[activeProject]
    activeProject = editedProjectName
    setStorage("dataBase", dataBase)       
}



function deleteProject(projectElement){
    delete dataBase[projectElement]
    setStorage("dataBase", dataBase)   
}


function deleteTasks(taskIndex){
    dataBase[activeProject].splice(taskIndex, 1)
    setStorage("dataBase", dataBase)   
}

function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : {}
}