
let currentlyEditedItem = null
let tasksQueue = null

class TodoRepository{
    constructor() {
        this.db = this.getDbInstance()
    }

    getDbInstance(){
        // try{
        //     let dbInstance = indexedDB.open("tasks")
        //         dbInstance.onupgradeneeded
        // }catch (exception) {
        //
        // }

    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    fetch("data.json")
        .then(response => response.text())
        .then(data => {
            data = JSON.parse(data)
            tasksQueue = new TasksQueue(document.getElementsByClassName("queue")[0], data.tasks)
        })


    let mainSceneLayout = document.getElementsByClassName("main-scene")[0]
    let mainContentLayout = document.getElementsByClassName("main-content")[0]

    mainSceneLayout.addEventListener("onscroll", collapseAppBar())
    mainContentLayout.addEventListener("onscroll", collapseAppBar())
})


function collapseAppBar() {
    console.log(this)
}

function onCreateTaskIntent(element) {
    console.log("ddddddddddddd")
}

function submitTask(button) {
    pre
    console.log("geeddd")
}

function toggleTodoState(check) {
    // alert("here : "+getTodoItemView(check).innerHTML)
     
    // check.classList = "radio checked"
    // let todo = new Todo("ma super tache", "la description de ma super tache ...")
    // strTodo = JSON.stringify(todo)
    // let jsonTodo = JSON.parse(strTodo)
    // alert(new Todo(jsonTodo.title, jsonTodo.description).getSth())
}

function toggleDetails(button) {
    if (currentlyEditedItem !== null){
        // cancelEdition()
        alert("got you")
        return;
    }
    let todoItem = document.getElementById(getTodoItemViewId(button))
    let toggle =  todoItem.getElementsByTagName('input')[0]
    toggleItemsChecks(toggle)
    enableBtn(todoItem.getElementsByTagName('button'))
}

function toggleItemsChecks(currentCheck) {
    let checks = document.getElementsByName("todo-details-toggle")
    checks.forEach(check =>  {
        if (check !== currentCheck){
            check.checked = false
        }else {
            check.checked = !(check.checked)
        }
    })
}

function saveChanges(button){
    let todoItem = document.getElementById(getTodoItemViewId(button))
    let contentEditableToggle = todoItem.getElementsByTagName('input')[1]
    let titleField = todoItem.getElementsByClassName("title")[0]
    let descriptionField = todoItem.getElementsByClassName("description-container")[0]

    //todo try saving in idb before updating the view
    try{

    }catch (exception) {

    }
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
        removeClass(btns[i],["disabled"])
    }
}

function disableBtn(btns = []) {
    btns.forEach(btn => {
        btn.disabled = true
        addClass(btn,["disabled"])
    })
}

function addClass(element, classes) {
    let strClassList = element.classList.toString()
    classes.forEach(cls => {
        strClassList += " "+cls
    })
    element.classList = strClassList
}

function removeClass(element, givenClasses) {
    let eltClassList = element.classList
    let strClassList = ""
    givenClasses.forEach(givenClass => {
        eltClassList.forEach(eltClass => {
            if (givenClass !== eltClass) strClassList+= " "+eltClass
        })
    })
    element.classList = strClassList
}

function getTodoItemViewId(button) {
    let todoItemViewId = null
    if (button.parentElement.classList.toString() === "title-container"){
        todoItemViewId = ((button.parentElement).parentElement).getAttribute('id')
    }else{
        todoItemViewId = (((button.parentElement).parentElement).parentElement).getAttribute('id')
    }
    return todoItemViewId
}

class TasksQueue {
    constructor(queueLayout, tasks) {
        this.layout = queueLayout
        this.tasks = tasks
        this.renderTasks()
    }

    renderTasks(){
        this.tasks.forEach((task, index) => {
            this.layout.appendChild(new TasksItemViewHolder().bindViewHolder(task, index))
        })
    }


    getTask(index){
        return this.tasks[index]
    }

    setTask(todoObj){
        this.tasks.push(todoObj)
    }

    toggleTaskState(index){
        this.tasks[index].isCompleted = !(this.tasks[index].isCompleted)
        return true
    }

}

class TasksItemViewHolder {
    static TAKS_ITEM_VIEW_HOLDER_TEMPLATE = "<div id=\"task-item-id\" class=\"todo\">\n" +
        "                    <input name=\"todo-details-toggle\" type=\"checkbox\">\n" +
        "                    <input name=\"content-editable-toggle\" type=\"checkbox\">\n" +
        "                    <div class=\"title-container\">\n" +
        "                        <div onclick=\"toggleTodoState(this)\" class=\"radio\">\n" +
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

    createViewHolder(){
        let parser = new DOMParser()
        return  parser.parseFromString(TasksItemViewHolder.TAKS_ITEM_VIEW_HOLDER_TEMPLATE, "text/html").getElementById("task-item-id")
    }

    bindViewHolder(task, taskIndex){
        this.viewHolder.setAttribute('id', "task-item-"+taskIndex)
        if (task.isCompleted) this.viewHolder.getElementsByClassName("radio")[0].style = "background-color: black; transition: all ease-in-out .15s;"
        this.viewHolder.getElementsByClassName("title")[0].innerText = task.title
        this.viewHolder.getElementsByClassName("description-container")[0].innerText = task.description
        return this.viewHolder
    }
}

class Todo {
    constructor(title, description, isCompleted = false) {
        this.title = title
        this.description = description
        this.isCompleted = isCompleted
    }
}

class ModalDialog { //display the dialog
    constructor(todoItemId, layout = null, ) {
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
