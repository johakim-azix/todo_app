let currentlyEditedItem = null
let tasksQueue = null
let lastMSScrollTopVal = null
let lastMCScrollTopVal = null
let isAddingTask = false
const TITLE_PLACEHOLDER = "Create new todo ..."
const DESCRIPTION_PLACEHOLDER = "Describe your task here ..."

class TodoRepository {
    constructor() {
        this.db = this.getDbInstance()
    }

    getDbInstance() {
        // try{
        //     let dbInstance = indexedDB.open("tasks")
        //         dbInstance.onupgradeneeded
        // }catch (exception) {
        //
        // }

    }
}

document.addEventListener("DOMContentLoaded", () => {
    initMainScene()

    fetch("data.json")
        .then(response => response.text())
        .then(data => {
            removeLoaderAnim()
            data = JSON.parse(data)
            document.getElementsByClassName("queue")[0].innerHTML = ""
            tasksQueue = new TasksQueue(document.getElementsByClassName("queue")[0], data.tasks)
            document.getElementById("active-tasks-count-label").innerText = tasksQueue.unCompletedTasksCount()+" items left"
        })
})

function initMainScene() {
    let mainSceneLayout = document.getElementsByClassName("main-scene")[0]
    let mainContentLayout = document.getElementsByClassName("main-content")[0]
    let tasksQueue = document.getElementsByClassName("queue")[0]
    setHeight(mainContentLayout, tasksQueue)
    lastMSScrollTopVal = mainSceneLayout.scrollTop
    lastMCScrollTopVal = mainContentLayout.scrollTop
    window.addEventListener("resize", () => {
        setHeight(mainContentLayout, tasksQueue)
    })

    addLoaderAnim()
}

function setHeight(mainContentLayout, taskQueueLayout) {
    mainContentLayout.style = "height : " + (window.innerHeight - 70) + "px!important"
    taskQueueLayout.style = "max-height : " + (window.innerHeight - (80)) + "px!important"
}

function removeLoaderAnim() {
    let elements = document.getElementsByClassName("skeleton")
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("skeleton")
    }
}

function addLoaderAnim() {
    let queue = document.getElementsByClassName("queue")[0]
    let html = ""
    for (let i = 0; i < 10; i++) {
        html += "<div class=\"todo\">\n" +
            "                    <div class=\"title-container\">\n" +
            "                        <div onclick=\"\" class=\"radio skeleton\" style=\"align-self: center\"></div>\n" +
            "                        <div class=\"title skeleton\"  style=\" \">\n" +
            "                            Finir de designer cette vue ...\n" +
            "                        </div>\n" +
            "                        <button onclick=\"\" disabled class=\"btn skeleton toggle-details\">\n" +
            "                            <i class=\"fa fa-caret-down\"></i>\n" +
            "                        </button>\n" +
            "                    </div>\n" +
            "                </div>"
    }
    queue.innerHTML = html
}

function scrolled(element) {
    let mainScene = document.getElementsByClassName("main-scene")[0]
    if (element.classList.contains("main-content")) {
        let currentMCScrollTopVal = element.scrollTop
        if ((currentMCScrollTopVal - lastMCScrollTopVal) > 0) { //means we are scrolling down
            mainScene.scrollTo({
                "top": document.getElementsByClassName("main-scene")[0].scrollHeight,
                "left": 0,
                "behavior": "smooth"
            });
        } else {
            mainScene.scrollTo({
                "top": 0,
                "left": 0,
                "behavior": "smooth"
            });
        }
        lastMCScrollTopVal = currentMCScrollTopVal
    }
}

function onCreateTaskIntent(element) {
    let addTodoContainer = element.parentElement.parentElement.parentElement
    let toggle = addTodoContainer.getElementsByTagName("input")[0]
    toggle.checked = true

    if (isAddingTask) return
    setAddTodoContainer(addTodoContainer)
    isAddingTask = true
}

function onFieldFocusOut(field) {
    typingEnd(field)
}

function typingEnd(field) {
    if (field.innerText.trim().length === 0) {
        if (field.classList.contains("title")) {
            field.innerText = TITLE_PLACEHOLDER
            disableBtn([field.parentElement.parentElement.parentElement.getElementsByTagName("button")[0]])
        } else {
            field.innerText = DESCRIPTION_PLACEHOLDER
        }
    } else {
        if (field.classList.contains("title")) {
            enableBtn([field.parentElement.parentElement.parentElement.getElementsByTagName("button")[0]])
        }
    }
}

function typingStart(field) {
    if (fieldHasPlaceHolder(field)) {
        field.innerText = ""
    }
}

function fieldHasPlaceHolder(field) {
    if (field.innerText === "Create new todo ..." || field.innerText === "Describe your task here ...") return true
    return false
}

function submitTask(button) {
    try {
        let addTodoContainer = button.parentElement.parentElement.parentElement.parentElement
        let titleField = addTodoContainer.getElementsByClassName("title")[0]
        let descriptionField = addTodoContainer.getElementsByClassName("description")[0]

        let task = new Task(titleField.innerText.trim(), descriptionField.innerText.trim())
        tasksQueue.setTask(task)
        resetAddTodoContainer(addTodoContainer)
        isAddingTask = false
    } catch (exception) {

    }
}

function clearCompletedTasks(button) {
    tasksQueue.clearCompletedTasks()
}

function showAllTasks(button) {
    tasksQueue.showAllTasks()
}

function showActiveTasks(button) {
    tasksQueue.hideUnCompletedTasks()
}

function showCompletedTasks(button) {
    tasksQueue.hideCompletedTasks()
}


function dropTask(button) {
    let addTodoContainer = button.parentElement.parentElement.parentElement.parentElement
    let toggle = addTodoContainer.getElementsByTagName("input")[0]
    toggleItemsChecks(toggle)
    resetAddTodoContainer(addTodoContainer)
    isAddingTask = false
}

function setAddTodoContainer(addTodoContainer) {
    let toggle = addTodoContainer.getElementsByTagName("input")[0]
    let titleField = addTodoContainer.getElementsByClassName("title")[0]
    let descriptionField = addTodoContainer.getElementsByClassName("description")[0]
    let saveBtn = addTodoContainer.getElementsByTagName("button")[0]
    if (!fieldHasPlaceHolder(titleField) && !fieldHasPlaceHolder(descriptionField)) return;
    titleField.contentEditable = true
    descriptionField.contentEditable = true
    titleField.focus()
    titleField.innerText = "Create new todo ..."
    descriptionField.innerText = "Describe your task here ..."
    disableBtn([saveBtn])
    toggle.checked = true
}

function resetAddTodoContainer(addTodoContainer) {
    let titleField = addTodoContainer.getElementsByClassName("title")[0]
    let descriptionField = addTodoContainer.getElementsByClassName("description")[0]
    let btnSave = addTodoContainer.getElementsByTagName("button")[0]

    titleField.focus()
    titleField.innerText = "Create new todo ..."
    descriptionField.innerText = "Describe your task here ..."
    titleField.contentEditable = false
    descriptionField.contentEditable = false
    disableBtn([btnSave])
}

function toggleTodoState(check) {
    // alert("here : "+getTodoItemView(check).innerHTML)

    // check.classList = "radio checked"
    // let todo = new Todo("ma super tache", "la description de ma super tache ...")
    // strTodo = JSON.stringify(todo)
    // let jsonTodo = JSON.parse(strTodo)
    // alert(new Todo(jsonTodo.title, jsonTodo.description).getSth())
    document.getElementById("active-tasks-count-label").innerText = tasksQueue.unCompletedTasksCount()+" items left"
}

function toggleTheme(button) {
    // todo : star from here
}


function toggleDetails(button) {
    if (currentlyEditedItem !== null) {
        // cancelEdition()
        alert("got you")
        return;
    }
    let todoItem = document.getElementById(getTodoItemViewId(button))
    let toggle = todoItem.getElementsByTagName('input')[0]
    toggleItemsChecks(toggle)
    enableBtn(todoItem.getElementsByTagName('button'))
}

function toggleItemsChecks(currentCheck) {
    let checks = document.getElementsByName("todo-details-toggle")
    checks.forEach(check => {
        if (check !== currentCheck) {
            check.checked = false
        } else {
            check.checked = !(check.checked)
        }
    })
}

function saveChanges(button) {
    let todoItem = document.getElementById(getTodoItemViewId(button))
    let contentEditableToggle = todoItem.getElementsByTagName('input')[1]
    let titleField = todoItem.getElementsByClassName("title")[0]
    let descriptionField = todoItem.getElementsByClassName("description-container")[0]

    let task = tasksQueue.getTask(parseInt(todoItem.getAttribute("id").split("-")[2]))
    task.title = titleField.innerText.trim()
    task.description = descriptionField.innerText.trim()
    tasksQueue.updateTask(parseInt(todoItem.getAttribute("id").split("-")[2]), task)
    currentlyEditedItem = null
    contentEditableToggle.checked = false
    titleField.contentEditable = false
    descriptionField.contentEditable = false
    enableBtn([todoItem.getElementsByTagName("button")[2]])
}

function editTodo(button) {
    let todoItem = document.getElementById(getTodoItemViewId(button))
    currentlyEditedItem = todoItem.getAttribute('id')
    let contentEditableToggle = todoItem.getElementsByTagName('input')[1]
    let titleField = todoItem.getElementsByClassName("title")[0]
    let descriptionField = todoItem.getElementsByClassName("description-container")[0]

    titleField.contentEditable = true
    descriptionField.contentEditable = true
    contentEditableToggle.checked = true
    disableBtn([todoItem.getElementsByTagName("button")[2]])
}

function deleteTodo(button) {
    let todoItem = document.getElementById(getTodoItemViewId(button))
    let contentEditableToggle = todoItem.getElementsByTagName('input')[1]
    let titleField = todoItem.getElementsByClassName("title")[0]
    let descriptionField = todoItem.getElementsByClassName("description-container")[0]
    tasksQueue.removeTask(parseInt(todoItem.getAttribute("id").split("-")[2]))
}

function deleteTodoIntent(button) {
    /*todo : display the modal component and from the modal class*/
    let todoItem = document.getElementById(getTodoItemViewId(button))
    let contentEditableToggle = todoItem.getElementsByTagName('input')[1]
    let titleField = todoItem.getElementsByClassName("title")[0]
    let descriptionField = todoItem.getElementsByClassName("description-container")[0]

}


function enableBtn(btns = []) {
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = false
        btns[i].classList.remove("disabled")
    }
}

function disableBtn(btns = []) {
    btns.forEach(btn => {
        btn.disabled = true
        btn.classList.add("disabled")
    })
}

function getTodoItemViewId(button) {
    let todoItemViewId = null
    if (button.parentElement.classList.toString() === "title-container") {
        todoItemViewId = ((button.parentElement).parentElement).getAttribute('id')
    } else {
        todoItemViewId = (((button.parentElement).parentElement).parentElement).getAttribute('id')
    }
    return todoItemViewId
}

class TasksQueue {
    constructor(queueLayout, tasks) {
        this.layout = queueLayout
        this.tasks = tasks
        this.renderTasks(tasks)
    }

    renderTasks(tasks) {
        let reversedTasks = tasks.reverse()
        reversedTasks.forEach((task, index) => {
            this.layout.appendChild(new TasksItemViewHolder().bindViewHolder(task, index))
        })
    }

    getTask(index) {
        return this.tasks[index]
    }

    updateTask(index, task) {
        this.tasks[index] = task
    }

    removeTask(index) {
        this.tasks.splice(index, 1)
        this.layout.removeChild(document.getElementById("task-item-" + index))
        if (this.tasks.length === 0) {
            this.layout.innerHTML = this.renderQueueEmptyPlaceHolder()
        }
    }

    setTask(task) {
        this.tasks.push(task)
        this.layout.prepend(new TasksItemViewHolder().bindViewHolder(task, this.tasks.length - 1))
    }

    clearCompletedTasks() {
        this.tasks.forEach((task, index) => {
            if (task.isCompleted) this.removeTask(index)
        })
    }

    hideCompletedTasks(){
        let unCompletedTasks = []
        this.tasks.forEach(task => {
            if (task.isCompleted) unCompletedTasks.push(task)
        })
        if (unCompletedTasks.length !==0){
            this.layout.innerHTML = ""
            this.renderTasks(unCompletedTasks)
        }else {
            this.layout.innerHTML = this.renderQueueEmptyPlaceHolder()
        }
    }

    hideUnCompletedTasks(){
        let completedTasks = []
        this.tasks.forEach(task => {
            if (!task.isCompleted) completedTasks.push(task)
        })
        if (completedTasks.length !==0){
            this.layout.innerHTML = ""
            this.renderTasks(completedTasks)
        }else {
            this.layout.innerHTML = this.renderQueueEmptyPlaceHolder()
        }
    }

    showAllTasks(){
        this.layout.innerHTML = ""
        this.renderTasks(this.tasks)
    }

    unCompletedTasksCount(){
        let completedTasksCount = 0
        this.tasks.forEach((task) => {
            if (task.isCompleted) completedTasksCount++
        })
        return this.tasks.length-completedTasksCount
    }

    toggleTaskState(index) {
        this.tasks[index].isCompleted = !(this.tasks[index].isCompleted)
        return true
    }

    renderQueueEmptyPlaceHolder(){
        //todo : complete this part
        return  "<p class='description' style='text-align: center'> Sorry, but we didn't find tasks!!!</p> "
    }
}

class TasksItemViewHolder {
    static TAKS_ITEM_VIEW_HOLDER_TEMPLATE = "<div id=\"task-item-id\" class=\"todo dark\">\n" +
        "                    <input name=\"todo-details-toggle\" type=\"checkbox\">\n" +
        "                    <input name=\"content-editable-toggle\" type=\"checkbox\">\n" +
        "                    <div class=\"title-container\">\n" +
        "                        <div onclick=\"toggleTodoState(this)\" class=\"radio dark\">\n" +
        "                            <img src=\"images/icon-check.svg\" alt=\"\">\n" +
        "                        </div>\n" +
        "                        <div class=\"title\"  style=\"margin-right: 0!important\">\n" +
        "                            Finir de designer cette vue ...\n" +
        "                        </div>\n" +
        "                        <button onclick=\"toggleDetails(this)\" class=\"btn toggle-details\">\n" +
        "                            <i class=\"fa fa-caret-down\"></i>\n" +
        "                        </button>\n" +
        "                    </div>\n" +
        "                    <div class=\"description-container\" >\n" +
        "                        Fondre la page et la rendre pleinement responsive pour les divers support.\n" +
        "                    </div>\n" +
        "                    <div class=\"controls\">\n" +
        "                        <span></span>\n" +
        "                        <div>\n" +
        "                            <button onclick=\"saveChanges(this)\" class=\"btn save\">\n" +
        "                                <i class=\"fa fa-save\"></i> Save\n" +
        "                            </button>\n" +
        "                            <button onclick=\"editTodo(this)\" class=\"btn save\">\n" +
        "                                <i class=\"fa fa-pen\"></i> Edit\n" +
        "                            </button>\n" +
        "                            <button onclick=\"deleteTodo(this)\" class=\"btn delete\">\n" +
        "                                <i class=\"fa fa-trash\"></i> Delete\n" +
        "                            </button>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>"

    constructor() {
        this.viewHolder = this.createViewHolder()
    }

    createViewHolder() {
        let parser = new DOMParser()
        return parser.parseFromString(TasksItemViewHolder.TAKS_ITEM_VIEW_HOLDER_TEMPLATE, "text/html").getElementById("task-item-id")
    }

    bindViewHolder(task, taskIndex) {
        this.viewHolder.setAttribute('id', "task-item-" + taskIndex)
        if (task.isCompleted) this.viewHolder.getElementsByClassName("radio")[0].style = "background-color: black; transition: all ease-in-out .15s;"
        this.viewHolder.getElementsByClassName("title")[0].innerText = task.title
        this.viewHolder.getElementsByClassName("description-container")[0].innerText = task.description
        return this.viewHolder
    }
}

class Task {
    constructor(title, description, isCompleted = false) {
        this.title = title
        this.description = description
        this.isCompleted = isCompleted
    }
}

class ModalDialog { //display the dialog
    constructor(todoItemId, layout = null,) {
    }
}


//
//
//
//
// function scrolled(divElement){
//     console.log("old_scroll : "+this.oldScroll)
// }
// function desplayDetails(todoItem) {
//     console.log("item clicked : "+this.currentTarget)
// }
//
// document.addEventListener("DOMContentLoaded" , ()=>{
//
//     let todoItems = document.getElementsByClassName("todo")
//     for (let i =0; i < todoItems.length; i++){
//         todoItems[i].addEventListener('click', (element)=>{
//             console.error(JSON.stringify(element.target))
//             // if(element.target !== element.currentTarget) console.log("child clicked")
//             // else console.log("parent clicked")
//         })
//     }
//     return;
//     document.getElementsByClassName("todo").forEach((todoItem, index) => {
//         todoItem.addEventListener('click', (element)=>{
//             if(element.target !== element.currentTarget) console.log("child clicked")
//             else console.log("parent clicked")
//         })
//     })
// })
//
// document.getElementsByClassName("todo").forEach((todoItem, index) => {
//     todoItem.addEventListener('click', (element)=>{
//         console.error(element.currentTarget)
//         // if (element.currentTarget)
//         // if(element.target !== element.currentTarget) console.log("child clicked")
//         // else console.log("parent clicked")
//     })
// })
//
// function radioClicked(radio) {
//     console.log("radio clicked")
// }
//
// // window.onscroll(()=>{
// //     alert("hhdhhhf")
// // })
//
//
// // $(window).scroll(function(){
// //     $(".top").css("opacity", 1 - $(window).scrollTop() / 250);
// // });
//
// /*win.scroll(function(){
//   scrollPosition = win.scrollTop();
//   scrollRatio = 1 - scrollPosition / 300;
//   $(".top").css("opacity", scrollRatio);
// */
//
//
//
//
//
// /*$(window).scroll(function(){
//     var scrollVar = $(window).scrollTop();
//     $('.top').css("opacity", 1 - scrollVar/300);
// })*/
//
//
//
