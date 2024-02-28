const nav = document.querySelector("nav"),
  toggleBtn = document.querySelector(".toggle-btn");

const clicks = document.querySelectorAll("nav span a");
toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});



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
  // Select all input elements within the ".inputs" container
  const inputs = document.querySelectorAll(".inputs input");

  // Loop through each input and add an event listener to stop event propagation
  inputs.forEach((input) => {
    input.addEventListener("mousedown", function (e) {
      e.stopPropagation(); // Stop the propagation of the mousedown event
    });
  });
}

const inputUi = document.getElementById("inputUi");
dragElement(inputUi);
