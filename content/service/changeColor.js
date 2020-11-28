
var timeBlock = document.getElementsByClassName("timeBlock");
function init() {
    for (var i = 0; i < timeBlock.length; i++) {
      timeBlock[i].addEventListener("click", handleClick);
    }
  }

function handleClick(event) {
  event.target.classList.add("clicked");
}

init();
