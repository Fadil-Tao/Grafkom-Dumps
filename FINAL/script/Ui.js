const inputsContainer = document.getElementById("inputsContainer");
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }
  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
  const inputs = document.querySelectorAll(".inputs input");
  const select = document.getElementById("gantiObjek");
  const toggleButton = document.getElementById("toggleHideOpen");

  toggleButton.addEventListener("mousedown", function (e) {
    e.stopPropagation();
  });
  select.addEventListener("mousedown", function (e) {
    e.stopPropagation();
  });
  // Loop through each input and add an event listener to stop event propagation
  inputs.forEach((input) => {
    input.addEventListener("mousedown", function (e) {
      e.stopPropagation(); // Stop the propagation of the mousedown event
    });
  });
}

function dragWithPointer(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  elmnt.addEventListener("pointerdown", dragMouseDown);

  function dragMouseDown(e) {
    e.preventDefault();
    // get the pointer cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener("pointerup", closeDragElement);
    // call a function whenever the cursor moves:
    document.addEventListener("pointermove", elementDrag);
  }

  function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when pointer button is released:*/
    document.removeEventListener("pointerup", closeDragElement);
    document.removeEventListener("pointermove", elementDrag);
  }

  const inputs = document.querySelectorAll(".inputs input");
  const select = document.getElementById("gantiObjek");
  const toggleButton = document.getElementById("toggleHideOpen");

  toggleButton.addEventListener("pointerdown", function (e) {
    e.stopPropagation();
  });
  select.addEventListener("pointerdown", function (e) {
    e.stopPropagation();
  });
  // Loop through each input and add an event listener to stop event propagation
  inputs.forEach((input) => {
    input.addEventListener("pointerdown", function (e) {
      e.stopPropagation(); // Stop the propagation of the pointerdown event
    });
  });
}

const inputUi = document.getElementById("inputUi");
dragWithPointer(inputUi);
// dragElement(inputUi);

function hover(element, src) {
  element.setAttribute("src", `${src}`);
}

function unhover(element, src) {
  element.setAttribute("src", `${src}`);
}

let isOpen = true;

function toggleMenu() {
  isOpen = !isOpen;
  console.log(isOpen);
  if (isOpen) {
    inputsContainer.style.display = "flex";
  } else {
    inputsContainer.style.display = "none";
  }
}
