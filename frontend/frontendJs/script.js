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
    console.log(tasks)  ;
    taskInput.value = '';
    updateTaskList(); 
    updateStats();
    saveTask();
}

const toggleTaskIsCompleted = (index) =>{
    tasks[index].isCompleted = !tasks[index].isCompleted;
    console.log(tasks);
    updateTaskList();
    updateStats();
    saveTask();
}

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTask();
}

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTask();
}     

const updateStats = () => {
    const completedTasks = tasks.filter((task)=>task.isCompleted).length;
    const totalTasks =  tasks.length;
    const progress = tasks.length ===0 ? 0 : (completedTasks/totalTasks)*100;
    const progressBar = document.getElementById("progress");
    console.log(progress)
    progressBar.style.width = `${progress}%`;
    document.getElementById("numbers").innerHTML = `${completedTasks}/${totalTasks}`
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
