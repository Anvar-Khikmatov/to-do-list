import { createTasks } from "./tasks"
import { dataBase } from "./logic"
import { storeTasks } from "./logic"
import { storeProjectName } from "./logic"
import { getCurrentProject } from "./logic.js"
import { activeProject } from "./logic"
import { updateActiveProject } from "./logic"
import { deleteProject, getTaskIndex, deleteTasks, setStorage } from "./logic"


const addProjectBtn = document.querySelector('.add-project')
const modal = document.getElementById('my-modal')
const closeModal = document.getElementById('close-modal')
const createProjectBtn = document.getElementById('create-project')
const createTaskBtn = document.getElementById('create-task')



let editMode = false
let elementToEdit = null
let projectNameID = null
const taskWindowContainer = createElement('div', 'task-window-container', null)
document.body.append(taskWindowContainer)


addProjectBtn.addEventListener('click', () => {
    
})

closeModal.addEventListener('click', () => {
   
})



createProjectBtn.addEventListener('click', () => {
    const projectName = document.getElementById('project-input').value
    if(editMode) { 
        editProject(projectName)
        return
    }
    localStorage.setItem('projectInput', projectName)
    storeProjectName(projectName)
    createProjectElement(projectName)
    displayAllTasks(activeProject)
    setStorage("key", projectName)   
    console.log(dataBase);
      
})


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

const parentProjectContainer = document.createElement('div')
parentProjectContainer.className = "paraent-projects"
document.body.append(parentProjectContainer);

parentProjectContainer.addEventListener('click', (e) => {
    if(e.target === parentProjectContainer) return
    if(e.target.classList.contains('project-element')){
       getCurrentProject(e.target.dataset.name)
       displayCurrentSelected(e.target.dataset.name)
       displayAllTasks(e.target.dataset.name)
    }
    if(e.target.classList.contains('delete-project-btn')){
        deleteElelement(e.target.closest('.project-element'))
        deleteProject(e.target.closest('.project-element').childNodes[0].textContent)
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

function createElement(elementType, className, elementText){
    const element = document.createElement(elementType)
    if(className) element.classList.add(className)
    if(elementText) element.textContent = elementText
    return element
}

function deleteElelement(element){
    element.remove()
}

function editProject(editedProjectName){
    dataBase[editedProjectName] = dataBase[activeProject]
    delete dataBase[activeProject]
    updateActiveProject(editedProjectName)
    elementToEdit.dataset.name = editedProjectName
    elementToEdit.childNodes[0].textContent = editedProjectName
    elementToEdit = null
    editMode = false     
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
        taskWindowContainer.innerHTML = "";
        taskWindowContainer.dataset.window = showTasks;
        taskWindowContainer.innerHTML = ""
        // if(taskWindowContainer.dataset.window === null) {
        // taskWindowContainer.innerHTML = ""
        // }        
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

