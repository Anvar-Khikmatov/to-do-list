export { dataBase, state, createTasks, getCurrentProject, storeProjectName, storeTasks, editProject, deleteProject, deleteTasks, setStorage, getStorage, getTaskStatus } 

const dataBase = {
    Education: [
        {
            title: "Finish ToDo list project",
            description: "Project must be finished with good UI and responsive design" ,
            priority: "high",
            dueDate: "2026-04-19",
            id: crypto.randomUUID(),
            status: false
        },
        {
            title: "Start React JS",
            description: "Focus on learning usestate hook and effect asap" ,
            priority: "Medium",
            dueDate: "2026-05-01",
            id: crypto.randomUUID(),
            status: false
        }
    ]
}


const state = { activeProject: "Education" };
        

function createTasks(title, description, dueDate, priority){
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        id: crypto.randomUUID(),
        status: false,
    }
}


function getCurrentProject(currentProject){
    state.activeProject = currentProject;  
}


function storeProjectName(projectName){
    state.activeProject = projectName
    dataBase[state.activeProject] = []
    setStorage("dataBase", dataBase)   
}


function storeTasks(tasks){
    dataBase[state.activeProject].push(tasks)
    setStorage("dataBase", dataBase)   
}


function editProject(editedProjectName) {
    dataBase[editedProjectName] = dataBase[state.activeProject];
    delete dataBase[state.activeProject];
    state.activeProject = editedProjectName;
    setStorage("dataBase", dataBase);
}


function deleteProject(project){
    delete dataBase[project]
    setStorage("dataBase", dataBase)   
}


function deleteTasks(taskID){
    dataBase[state.activeProject] = dataBase[state.activeProject].filter(task => task.id !== taskID)
    setStorage("dataBase", dataBase)   
}


function getTaskStatus(taskId){
    dataBase[state.activeProject].forEach(task => {
        if(task.id === taskId) {
            task.status = !task.status
        }    
    });
    setStorage("dataBase", dataBase)
}


function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}


function getStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : {}
}



