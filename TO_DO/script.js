document.querySelector("form").addEventListener("submit", handleSubmitForm);

function handleSubmitForm(e) {
  e.preventDefault();
  let input = document.querySelector("input");
  if (input.value != "") {
    addTodo(input.value);
  }
  input.value = "";
}

function addTodo(todo) {
  let ul = document.querySelector("ul");
  let li = document.createElement("li");

  li.innerHTML = `
    
    <span>${todo}</span>
            <span
              ><button><i class="bi bi-check-square"></i></button>
              <button><i class="bi bi-trash"></i></button>
            </span>
    
    `;

  // li.classList.add('')
  ul.appendChild(li);
}
