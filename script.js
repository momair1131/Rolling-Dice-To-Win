// import JSConfetti from "js-confetti";

const score1El = document.querySelector("#score-0");
const score2El = document.querySelector("#score-1");
const dice = document.querySelector(".dice-img");
const resetBtn = document.querySelector(".reset");
const rollDiceBtn = document.querySelector(".roll-dice");
const holdBtn = document.querySelector(".hold");
const currentP1Score = document.querySelector(".player-0-score");
const currentP2Score = document.querySelector(".player-1-score");
const player1 = document.querySelector(".player-0");
const player2 = document.querySelector(".player-1");
let canvas = document.createElement("canvas");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playingState = true;

// const jsConfetti = new JSConfetti({ canvas });

// jsConfetti.addConfetti();

// console.log(player1);
score1El.textContent = 0;
score2El.textContent = 0;
dice.classList.add("hidden");
canvas.classList.add("canvas");

function switchPlayer() {
  document.querySelector(`.player-${activePlayer}-score`).textContent = 0;
  currentScore = 0;
  //document.getElementById("myDIV").style.transition = "all 2s";

  if (activePlayer === 0) {
    activePlayer = 1;
  } else activePlayer = 0;

  player1.classList.toggle("player-active");

  player2.classList.toggle("player-active");
}

const reset = () => {
  playingState = true;
  score1El.textContent = 0;
  score2El.textContent = 0;
  currentP1Score.textContent = 0;
  currentP2Score.textContent = 0;
  dice.classList.add("hidden");
  player1.classList.remove("winner");
  player2.classList.remove("winner");
  player1.classList.add("player-active");
  player2.classList.remove("player-active");
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
};

// CONFETTI SETTING OVERIDE
const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  // shapes: ["heart"],
  // colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
};
// const count = 500,
//   defaults = {
//     origin: { y: 0.7 },
//   };

// function fire(particleRatio, opts) {
//   confetti(
//     Object.assign({}, defaults, opts, {
//       particleCount: Math.floor(count * particleRatio),
//     })
//   );
// }

rollDiceBtn.addEventListener("click", () => {
  if (playingState) {
    const randomRollDice = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `images/dice-${randomRollDice}.png`;

    if (randomRollDice !== 1) {
      currentScore += randomRollDice;
      document.querySelector(`.player-${activePlayer}-score`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", () => {
  if (playingState) {
    scores[activePlayer] += currentScore;

    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    // console.log(scores[activePlayer]);
    if (scores[activePlayer] >= 10) {
      playingState = false;
      dice.classList.add("hidden");
      // canvas = document.querySelector(`.player-${activePlayer}`);

      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
      document.querySelector(`.player-${activePlayer}`).classList.remove("player-active");
      document.querySelector(`.player-${activePlayer}-score`).textContent = 0;
      document.querySelector(`.player-${activePlayer}`).appendChild(canvas);
      // const jsConfetti = new JSConfetti(canvas);
      // const jsConfetti = new JSConfetti({ canvas });
      canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });
      canvas.confetti({
        spread: 80,
        origin: { y: 1.2 },
        particleCount: 300,
        scalar: 1,
        // colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
      });
      // confetti({
      //   // ...defaults,
      //   particleCount: 500,
      //   scalar: 2,
      // });

      // confetti();
    } else {
      switchPlayer();
    }
  }
});

resetBtn.addEventListener("click", () => {
  reset();
});
