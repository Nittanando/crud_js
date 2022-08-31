// global variables

const form = document.querySelector("form");
const table = document.querySelector("table");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const array = [];

// create-item function

const createItem = () => {
  const name = document.querySelector("#name").value;
  const quantity = document.querySelector("#quantity").value;
  const price = document.querySelector("#price").value;
  const total_price = document.querySelector("#total_price").value;
  let totalAmount = parseInt(quantity) * parseInt(price);
  total_price.value = totalAmount;

  console.log(totalAmount);

  const formData = {
    name,
    quantity,
    price,
    total_price,
  };

  array.push(formData);
  console.log(array);

  // using local storage API to store data

  try {
    if (localStorage.getItem("productList") === null) {
      localStorage.setItem("productList", JSON.stringify(array));
    } else {
      let storage = JSON.parse(localStorage.getItem("productList"));
      storage.push(formData);
      localStorage.setItem("productList", JSON.stringify(storage));
    }
  } catch (err) {
    console.error(err);
  }

  //   form validation

  if (name === "") {
    alert("item name can not be empty");
    document.querySelector("#name").focus();
    return;
  }

  if (quantity === "") {
    alert("item quantity can not be empty");
    document.querySelector("#quantity").focus();
    return;
  }

  if (price === "") {
    alert("item price can not be empty");
    document.querySelector("#price").focus();
    return;
  }

  if (total_price === "") {
    alert("item total amount can not be empty");
    document.querySelector("#total_price").focus();
    return;
  }
  window.location.reload();
};

// table-head function

const tableHead = (data) => {
  let ObjectKeys;
  for (let items of data) {
    ObjectKeys = Object.keys(items);
  }
  let row = document.createElement("tr");
  for (let key of ObjectKeys) {
    let heading = document.createElement("th");
    heading.innerText = key;
    row.appendChild(heading);
  }
  thead.appendChild(row);
  table.appendChild(thead);
};

// table-body function

const tableBody = (data) => {
  for (let items of data) {
    let ObjectKeys = Object.values(items);
    let row = document.createElement("tr");
    for (let values of ObjectKeys) {
      let cell = document.createElement("td");
      cell.innerText = values;
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  console.log(table);
};

// read function

const readItem = () => {
  const storage = JSON.parse(localStorage.getItem("productList"));
  if (storage && storage.length >= 1) {
    if (table.rows.length < 1) {
      tableHead(storage);
      tableBody(storage);
    }
  } else {
    return;
  }
};

// making table row clickable for edit functionality

table.onclick = () => {
  let row = table.rows;
  for (let i = 0; i < row.length; i++) {
    row[i].addEventListener("click", activateItem);
  }
};

// activate item function

function activateItem() {
  rowIndex = this.rowIndex;
  let name = document.querySelector("#name");
  let quantity = document.querySelector("#quantity");
  let price = document.querySelector("#price");
  let total_price = document.querySelector("#total_price");

  name.value = this.cells[0].innerText;
  quantity.value = this.cells[1].innerText;
  price.value = this.cells[2].innerText;
  total_price.value = this.cells[3].innerText;
}

// update item function

const updateItem = () => {
  const storage = JSON.parse(localStorage.getItem("productList"));
  const name = document.querySelector("#name").value;
  const quantity = document.querySelector("#quantity").value;
  const price = document.querySelector("#price").value;
  const total_price = document.querySelector("#total_price").value;
  let tableRowIndex = rowIndex - 1;

  // validation

  if (tableRowIndex) {
    if (name === "") {
      alert("item name can not be empty");
      document.querySelector("#name").focus();
      return;
    }

    if (quantity === "") {
      alert("item quantity can not be empty");
      document.querySelector("#quantity").focus();
      return;
    }

    if (price === "") {
      alert("item price can not be empty");
      document.querySelector("#price").focus();
      return;
    }

    if (total_price === "") {
      alert("item total amount can not be empty");
      document.querySelector("#total_price").focus();
      return;
    }

    let confirm = window.confirm(
      "Are you sure, you want to update this item ?"
    );

    if (confirm === true) {
      tableRowIndex &&
        storage.splice(tableRowIndex, 1, {
          name,
          quantity,
          price,
          total_price,
        });
      localStorage.setItem("productList", JSON.stringify(storage));
      console.log(storage);
      window.alert("item list has been updated");
      window.location.reload();
    } else {
      return;
    }
  } else {
    return;
  }
};

// delete function

const deleteItem = () => {
  let confirm = window.confirm("are you sure, you want to delete this item");
  if (confirm === true) {
    const storage = JSON.parse(localStorage.getItem("productList"));
    let tableRowIndex = rowIndex - 1;
    if (tableRowIndex) {
      tableRowIndex && storage.splice(tableRowIndex, 1);
      localStorage.setItem("productList", JSON.stringify(storage));
      window.location.reload();
      console.log(storage);
    } else {
      return;
    }
  } else {
    return;
  }
};
