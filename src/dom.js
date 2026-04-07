import { createTasks } from "./tasks.js"
import { dataBase, getCurrentProject, activeProject, storeTasks, storeProjectName, editProject, deleteProject, deleteTasks } from "./logic.js"
// export { createProjectElement }


const addProjectBtn = document.querySelector('.sidebar__btn--add')
const projectModal = document.getElementById('project-modal')
const closeModal = document.querySelector('.close-modal')
// const createProjectBtn = document.getElementById('create-project')




let editMode = false
let elementToEdit = null

// const taskWindowContainer = createElement('div', 'task-window-container', null)
// const parentProjectContainer = createElement('div', 'parent-projects', null)
// document.body.append(taskWindowContainer, parentProjectContainer);


addProjectBtn.addEventListener('click', () => {
    projectModal.showModal()
})

closeModal.addEventListener('click', () => {
    projectModal.close()
})



// createProjectBtn.addEventListener('click', () => {
//     const projectName = document.getElementById('project-input').value
//     if(editMode) { 
//         editProject(projectName)
//         editProjectElement(projectName)
//         return   }
//         storeProjectName(projectName)
//         createProjectElement(projectName)
//         displayAllTasks(activeProject)   
//         console.log(dataBase);
// })

/*
createTaskBtn.addEventListener('click', () => {
    const taskTitle = document.getElementById('title').value
    const taskDescription = document.getElementById('description').value
    const taskDate = document.getElementById('date').value
    const taskPriortiy = document.getElementById('priority').value
    const taskData = createTasks(taskTitle, taskDescription, taskDate, taskPriortiy) 
    storeTasks(taskData)
    console.log(dataBase);
    displayAllTasks(activeProject)    
})



parentProjectContainer.addEventListener('click', (e) => {
    if(e.target === parentProjectContainer) return

    if(e.target.classList.contains('project-element')){
       getCurrentProject(e.target.dataset.name)
       displayCurrentSelected(e.target.dataset.name)
       displayAllTasks(e.target.dataset.name)
    }
    if(e.target.classList.contains('delete-project-btn')){
        deleteElelement(e.target.closest('.project-element'))
        deleteProject(e.target.closest('.project-element').dataset.name)
        displayAllTasks(null)       
    }
    if (e.target.classList.contains('edit-project-btn')) {
        editMode = true
        elementToEdit = e.target.closest('.project-element')
        document.getElementById('project-input').focus()
    }
})

taskWindowContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('tasks-delete-btn')) {
       deleteTasks(Number(e.target.closest('.display-tasks').dataset.index))
       displayAllTasks(activeProject) 
    }
    if(e.target.classList.contains('tasks-edit-btn')) {
       deleteTasks(Number(e.target.closest('.display-tasks').dataset.index))
       document.getElementById('title').focus()
    }
})



function createProjectElement(name){
    const project = createElement('div', 'project-element', name)
    project.dataset.name = name
    const deleteProjectBtn = createElement('button', 'delete-project-btn', "Delete")
    const editProjectBtn = createElement('button', 'edit-project-btn', "Edit")
    project.append(editProjectBtn, deleteProjectBtn)
    parentProjectContainer.append(project)  
}


function editProjectElement(projectName){
    elementToEdit.dataset.name = projectName
    elementToEdit.childNodes[0].textContent = projectName
    elementToEdit = null
    editMode = false 
}


function createElement(elementType, className, elementText){
    const element = document.createElement(elementType)
    if(className) element.classList.add(className)
    if(elementText) element.textContent = elementText
    return element
}

function deleteElelement(element){
    element.remove() 
}





const selected = document.createElement('div')
selected.classList.add('display-selected')
const projectNameDisplay = createElement('p', null, "Project:")
const selectedText = document.createElement('p')
selectedText.classList.add('selected-text')
selected.append(projectNameDisplay, selectedText)
document.body.append(selected)



function displayCurrentSelected(selected){
    selectedText.textContent = selected
}



    function displayAllTasks(showTasks){
        taskWindowContainer.dataset.window = showTasks;
        taskWindowContainer.innerHTML = ""      
        if(showTasks) dataBase[showTasks].forEach((element, index) => {
            const tasksWindow = createElement('div', 'display-tasks', null)
            tasksWindow.dataset.index = index;
            const taskEditBtn = createElement('button', 'tasks-edit-btn', "Edit")
            const tasksDeleteBtn = createElement('button', 'tasks-delete-btn', "Delete")
            const taskWindowTitle = createElement('p', null, "Tasks:")
            const taskTitle = createElement('div', 'tasks-box', element.title)
            const taskDescription = createElement('div', 'tasks-box', element.description)
            const taskDueDate = createElement('div', 'tasks-box', element.dueDate)
            const taskPriority = createElement('div', 'tasks-box', element.priority)
            tasksWindow.append(taskWindowTitle, taskEditBtn, tasksDeleteBtn, taskTitle, taskDescription, taskDueDate, taskPriority)
            taskWindowContainer.append(tasksWindow)
        })  
    }
*/

document.body.querySelector('.toggle-btn').addEventListener('click', () => {
    document.querySelector('.container').classList.toggle('sidebar-closed');
}) 

