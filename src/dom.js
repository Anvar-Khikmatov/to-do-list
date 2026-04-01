import { createProject } from "./project"
import { createTasks } from "./tasks"
import { createProjectTitle } from "./logic"
import { createTaskData } from "./logic"
import { dataBase } from "./logic"
import { storeTasks } from "./logic"
import { storeProjectName } from "./logic"
import { getCurrentProject } from "./logic.js"


const addProjectBtn = document.querySelector('.add-project')
const modal = document.getElementById('my-modal')
const closeModal = document.getElementById('close-modal')
const createProjectBtn = document.getElementById('create-project')
const title = document.getElementById('title')
const description = document.getElementById('description')
const date = document.getElementById('date')
const priority = document.getElementById('priority')
const createTaskBtn = document.getElementById('create-task')


let editMode = false

addProjectBtn.addEventListener('click', () => {
    
})

closeModal.addEventListener('click', () => {
   
})



createProjectBtn.addEventListener('click', () => {
    const projectName = document.getElementById('project-input').value
    storeProjectName(projectName)
    createProjectElement(projectName) 
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
    
})

const parentProjectContainer = document.createElement('div')
parentProjectContainer.className = "paraent-projects"
document.body.append(parentProjectContainer);

parentProjectContainer.addEventListener('click', (e) => {
    if(e.target === parentProjectContainer) return
    if(e.target.classList.contains('project-element')){
       getCurrentProject(e.target.dataset.name)
       displayCurrentSelected(e.target.dataset.name)
    }
    if(e.target.classList.contains('delete-project-btn')){
        deleteElelement(e.target.closest('.project-element'))
    }
    if (e.target.classList.contains('edit-project-btn')) {
        editMode = true
        editProject(e.target.closest('.project-element'))   
    }
})


function createProjectElement(name){
    const project = createElement('div', 'project-element', null)
    project.dataset.name = name
    const deleteProjectBtn = createElement('button', 'delete-project-btn', "Delete")
    const editProjectBtn = createElement('button', 'edit-project-btn', "Edit")
    
    project.append(editProjectBtn, deleteProjectBtn)
    parentProjectContainer.append(project)
}

function createElement(elementType, className, elementText){
    const element = document.createElement(elementType)
    element.classList.add(className)
    element.textContent = elementText
    return element
}

function deleteElelement(element){
    element.remove()
}

function editProject(projectName){
    document.getElementById('project-input').focus()
}


const selected = document.createElement('div')
selected.classList.add('display-selected')
const selectedText = document.createElement('p')
selectedText.classList.add('selected-text')
selected.append(selectedText)
document.body.append(selected)


function displayCurrentSelected(selected){
    selectedText.textContent = selected
}


