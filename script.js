const tasks = document.querySelector(".tasks");
const clearAllButton = document.querySelector(".clear-all");
const searchForm = document.querySelector(".search-container");
const addForm = document.querySelector(".add_task");

const increaseTask = () => {
  const total = tasks.querySelectorAll("li");
  document.querySelector(".total-task").innerText = `You have ${
    total.length
  } unfinished ${total.length <= 1 ? "task" : "tasks"}`;
};

const filterTerm = (value) => {
  // const total = tasks.querySelectorAll('li');
  // if(value.length !== 0){
  //     for(let i = 0;i<total.length;i++){
  //         const innertext = total[i].querySelector('.task').innerText
  //         if(!(innertext.toLowerCase().includes(value.toLowerCase())))
  //             total[i].style.display = 'none'

  //     }
  // }else{
  //     total.forEach((element)=>{
  //         element.style.display = 'flex'
  //     })
  // }
  Array.from(tasks.children)
    .filter((task) => !task.textContent.toLowerCase().includes(value.toLowerCase()))
    .forEach((task) => task.classList.add("hide"));

  Array.from(tasks.children)
    .filter((task) => task.textContent.toLowerCase().includes(value.toLowerCase()))
    .forEach((task) => task.classList.remove("hide"));
};

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = addForm.task.value.trim();
  if (task.length !== 0) {
    let html = `
            <li class="task-card task-to-do">
                <span class="task">${task}</span>
                <span class="delete"><i class="fas fa-trash"></i></span>
            </li>
        `;
    document.querySelector(".tasks").innerHTML += html;
    addForm.task.value = "";
    increaseTask();
  }
});

tasks.addEventListener("click", (event) => {
  console.log(event.target.nodeName);
  if (event.target.nodeName === "I") {
    event.target.parentElement.parentElement.remove();
    increaseTask();
  }
});

clearAllButton.addEventListener("click", (event) => {
  const tasksToDo = tasks.querySelectorAll("li");
  tasksToDo.forEach((task) => {
    tasks.removeChild(task);
  });
  document.querySelector(".total-task").innerText = `No task left to do`;
});

searchForm.addEventListener("keyup", (event) => {
  event.preventDefault();
  const value = searchForm.term.value.trim();
  filterTerm(value);
});


searchForm.addEventListener('click',(event)=>{
    event.preventDefault();
    console.log(event.target.classList)
    if(event.target.classList.contains('clear-search')){
        searchForm.reset()
        const value = searchForm.term.value.trim();
        filterTerm(value);
    }
    
})