const dropZone = document.querySelector("#fileUpload");

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  console.log(e.dataTransfer.files);
  let files = e.dataTransfer.files;
  let fileListUl = document.querySelector(".file-list");

  for (const file of files) {
    let file_li = document.createElement("li");
    file_li.textContent = file.name;
    // fileListUl.appendChild(file_li);
    fileListUl.insertBefore(file_li, fileListUl.firstChild);
  }
});

const filePicker = document.querySelector("#input_file");

filePicker.addEventListener("change", (e) => {
  let filesThroughInput = e.target.files;
  let fileListUl = document.querySelector(".file-list");

  for (const file of filesThroughInput) {
    let file_li = document.createElement("li");
    file_li.textContent = file.name;
    // fileListUl.appendChild(file_li);
    fileListUl.insertBefore(file_li, fileListUl.firstChild);
  }
  let input = document.querySelector("#input_file");
  input.value = "";
});
