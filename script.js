const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const text = taskInput.value;
      if (text) {
        addTask(text);
        taskInput.value = '';
      }
    }
    
  });
let i=0;
let list=[];
function addTask(text){
    const li = document.createElement('li');
    taskList.appendChild(li);
    li.className = 'task';
    li.id=`li-${i}`;
    
    const span = document.createElement('span');
    span.textContent=text;
    li.appendChild(span);
    span.id=`span-${i}`;

    // span.classList.add("span");

    
    const div = document.createElement('div');
    div.id=`div-${i}`;
    li.appendChild(div);
    let divid=div.id;
    div.classList.add("div");
    

    const input = document.createElement('input');
    input.setAttribute("type","checkbox");
    input.class="input";
    div.appendChild(input);
    input.id=`input-${i}`;
    input.setAttribute("onclick",`completed(id)`);


    const button = document.createElement('button');
    button.innerText="X";
    button.style.color="red";
    button.style.backgroundColor="transparent";
    button.style.border=0;
    div.appendChild(button);
    button.id=`${i}`;
    // let id =button.id;
    button.setAttribute("onclick",`deleteTask(id)`);
    button.classList.add("button");
    list.push(input);
    i++;

}
function deleteTask(e){
    let id=`li-${e}`;
    let li=document.getElementById(id);
    console.log(id);
    taskList.removeChild(li);
    
}
console.log(list);

function completed(e){
    for(let i=0;i<list.length;i++){
        if(e==list[i].id){

            let span_id=`li-${i}`;
            let span=document.getElementById(span_id);
            if (span) {
                span.classList.toggle("completed");
            }
            break;
        }
    }
    
}

