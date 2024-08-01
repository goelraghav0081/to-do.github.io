        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        let list = [];

        document.addEventListener('DOMContentLoaded', loadTasks);

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

        function addTask(text) {            const taskId = `task-${Date.now()}`;
            const task = { id: taskId, text, isCompleted:false};
            list.push(task);
            saveTasks();
            createElements(task);
        }

        function createElements(task) {
            const li = document.createElement('li');
            li.className = 'task';
            li.id = task.id;

            const span = document.createElement('span');
            span.textContent = task.text;
            if (task.isCompleted) {
                span.classList.add('completed');
            }
            li.appendChild(span);

            const div = document.createElement('div');
            li.appendChild(div);
            div.classList.add("div");

            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.className = 'input';
            input.checked = task.isCompleted;
            input.style.cursor="pointer";

            input.addEventListener('change', () =>{
                completed(task.id)
            });
            div.appendChild(input);

            const edit = document.createElement('p');
            edit.innerHTML="Edit";
        
            edit.style.color="black";
            edit.style.cursor="pointer";
            edit.addEventListener('click',()=>{
                editTask(task.id);
            });
            div.appendChild(edit);


            const button = document.createElement('button');
            button.innerText = 'X';
            button.style.color = 'red';
            button.style.backgroundColor = 'transparent';
            button.style.border = 'none';
            button.style.cursor="pointer";
            button.addEventListener('click', ()=>{
                deleteTask(task.id)
            });

            div.appendChild(button);

            taskList.appendChild(li);
        }

        function deleteTask(taskId) {
            // delete from local storage
            list = list.filter(task => task.id !== taskId);
            saveTasks();
            const li = document.getElementById(taskId);
            if (li) {
                // delete from taskList
                taskList.removeChild(li);
            }
        }

        function completed(taskId) {
            const task = list.find((task) => task.id === taskId);
            if (task) {
                task.isCompleted = !task.isCompleted;
                const span = document.querySelector(`#${taskId} span`);
                if (span) {
                    span.classList.toggle('completed', task.isCompleted);
                }
                saveTasks();
            }
        }
        function editTask(taskId) {
            const task = list.find((task) => task.id === taskId);
            if (task) {
                const li = document.getElementById(task.id);
                const span = li.querySelector('span');
                
                const input = document.createElement('input');
                input.type = 'text';
                input.value = task.text;
                input.className = 'edit-input';
                
                span.replaceWith(input);
        
                input.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        task.text = input.value;
                        saveTasks();
                        input.replaceWith(span);
                        span.textContent=task.text;
                        // createElements(task);
                        // li.remove();
                    }
                });
        
                // input.focus();
            }
        }
        

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(list));
        }

        function loadTasks() {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                list = JSON.parse(savedTasks);
                list.forEach(task => createElements(task));
            }
        }
    // localStorage.clear();