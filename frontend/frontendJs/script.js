document.addEventListener('DOMContentLoaded', ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
    storedTasks.forEach((task)=> tasks.push(task));}
    updateTaskList();
    updateStats();

})

let tasks = [];

const saveTask = () =>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim()

    if(!text) return;

    tasks.push({text: text, isCompleted:false});
    taskInput.value = '';
    saveTask();
    updateTaskList(); 
    updateStats();
}

const toggleTaskIsCompleted = (index) =>{
    tasks[index].isCompleted = !tasks[index].isCompleted;
    saveTask();
    updateTaskList();
    updateStats();
}

const deleteTask = (index) => {
    tasks.splice(index,1);
    saveTask();
    updateTaskList();
    updateStats();
}

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    saveTask();
    updateTaskList();
    updateStats();
}     

const updateStats = () => {
    const completedTasks = tasks.filter((task)=>task.isCompleted).length;
    const totalTasks =  tasks.length;
    const progress = tasks.length ===0 ? 0 : (completedTasks/totalTasks)*100;
    const progressBar = document.getElementById("progress");
    console.log(progress)
    progressBar.style.width = `${progress}%`;
    document.getElementById("numbers").innerHTML = `${completedTasks}/${totalTasks}`
    if(tasks.length && completedTasks === totalTasks){
        celeberation();
    }
}

const updateTaskList = () =>{
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''
    tasks.forEach((task,index) => {
        const ListItems = document.createElement('li');
        ListItems.innerHTML = `
        <div class = "taskItem">
            <div class = "task ${task.isCompleted ? "completed": ""}">
                <input type ="checkbox" class = "checckbox" ${task.isCompleted? "checked":""}/>
                <p>${task.text}</p> 
            </div> 
            <div class = "icons">
                <img src = "./assets/editIcon.png" onClick = "editTask(${index})" />
                <img src = "./assets/deleteicon.png" onClick = "deleteTask(${index})" /> 
            </div>
        </div>
        `;
        ListItems.addEventListener('change', () => toggleTaskIsCompleted(index))
        taskList.append(ListItems);

    })
}

document.getElementById('newTask').addEventListener('click', function(e){
e.preventDefault();

addTask();
});


// this code is copy from confetti.js.org website

// Tracks running confetti loops so repeat calls restart the effect
// instead of stacking several intervals on top of each other.
let activeIntervals = [];

const cleanupActiveEffects = () => {
  activeIntervals.forEach((id) => clearInterval(id));
  activeIntervals = [];
};

const celeberation = () => {
  if (typeof confetti !== "function") {
    console.warn("confetti library not loaded - skipping celebration");
    return;
  }

  cleanupActiveEffects();
const duration = 15 * 1e3,
  animationEnd = Date.now() + duration,
  defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0
  };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();
  if (timeLeft <= 0) return clearInterval(interval);
  const particleCount = 50 * (timeLeft / duration);
  confetti(Object.assign({}, defaults, {
    particleCount,
    origin: {
      x: randomInRange(.1, .3),
      y: Math.random() - .2
    }
  }));
  confetti(Object.assign({}, defaults, {
    particleCount,
    origin: {
      x: randomInRange(.7, .9),
      y: Math.random() - .2
    }
  }));
}, 250);
activeIntervals.push(interval);
}