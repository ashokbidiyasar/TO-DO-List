const inputbox = document.getElementById("todo-input");
const listContainer = document.getElementById("list-container");

// Load data on page load
showlist();

function addtask() {
    if (inputbox.value === "") {
        alert("Please enter a task");
    } else {
        let li = document.createElement("li");
        let p = document.createElement('p');
        p.innerHTML = inputbox.value;
        p.classList.add("wrap");
        li.classList.add("li-inner-container");
        listContainer.appendChild(li);

        let span1 = document.createElement("span");
        span1.innerHTML = '<i class="fa-solid fa-circle-check icon"></i>';
        let span2 = document.createElement("span");
        span2.innerHTML = '<i class="fa-solid fa-circle-xmark c-icon"></i>';
        span2.classList.add("delete");

        li.prepend(span1); 
        li.appendChild(p);
        li.appendChild(span2); 

        addEventListeners(li); // Add event listeners to new item
        SaveData();
    }
    inputbox.value = "";
}

function addEventListeners(li) {
    li.addEventListener("click", function(e) {
        if (e.target.closest(".delete")) return;

        li.classList.toggle("checked"); 
        const icon = li.querySelector(".icon");

        if (icon.classList.contains("fa-circle")) {
            icon.classList.replace("fa-circle", "fa-circle-check");
            icon.classList.replace("fa-regular","fa-solid");
        } else {
            icon.classList.replace("fa-circle-check", "fa-circle");
            icon.classList.replace("fa-solid", "fa-regular");
        }
        SaveData();
    });

    li.querySelector(".delete").addEventListener("click", function(e) {
        e.stopPropagation(); 
        li.remove();
        SaveData();
    });
}

function SaveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showlist(){
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
        // Add event listeners to all existing items
        document.querySelectorAll("#list-container li").forEach(li => {
            addEventListeners(li);
        });
    }
}