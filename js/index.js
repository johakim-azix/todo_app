
let currentlyEditedItem = null

document.addEventListener("DOMContentLoaded", ()=>{

})


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

class TodoQueue {
    constructor(queueLayout, todoArray) {
        this.layout = queueLayout
        this.todoArray = todoArray
    }

    getTodo(index){
        return this.todoArray[index]
    }

    setTodo(todoObj){
        this.todoArray.push(todoObj)
    }

    toggleTodoState(index){
        this.todoArray[index].isCompleted = !(this.todoArray[index].isCompleted)
        return true
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
