const box1 = document.querySelector("#box1"); //dino
const box2 = document.querySelector("#box2"); //cactus
const score = document.querySelector("#score");
const pause = document.querySelector("#pause");

let yDistance = 0;
let scoreNo = null;
let play = false;
let intervalId = null;
let timerId = null;
let jumpHeight = 10;
const jumpPeak = -210;

window.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    if (!timerId) {
      timerId = setInterval(jump, 20);

      if (!play) {
        scoreNo = 0;
        score.innerText = scoreNo;
        play = true;
        setTimeout(toff, 500);
      }
      if (intervalId == null) {
        intervalId = setInterval(setScore, 300);
      }
    }
  }
});

function checkCollision() {
  const rect1 = box1.getBoundingClientRect();
  const rect2 = box2.getBoundingClientRect();

  const isColliding = !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
  if (isColliding) {
    toff();
    clearInterval(intervalId);
    intervalId = null;
    play = false;
  }
}

function reset() {
  yDistance -= jump;
  box1.style.bottom = `${yDistance}px`;
}

function setScore() {
  scoreNo++;
  score.innerText = scoreNo;
  checkCollision();
}

function toff() {
  pause.classList.toggle("hidden");
  box2.classList.toggle("cactus");
}

//For jumping of dinosaur
const jump = () => {
  if (jumpHeight !== jumpPeak) {
    jumpHeight -= 20;
    box1.style.top = `${jumpHeight}px `;
  } else {
    clearInterval(timerId);
    timerId = setInterval(land, 35);
  }
};

//For landing dinosaur
const land = () => {
  if (jumpHeight < 10) {
    jumpHeight += 20;
    box1.style.top = `${jumpHeight}px `;
  } else {
    clearInterval(timerId);
    jumpHeight = 10;
    setTimeout(() => {
      timerId = null;
    }, 220);
  }
};
