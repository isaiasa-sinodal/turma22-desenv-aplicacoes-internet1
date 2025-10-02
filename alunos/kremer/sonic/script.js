const sonic = document.querySelector(".sonic");
const obstacle = document.querySelector(".obstacle");

const jump = () => {
  sonic.classList.add("jump");

  setTimeout(() => {
    sonic.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const obstaclePosition = obstacle.offsetLeft;
  const sonicPosition = +window
    .getComputedStyle(sonic)
    .bottom.replace("px", "");

  if (obstaclePosition < 150 && sonicPosition < 80) {
    obstacle.style.animation = "none";
    obstacle.style.left = `${obstaclePosition}px`;

    sonic.style.animation = "none";
    sonic.style.left = `${sonicPosition}px`;

    sonic.src = "../images/sonic_over.png";
    sonic.style.width = "120px";
    sonic.style.marginLeft = "";
  }
}, 10);

document.addEventListener("keydown", jump);
