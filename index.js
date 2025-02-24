document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks=JSON.parse(localStorage.getItem('tasks'));

if(storedTasks){
    storedTasks.forEach((task)=>tasks.push(task));
    updateTaskList();
    updateStats();
}
})

let task=[];

const saveTasks=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const addTask=()=>{
    const taskInput=document.getElementById("taskInput");
    let text=taskInput.value.trim();

    if(text){
        task.push({text:text,status:false});
        taskInput.value="";
        updateTaskList();
        updateStats();
        saveTasks();
    }
    console.log(task);

    
}

const toggleTaskComplete=(index)=>{
    task[index].completed=!task[index].completed;
    console.log(task);
    updateStats();
    saveTasks();
}
const deleteTask=(index)=>{
    task.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}
const editTask=(index)=>{
 const taskInput=   document.getElementById("taskInput");
 taskInput.value=task[index].text;
 task.splice(index,1);
 updateTaskList();
 updateStats();
 saveTasks();
};

const updateStats=()=>{
    const completeTasks=tasks.filter(task=>task.completed).length;
    const totalTasks=tasks.length;
    const progress=(completeTasks/totalTasks)*100;
    const progressBar =document.getElementById('progress');
    progressBar.style.width=`${progress}%`;

    document.getElementById("numbers").innerText=`${completeTasks}/${totalTasks}`;

    if(tasks.length && completeTasks===totalTasks){
        blastConfetti();

    }
}

const updateTaskList=function(){
    const taskList=document.getElementById("task-list");
    taskList.innerHTML="";

    task.forEach((tasks,index)=>{
        const listItem=document.createElement("li");

        listItem.innerHTML=`
        
        <div class="taskItem">  
            <div class="task  ${tasks.completed?"completed":""}">
              <input type="checkbox" class="checkbox ${tasks.completed?"checked":""}"/>
              <p>${tasks.text} </p>
            </div> 
            <div class="icons">
               <img src="img\edit.png" onClick="editTask(${index})">
               <img src="img\bin.png" onClick="deleteTask(${index})">
            </div>
         </div>
        `;
        listItem.addEventListener("change",()=>toggleTaskComplete(index));
        taskList.appendChild(listItem);
    })
}

document.getElementById("newTask").addEventListener("click",function(event){
   event.preventDefault();
   addTask();
   document.getElementById("taskInput").value="";
});



const blastConfetti=()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}