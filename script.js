'use strict';
//selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceE1 = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//starting condition

let scores, currentScore, activePlayer, playing;
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;


    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;


    diceE1.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
const switchplayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


init();

//rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1.generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2.display a dice
        diceE1.classList.remove('hidden');
        diceE1.src = `dice-${dice}.png`;
        //3.checked for roll 1 if true : 
        if (dice !== 1) {
            //add dice to score
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //then switch to next player
            switchplayer();
        }
    }
})
btnHold.addEventListener('click', function () {
    if (playing) {
        //1.add current score to active player

        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2.check if player's score is >=100
        if (scores[activePlayer] >= 20) {
            //finish game
            playing = false;
            diceE1.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //switch to next player
            switchplayer();
        }
    }

})
btnNew.addEventListener('click', init);