const stringObject = localStorage.getItem ("todosList")

let todoItems =stringObject ? stringToArray(stringObject) : [] ;

const ulElement = document.getElementById("todolist");

function randerTodoList (ul, list) {
    cleanTodoList()
    for(let i=0; i<list.length; i++) {
        const todo = list[i]
        const liItems = generateTodoItem(todo, i);
        ulElement.appendChild(liItems)
    }
}

function cleanTodoList () {
    let ul = document.getElementById("todolist")
    while(ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
}


function generateTodoItem (item,index) {
    const liElement = document.createElement("li");
    const iElement = document.createElement("i");
    const divElement =document.createElement("div")
    const secDivElement =document.createElement("div")
    divElement.className= "todosList"
    secDivElement.className = "todosList"
    iElement.className = item.check ? "fa-solid fa-square-check" : "fa-solid fa-square";
    divElement.appendChild(iElement);
    const pElement = document.createElement("p");
    pElement.innerText = item.note;
    divElement.appendChild(pElement);
    divElement.addEventListener("click", function(){
        let item = todoItems[index]
        if(item.check === true) {
            item.check = false
        }else {
            item.check =true;
        }
        todoItems.slice(index,1,item);
        randerTodoList(ulElement, todoItems)
    })
    liElement.appendChild(divElement);
    const changeTodosElement = document.createElement("i");
    changeTodosElement.className = "fa-solid fa-pencil";
    const inputBtn = document.querySelector("#inputBtn")
    changeTodosElement.addEventListener("click", function() {
        const item = todoItems[index]
        inputBtn.value = item.note;
        inputBtn.className =`edit${index}`
        console.log(inputBtn.className)
    })
    secDivElement.appendChild(changeTodosElement);
    const trashElement = document.createElement("i");
    trashElement.className ="fa-solid fa-trash";
    trashElement.id = "trash" +index;
    secDivElement.appendChild(trashElement);
    liElement.insertAdjacentElement("beforeend",secDivElement)
    return liElement;
}

randerTodoList (ulElement, todoItems);

function createTodo (event) {
    if(event.keyCode === 13) {
        const {value} = event.target
        if(value === "") {
            return
        }

        if(event.target.className.includes("edit")) {
            let index =event.target.className.slice(4);
            todoItems = todoItems.map((item, i) => {
                if(+i === +index) {
                    console.log("I am here")
                    return {
                        note : value,
                        check : item.check,
                    };
                }
                return item;
            })
            randerTodoList(ulElement, todoItems)
            event.target.value = ""
        }else {
            const todoItem = {
                note: value,
                check : false
            }
            todoItems.push(todoItem);
            ulElement.appendChild(generateTodoItem(todoItem))
        }
        randerTodoList(ulElement, todoItems);
        event.target.value = "";
        inputBtn.className ="";
    }
}

function clickDelete (index) {
    todoItems = todoItems.filter((item, i) => i !== +index )
    randerTodoList (ulElement, todoItems);
}

document.addEventListener("click", function(event) {
    if(event.target.id.includes("trash")) {
        const index = event.target.id.slice(5);
        clickDelete(index);
    }
})

function saveStorage (event) {
    const stringTodo = objectToString(todoItems);
    window.localStorage.setItem("todosList",stringTodo);

}


function arrayToObject (arr) {
    let result = {};
    for(let i=0; i<arr.length; i++){
        const item = arr[i];
        result[i] = item
    }
    return result;
}

function objectToString (arr) {
    const result = arrayToObject(arr)
    return JSON.stringify(result);
}

function stringToArray (string) {
    const stringObj = JSON.parse(string)
    return Object.values(stringObj)
}

function clearTodo () {
    localStorage.clear()
    window.location.reload()
}