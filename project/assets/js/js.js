let inputToDoElem = document.getElementById("maininput");
let allRemove = document.getElementById("allremove");
let addNewToDoBtn = document.getElementById("mainbutton");
const theBasicInstructureOFTodos = document.getElementById("result");
let theElementModalRunner = document.getElementById("exampleModal");
const theDeleteButtonInModal = document.getElementById("delete-button");
const theCancelButtonInModal = document.getElementById("cancel-button");
const theCancelIconInModal = document.getElementById("close");
const theElementModalRunnerForDeleteAllToDos =
  document.getElementById("exampleModal2");
const theDeleteButtonInModalForAllToDos =
  document.getElementById("delete-button2");
const theCancelButtonInModalForAllToDos =
  document.getElementById("cancel-button2");
const theCancelIconInModalForAllToDos = document.getElementById("close2");
let Todos = [];

function createTamplateToDo(id, info) {
  let product = document.createElement("div");
  product.className =
    "col-sm-12 col-md-12 p-2 d-flex justify-content-between cusotm-wrapper-of-info shadow mb-2";
  product.setAttribute("data-count", id);
  let inputElem = document.createElement("input");
  inputElem.className =
    "text-muted p-2 border-0 custom-focus-visible flex-grow-1";
  inputElem.readOnly = true;
  inputElem.value = info;
  let procutDivElem = document.createElement("div");
  procutDivElem.className = "wrapper-of-buttons";
  let iElem1 = document.createElement("i");
  iElem1.className = "btn btn-danger fa fa-minus delete p-2 mx-2 mt-1";
  iElem1.setAttribute("onclick", "runTheModalForTodo (event)");
  iElem1.setAttribute("data-number", id);
  let iElem2 = document.createElement("i");
  iElem2.className = "btn btn-secondary fa fa-pen refactor p-2 mx-2 mt-1";
  iElem2.setAttribute("data-number", id);
  iElem2.setAttribute("onclick", "runRefactorTodo(event)");
  procutDivElem.append(iElem1, iElem2);
  product.append(inputElem, procutDivElem);
  theBasicInstructureOFTodos.append(product);
}
function theComfirmationToDosAfterRefresh() {
  let info = JSON.parse(localStorage.getItem("chorses"));
  if (info == null) {
    return;
  }

  info.forEach((element) => {
    createTamplateToDo(element.id, element.duty);
    Todos = info;
  });
}

function addItemsInToDoList() {
  let information = inputToDoElem.value;
  if (information == "" || information.length < 3) {
    inputToDoElem.classList.add("is-invalid");
  } else {
    let objInfo = {
      id: Todos.length,
      duty: information,
    };
    Todos.push(objInfo);
    createTamplateToDo(objInfo.id, objInfo.duty);
    localStorage.setItem("chorses", JSON.stringify(Todos));
    inputToDoElem.value = "";
  }
}

function removeAllItemToDo() {
  if (theBasicInstructureOFTodos.innerHTML == "") {
    return;
  } else {
    theElementModalRunnerForDeleteAllToDos.classList.add("show");
    theElementModalRunnerForDeleteAllToDos.style.display = "block";
    theCancelButtonInModalForAllToDos.addEventListener("click", function () {
      theElementModalRunnerForDeleteAllToDos.classList.remove("show");
      theElementModalRunnerForDeleteAllToDos.style.display = "none";
      return;
    });
    theCancelIconInModalForAllToDos.addEventListener("click", function () {
      theElementModalRunnerForDeleteAllToDos.classList.remove("show");
      theElementModalRunnerForDeleteAllToDos.style.display = "none";
      return;
    });
    theDeleteButtonInModalForAllToDos.addEventListener("click", function () {
      theBasicInstructureOFTodos.innerHTML = "";
      let infoOfLocal = JSON.parse(localStorage.getItem("chorses"));
      infoOfLocal = infoOfLocal.slice(-1, 0);
      Todos = infoOfLocal;
      localStorage.setItem("chorses", JSON.stringify(infoOfLocal));
      theElementModalRunnerForDeleteAllToDos.classList.remove("show");
      theElementModalRunnerForDeleteAllToDos.style.display = "none";
    });
  }
}
function fixTheNewValueOFRefactor(value, id) {
  console.log(value, id);
  Todos = JSON.parse(localStorage.getItem("chorses"));
  Todos[id].duty = value;
  localStorage.setItem("chorses", JSON.stringify(Todos));
  theBasicInstructureOFTodos.innerHTML = "";
  theComfirmationToDosAfterRefresh();
}

function runRefactorTodo(event) {
  let ElementOfRefactor = document.querySelector(
    `div[data-count = "${event.target.dataset.number}"] input`
  );
  ElementOfRefactor.readOnly = false;
  ElementOfRefactor.focus();
  let iElem3 = document.createElement("i");
  iElem3.className = "btn btn-success fa fa-check status p-2 mx-2 mt-1";
  iElem3.setAttribute("data-number", event.target.dataset.number);
  ElementOfRefactor.nextElementSibling.appendChild(iElem3);
  iElem3.classList.replace("btn-success", "btn-warning");
  iElem3.classList.replace("fa-check", "fa-gear");
  iElem3.addEventListener("click", function () {
    console.log(ElementOfRefactor.value, event.target.dataset.number);
    Todos = JSON.parse(localStorage.getItem("chorses"));
    // Todos[event.target.dataset.number] = ElementOfRefactor.value;
    Todos.forEach(function (element) {
      if (element.id == event.target.dataset.number) {
        element.duty = ElementOfRefactor.value;
        localStorage.setItem("chorses", JSON.stringify(Todos));
        theBasicInstructureOFTodos.innerHTML = "";
        theComfirmationToDosAfterRefresh();
        ElementOfRefactor.readOnly = true;
      } else {
        return;
      }
    });
  });
}

function deleteToDoList(event) {
  let indexOf = event.target.dataset.number;

  let Todos = JSON.parse(localStorage.getItem("chorses"));

  Todos = Todos.filter(function (item) {
    return item.id !== +indexOf;
  });
  Todos.forEach((element, index) => {
    element.id = index;
  });
  localStorage.setItem("chorses", JSON.stringify(Todos));
  theBasicInstructureOFTodos.innerHTML = "";
  theComfirmationToDosAfterRefresh();
  theElementModalRunner.classList.remove("show");
  theElementModalRunner.style.display = "none";
}
function runTheModalForTodo(event) {
  theElementModalRunner.classList.add("show");
  theElementModalRunner.style.display = "block";
  theCancelButtonInModal.addEventListener("click", function () {
    theElementModalRunner.classList.remove("show");
    theElementModalRunner.style.display = "none";
    return;
  });
  theCancelIconInModal.addEventListener("click", function () {
    theElementModalRunner.classList.remove("show");
    theElementModalRunner.style.display = "none";
    return;
  });
  theDeleteButtonInModal.addEventListener("click", function () {
    deleteToDoList(event);
  });
}

window.addEventListener("load", theComfirmationToDosAfterRefresh);
addNewToDoBtn.addEventListener("click", addItemsInToDoList);
document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    addItemsInToDoList();
  } else {
    return;
  }
});
allRemove.addEventListener("click", removeAllItemToDo);
