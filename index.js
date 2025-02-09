let task=[];

const addTask=()=>{
    const taskInput=document.getElementById("taskInput");
    let text=taskInput.value.trim();

    if(text){
        task.push({text:text,status:false});
    }
    console.log(task);

    updateTaskList();
}

const toggleTaskComplete=(index)=>{
    task[index].completed=!task[index].completed;
    console.log(task);
}
const deleteTask=(index)=>{
    task.splice(index,1);
    updateTaskList();
}
const editTask=(index)=>{
 const taskInput=   document.getElementById("taskInput");
 taskInput.value=task[index].text;
 task.splice(index,1);
 updateTaskList();
};

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
