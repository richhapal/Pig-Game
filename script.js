'use strict';

let score1El = document.getElementById('score--1');
let score2El = document.getElementById('score--2');

const diceImg = document.getElementById('diceimage');
const btnNewgame = document.querySelector('.newgame');
const btnRollDice = document.querySelector('.rolldice');
const btnHold = document.querySelector('.holdscore');
const player1Active = document.querySelector('.player1');
const player2Active = document.querySelector('.player2');
const currentScore1 = document.querySelector('.currentScore-1');
const currentScore2 = document.querySelector('.currentScore-2');

//global scope variable

let playing, score, currentScore, activePlayer;

// strting condition

let init = function () {
  player1Active.classList.remove('winner');
  player2Active.classList.remove('winner');
  playing = true;
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  currentScore1.textContent = currentScore;
  currentScore2.textContent = currentScore;
  diceImg.classList.add('hidden');
  score1El.textContent = score[0];
  score2El.textContent = score[1];
  player1Active.classList.add('player-active');
  player2Active.classList.remove('player-active');
};

init();

// function player change condition
const changePlayer = function () {
  currentScore = 0;
  document.querySelector(`.currentScore-${activePlayer + 1}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1Active.classList.toggle('player-active');
  player2Active.classList.toggle('player-active');
};

// add active player class for active player
document
  .querySelector(`.player${activePlayer + 1}`)
  .classList.add('player-active');

// dice rolling functionality

btnRollDice.addEventListener('click', function () {
  if (playing) {
    // 1.generate random dice
    const diceRandom = Math.trunc(Math.random() * 6) + 1;
    // 2. Display random dice
    diceImg.classList.remove('hidden');
    diceImg.src = `./images/dice-${diceRandom}.png`;

    //3. Check Condition for dice 1 display
    if (diceRandom !== 1) {
      // add to current score
      currentScore += diceRandom;
      document.querySelector(`.currentScore-${activePlayer + 1}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
});

// get total score when we press hold score

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    score1El.textContent = score[0];
    score2El.textContent = score[1];
    // winning condtion
    if (score[activePlayer] >= 25) {
      document
        .querySelector(`.player${activePlayer + 1}`)
        .classList.add('winner');
      playing = false;
      document.querySelector(
        `.currentScore-${activePlayer + 1}`
      ).textContent = 0;
      diceImg.classList.add('hidden');
    } else {
      changePlayer();
    }
  }
});

btnNewgame.addEventListener('click', init);
