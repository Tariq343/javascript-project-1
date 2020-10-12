//difine UL element
let form = document.querySelector('#task_form');
let tasklist = document.querySelector('ul');
let clearbtn = document.querySelector('#clear_task_button');
let filter = document.querySelector('#task_filter');
let taskinput = document.querySelector('#new_task');

//define eventlisteners
form.addEventListener('submit', addTask);
tasklist.addEventListener('click', removeTask);
clearbtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

//define functions
//add task
function addTask(e) {
    e.preventDefault();
    if (taskinput.value === '') {
        alert('Add a task!');
    } else {
        //create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskinput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        tasklist.appendChild(li);

        storeTaskInLocalStorage(taskinputl.value);


        taskinput.value = '';
    }
    e.preventDefault();
}
//Remove Task
function removeTask(e) {
    if (e.target.hasAttribiute('href')) {
        if (confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            ele.remove();
            removeFromLS(ele);
        }
    }
}
//clear Task
function clearTask(e) {
    //tasklist.innerHTML = '';   

    //faster way
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }
    localStorage.clear();
}

//filter Task
function filterTask(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
//store in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push('tasks');
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task+ " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        tasklist.appendChild(li);
    });
}
function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}