const sonic = document.querySelector(".sonic");
const obstacle = document.querySelector(".obstacle");
const nuvens = document.querySelector(".nuvens");
const elemento = document.querySelector(".pontos");
const gameOver = document.querySelector(".game-over");

let animacaoRodando = false;
let sonicVivo = true;
document.addEventListener("keydown", (event) => {
  if (animacaoRodando || !sonicVivo) {
    reset();
    return;
  }
  if (event.code !== "Space") return;
  animacaoRodando = true;
  sonic.classList.add("jump");
  setTimeout(() => {
    sonic.classList.remove("jump");
    animacaoRodando = false;
  }, 500);
});

let loop = setInterval(() => {
  const obstaclePosition = obstacle.offsetLeft;
  const sonicPosition = sonic.offsetTop;
  const nuvensPosition = nuvens.offsetLeft;
  if (obstaclePosition <= 120 && obstaclePosition > 0 && sonicPosition >= 400) {
    matarSonic(obstaclePosition, nuvensPosition);
  }
}, 10);

function matarSonic(obstaclePosition, nuvensPosition) {
  sonic.setAttribute("src", "./images/sonic_over.png");
  obstacle.style.animation = "none";
  nuvens.style.animation = "none";
  obstacle.style.left = `${obstaclePosition}px`;
  nuvens.style.left = `${nuvensPosition}px`;
  gameOver.style.display = "flex";

  sonicVivo = false;
  clearInterval(loop);
}

let contador = 0;
let intervalPontos;

function iniciarContadorPontos() {
  if (intervalPontos) {
    clearInterval(intervalPontos);
  }
  intervalPontos = setInterval(() => {
    if (!sonicVivo) {
      clearInterval(intervalPontos);
      return;
    }
    elemento.innerHTML = contador++;
  }, 10);
}

iniciarContadorPontos();

function reset() {
  gameOver.style.display = "none";

  obstacle.style.removeProperty("left");
  obstacle.style.removeProperty("right");
  nuvens.style.removeProperty("left");
  nuvens.style.removeProperty("right");

  obstacle.style.animation = "moveObstacle 1.5s infinite linear";
  nuvens.style.animation = "moveNuvens 15s infinite linear";

  sonic.setAttribute("src", "./images/sonic.gif");
  contador = 0;
  elemento.innerHTML = contador;
  sonicVivo = true;
  animacaoRodando = false;

  iniciarContadorPontos();

  if (loop) {
    clearInterval(loop);
  }
  loop = setInterval(() => {
    const obstaclePosition = obstacle.offsetLeft;
    const sonicPosition = sonic.offsetTop;
    const nuvensPosition = nuvens.offsetLeft;
    if (
      obstaclePosition <= 120 &&
      obstaclePosition > 0 &&
      sonicPosition >= 400
    ) {
      matarSonic(obstaclePosition, nuvensPosition);
    }
  }, 10);
}
