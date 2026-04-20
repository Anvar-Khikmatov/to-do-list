import {
    createTasks,
    dataBase,
    getCurrentProject,
    state,
    storeTasks,
    storeProjectName,
    editProject,
    deleteProject,
    deleteTasks,
    getTaskStatus
} from "./logic.js";

export {createProjectElement, displayCurrentProject, displayTasksNumber, displayCurrentTask}


const toggleSidebarBtn = document.body.querySelector(".toggle-btn")
const addProjectBtn = document.getElementById("add-project");
const addTaskBtn = document.querySelector(".main__header--add-btn");
const projectModal = document.getElementById("project-modal");
const taskModal = document.getElementById("task-modal");
const taskModalForm = document.querySelector(".modal-task__form");
const closeModal = document.querySelector(".close-modal");
const closeTaskModal = document.querySelector("#close-task-modal");
const createProjectBtn = document.querySelector("#create-project");
const createTaskBtn = document.querySelector("#create-task");
const modalCreateBtn = document.querySelector(".modal_btn--create");
const projectInput = document.querySelector("#project-input");
const taskTitle = document.querySelector("#task-title");
const errorElement = document.querySelector("#input-error");
const taskErrorElement = document.querySelector("#task-input-error");
const sidebarProjects = document.querySelector(".sidebar__projects");
const sidebarFilter = document.querySelector(".sidebar__filter");
const mainSection = document.querySelector(".main__section");
const mainHeaderTitle = document.querySelector(".main__header--title");
const numberOfTasks = document.querySelector(".js-task-count");
const allBtn = document.getElementById('all_btn')
const upcomingBtn = document.getElementById('upcoming_btn')
const importantBtn = document.getElementById('important_btn')
const completedBtn = document.getElementById('completed_btn')
const addTasksBtn = document.querySelector('.main__header--add-btn')
const mainWrapper = document.querySelector('.main-wrapper')



let editMode = false;
let elementToEdit = null;
let editTaskMode = false;
let editTaskElement = null
let editTaskId = null

const icons = {
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="trash-2" aria-hidden="true" class="lucide lucide-trash-2"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    edit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="file-pen-line" aria-hidden="true" class="lucide lucide-file-pen-line"><path d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z"></path><path d="M14.487 7.858A1 1 0 0 1 14 7V2"></path><path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516"></path><path d="M8 18h1"></path></svg>`
}


function taskShowError() {
    if (taskTitle.validity.valueMissing) {
        taskErrorElement.textContent = "You must enter a project name.";
    } else if (taskTitle.validity.tooShort) {
        taskErrorElement.textContent = `Name must be at least ${taskTitle.minLength} characters.`;
    }
}


function showError() {
    if (projectInput.validity.valueMissing ) {
        errorElement.textContent = "You must enter a project name.";
    } else if (projectInput.validity.tooShort) {
        errorElement.textContent = `Name must be at least ${projectInput.minLength} characters.`;
    }
}


function resetModal(){
    editMode = false;
    elementToEdit = null;
    projectInput.value = ""
    errorElement.textContent = ""
    taskErrorElement.textContent = ""
    modalCreateBtn.textContent = "Create";
}


function resetMainSection(){
    mainHeaderTitle.innerHTML = "";
    numberOfTasks.innerHTML = "";
    addTasksBtn.style.display = 'none'
    mainWrapper.style.display = "none";
}


function createElement(elementType, elementText, ...className){
    const element = document.createElement(elementType)
    if(elementText) element.textContent = elementText
    if(className.length > 0) element.classList.add(...className)
    return element
}


function deleteElelement(element){
    element.remove() 
}


function createProjectElement(name) {
    const project = createElement("button", null, "project-links");
    project.dataset.name = name;
    const projectNameSpan  = createElement("span", name, "project-name")
    const projectActions = createElement('div', null, "project-actions")  
    const editProjectBtn = createElement("button", null, "project__btn", "edit-project");
    editProjectBtn.innerHTML = icons.edit;
    const deleteProjectBtn = createElement("button", null, "project__btn", "delete-project");
    deleteProjectBtn.innerHTML = icons.trash
    projectActions.append(editProjectBtn, deleteProjectBtn);
    project.append(projectNameSpan, projectActions);
    sidebarProjects.append(project);
}


function editProjectElement(newProjectName) {
    elementToEdit.dataset.name = newProjectName;
    const nameSpan = elementToEdit.querySelector('.project-name');
    if (nameSpan) nameSpan.textContent = newProjectName;
    elementToEdit = null;
    editMode = false;
}


function displayCurrentProject(projectTitle){
    Object.keys(dataBase).length == 0 ? resetMainSection() : mainHeaderTitle.textContent = projectTitle
}


function displayTasksNumber(currentProject){
    if(!dataBase[currentProject]) return
    const taskNumber = dataBase[currentProject].length
    numberOfTasks.textContent = taskNumber;
}


function displayCurrentTask(){
    mainSection.innerHTML = "";
    if(!dataBase[state.activeProject]) return
    const currentTaskView = dataBase[state.activeProject]
    currentTaskView.forEach(task => {
        renderTask(task)
    });   
}


function displayAllTask(){
    mainSection.innerHTML = "";
    const allTaskView = Object.values(dataBase).flat()
    numberOfTasks.textContent = allTaskView.length
    allTaskView.forEach(task => {
        renderTask(task)
    });   
}


function displayUpcoming(){
    mainSection.innerHTML = "";
    const today = new Date()
    const allTaskView = Object.values(dataBase).flat()
    const upcoming = allTaskView.filter(task => new Date(task.dueDate) > today)
    numberOfTasks.textContent = upcoming.length
    upcoming.forEach(task => {
        renderTask(task)
    })
}


function displayImportant(){
    mainSection.innerHTML = "";
    const allTaskView = Object.values(dataBase).flat()
    const importantTasks = allTaskView.filter(task => task.priority === "high")
    numberOfTasks.textContent = importantTasks.length
    importantTasks.forEach(task => {
        renderTask(task)
    })  
}


function displayCompleted(){
    mainSection.innerHTML = "";
    const allTaskView = Object.values(dataBase).flat()
    const completedTasks = allTaskView.filter(task => task.status === true)
    numberOfTasks.textContent = completedTasks.length
    completedTasks.forEach(task => {
        renderTask(task)
    }) 
}


function handleEditClick(wrapper) {
    const id = wrapper.dataset.id;
    const taskToEdit = dataBase[state.activeProject].find(t => t.id === id);

    if (taskToEdit) {
        taskTitle.value = taskToEdit.title;
        document.getElementById('task-description').value = taskToEdit.description;
        document.getElementById('task-date').value = taskToEdit.dueDate;
        document.getElementById('task-priority').value = taskToEdit.priority;

        editTaskMode = true;
        editTaskElement = wrapper;
        editTaskId = id;

        taskModal.showModal();
        setTimeout(() => taskTitle.focus(), 50);
    }
}


function renderTask(taskData){
        const html = `   
                    <div class="main__task-wrapper" data-id = "${taskData.id}">
                        <div class="main__task-box">
                            <div class="main__task-identity">
                                <div class="checkbox-wrapper-11">
                                    <input id="${taskData.id}" type="checkbox" ${taskData.status ? 'checked' : ''} >
                                    <label for="${taskData.id}">To-do</label>
                                </div>
                                <div class="main__task-title" for="task-1" class="title">${taskData.title}</div>
                            </div>
                            <div class="main__btn-actions">
                                <button class="task-btn btn-edit-task"> ${icons.edit} </button>
                                <button class="task-btn btn-delete-task"> ${icons.trash} </i></button>
                            </div>
                        </div>
                        
                        <div class="main__dropdown-content">
                            <div class="main__dropdown-inner">
                                <div class="dropdown__info-group">
                                    <div class="dropdown__info-description">Description: </div>
                                    <p class="dropdown__info-text">${taskData.description}</p>
                                </div>
                                <div class="dropdown__meta-group">
                                    <span class="dropdown__priority-text">Priority: <span class="dropdown__priority-value"> ${taskData.priority.charAt(0).toUpperCase() + taskData.priority.slice(1)}</span> </span>
                                    <span class="dropdown__date-text">Due: <span class="dropdown__date-value"> ${taskData.dueDate} </span> </span>
                                </div>
                            </div>
                        </div>
                    </div>      
            `;   
        mainSection.insertAdjacentHTML('beforeend', html);  
}




toggleSidebarBtn.addEventListener("click", () => {
    document.querySelector(".container").classList.toggle("sidebar-closed");
});


addProjectBtn.addEventListener("click", () => {
    resetModal()
    projectModal.showModal();
});


closeModal.addEventListener("click", () => {
    projectModal.close();
});


addTaskBtn.addEventListener('click', () => {
    resetModal()
    taskModal.showModal()
})


closeTaskModal.addEventListener("click", () => {
    taskModal.close();
    taskModalForm.reset();
    editTaskMode = false;
});





createProjectBtn.addEventListener("click", (e) => {
    let projectInputValue = projectInput.value
    const allKeys = Object.keys(dataBase)

    e.preventDefault();  
    if (!editMode && !projectInput.validity.valid) {
        showError();

    } else if (allKeys.find(projects => projects === projectInputValue))  {
        errorElement.textContent = "This project name is already exist"
        return;

    } else {
        if (editMode) {
            editProject(projectInputValue);
            editProjectElement(projectInputValue);
            displayCurrentProject(state.activeProject)
            projectModal.close()
            return;
        }
        storeProjectName(projectInputValue);       
        createProjectElement(projectInputValue);
        displayCurrentProject(state.activeProject)
        displayTasksNumber(state.activeProject)
        displayCurrentTask()
        projectModal.close();
    }
});


createTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();  
    if (!taskTitle.validity.valid) {
        taskShowError()
        return;
    } 
     
    if(Object.keys(dataBase).length == 0) return

    const title = taskTitle.value    
    const taskDescription = document.getElementById('task-description').value
    const taskDate = document.getElementById('task-date').value
    const taskPriority = document.getElementById('task-priority').value

        if(editTaskMode){
          
            dataBase[state.activeProject] = dataBase[state.activeProject].map(task => 
                task.id === editTaskId 
                ? { ...task, title, description: taskDescription, dueDate: taskDate, priority: taskPriority }
                : task
            );

        editTaskElement.remove();
        editTaskMode = false;
        editTaskElement = null;
        editTaskId = null;
    } else {
         const taskData = createTasks(title, taskDescription, taskDate, taskPriority)
         storeTasks(taskData);
    }
    const updatedTask = dataBase[state.activeProject].find(t => t.title === title); 
    renderTask(updatedTask);
    displayTasksNumber(state.activeProject)
    taskModal.close();
    taskModalForm.reset();        
})



sidebarProjects.addEventListener('click', (e) => {
    if(e.target === sidebarProjects) return
    addTasksBtn.style.display = 'block'
    mainWrapper.style.display = "block"
    const projectBtn = e.target.closest('.project-links')
    if(!projectBtn) return     

    getCurrentProject(projectBtn.dataset.name)       
    displayCurrentProject(projectBtn.dataset.name)
    displayTasksNumber(state.activeProject)
    displayCurrentTask()
    
    if(e.target.closest('.delete-project')){
        const firstKey = Object.keys(dataBase)[0]
        deleteProject(projectBtn.dataset.name)
        deleteElelement(projectBtn)
        getCurrentProject(firstKey)
        displayCurrentProject(firstKey)
        displayTasksNumber(firstKey)
        displayCurrentTask()     
    }
    if (e.target.closest('.edit-project')) {
        editMode = true
        modalCreateBtn.textContent = "Update"          
        elementToEdit = e.target.closest('.project-links')
        const currentPrjectInput = state.activeProject
        projectInput.value = currentPrjectInput
        projectModal.showModal();
    }
})


sidebarFilter.addEventListener('click', (e) => {
    if(e.target === sidebarFilter) return
    mainWrapper.style.display = "block"

    if(e.target.closest('#all_btn')) {
        addTasksBtn.style.display = 'none'
        displayAllTask()
        displayCurrentProject(e.target.textContent)
    }

    if(e.target.closest('#upcoming_btn')) {
        displayUpcoming()
        displayCurrentProject(e.target.textContent)
    }

    if(e.target.closest('#important_btn')) {
        displayImportant()
        displayCurrentProject(e.target.textContent)
    }

    if(e.target.closest('#completed_btn')) {
        displayCompleted()
        displayCurrentProject(e.target.textContent)
    }
        
})


mainSection.addEventListener('click', (e) => {
    const wrapper = e.target.closest('.main__task-wrapper');
    if (!wrapper) return;

    if(e.target.closest('input[type="checkbox"]')){
        const id =  wrapper.dataset.id
        getTaskStatus(id) 
    }

    if (e.target.closest('.main__btn-actions') || e.target.closest('.checkbox-wrapper-11')){

        const editBtn = e.target.closest('.btn-edit-task');
        if(editBtn) {
            handleEditClick(wrapper)
        }
        const deleteBtn = e.target.closest('.btn-delete-task');
        if (deleteBtn) {
            const id = wrapper.dataset.id;
            deleteTasks(id);
            displayTasksNumber(state.activeProject)
            wrapper.remove(); 
            return; 
        }
        return
    }
    const content = wrapper.querySelector('.main__dropdown-content');
    content.classList.toggle('is-open');
});


