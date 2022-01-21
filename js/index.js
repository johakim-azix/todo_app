



function scrolled(divElement){
    console.log("old_scroll : "+this.oldScroll)
}
function desplayDetails(todoItem) {
    console.log("item clicked : "+this.currentTarget)
}

document.addEventListener("DOMContentLoaded" , ()=>{

    let todoItems = document.getElementsByClassName("todo")
    for (let i =0; i < todoItems.length; i++){
        todoItems[i].addEventListener('click', (element)=>{
            console.error(JSON.stringify(element.target))
            // if(element.target !== element.currentTarget) console.log("child clicked")
            // else console.log("parent clicked")
        })
    }
    return;
    document.getElementsByClassName("todo").forEach((todoItem, index) => {
        todoItem.addEventListener('click', (element)=>{
            if(element.target !== element.currentTarget) console.log("child clicked")
            else console.log("parent clicked")
        })
    })
})

document.getElementsByClassName("todo").forEach((todoItem, index) => {
    todoItem.addEventListener('click', (element)=>{
        console.error(element.currentTarget)
        // if (element.currentTarget)
        // if(element.target !== element.currentTarget) console.log("child clicked")
        // else console.log("parent clicked")
    })
})

function radioClicked(radio) {
    console.log("radio clicked")
}

// window.onscroll(()=>{
//     alert("hhdhhhf")
// })


// $(window).scroll(function(){
//     $(".top").css("opacity", 1 - $(window).scrollTop() / 250);
// });

/*win.scroll(function(){
  scrollPosition = win.scrollTop();
  scrollRatio = 1 - scrollPosition / 300;
  $(".top").css("opacity", scrollRatio);
*/





/*$(window).scroll(function(){
    var scrollVar = $(window).scrollTop();
    $('.top').css("opacity", 1 - scrollVar/300);
})*/



