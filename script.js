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

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playingState = true;

// console.log(player1);
score1El.textContent = 0;
score2El.textContent = 0;
dice.classList.add("hidden");

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

const confettiStart = () => {
  setTimeout(function () {});
};

rollDiceBtn.addEventListener("click", () => {
  if (playingState) {
    const randomRollDice = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `images/dice-${randomRollDice}.png`;

    if (randomRollDice !== 1) {
      currentScore += randomRollDice;
      document.querySelector(`.player-${activePlayer}-score`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", () => {
  if (playingState) {
    scores[activePlayer] += currentScore;

    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    // console.log(scores[activePlayer]);
    if (scores[activePlayer] >= 10) {
      playingState = false;
      dice.classList.add("hidden");

      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
      document.querySelector(`.player-${activePlayer}-score`).textContent = 0;
    } else {
      switchPlayer();
    }
  }
});

resetBtn.addEventListener("click", () => {
  reset();
});
