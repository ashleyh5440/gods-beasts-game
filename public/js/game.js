// user has 10 cards
let numCards = 10;

//tally wins, loses and ties
let wins = 0;
let ties = 0;
let losses = 0;

// final score
// let finalScore = userLifePoints

//each player begins with 10000 life points!
let userLifePoints = 10000;
let computerLifePoints = 10000;

// game over screen headers
let youWon = "You win";
let youLose = "Defeat";

//show the user the life points
document.querySelector('.opponent-life-points p').textContent = computerLifePoints
document.querySelector('.user-life-points p').textContent = userLifePoints
document.querySelector('.win').textContent = wins
document.querySelector('.losses').textContent = losses
document.querySelector('.ties').textContent = ties

// For each card in play, get the attack and defend points
let userAttack;
let userDefend;

let compAttack;
let compDefend;


document.querySelector(".user-deck-container").addEventListener('click', userPickCard)
function userPickCard(e) {
    const elid = e.target.closest(".user-card").id
    const card = document.getElementById(elid)

    document.querySelector(".user-deck-container").removeEventListener("click", userPickCard)
    userAttack = card.querySelectorAll('.points-mini p')[0].dataset.attack;
    userDefend = card.querySelectorAll('.points-mini p')[1].dataset.defense
    console.log('user card points', userAttack, userDefend);
    addAttackDefendListener()
    moveCard(card);
    // remove the old card from the DOM
    card.remove()
    showAttackDefendBtns()
}

//move card to the center
function moveCard(card) {
    const userCardSection = document.querySelector('.user-card'); //move the card to the user-card div
    userCardSection.appendChild(card.cloneNode(true)); //append a clone of the card
    //show the attack and defend buttons
    document.querySelector('.button-container').classList.remove('hidden')

};

const addAttackDefendListener = () => {
    console.log("attack-defend listener back on");
    document.getElementById('defendButton').addEventListener('click', defend);
    document.querySelector('#attackButton').addEventListener('click', attack);
}

const attack = async () => {
    await getNewComputerCard()
    userCardPlay("attack")
    removeAttackDefendListener()
}
const defend = async () => {
    await getNewComputerCard()
    userCardPlay("defend")
    removeAttackDefendListener()
}

const removeAttackDefendListener = () => {

    document.getElementById('defendButton').removeEventListener('click', defend);
    document.querySelector('#attackButton').removeEventListener('click', attack);
}

function showAttackDefendBtns() {
    document.querySelector('.button-container').classList.remove('hidden')

};

//user plays attack or defense from that card
const userCardPlay = (userChoice) => {

    numCards--;
    console.log("numcards", numCards);
    //TODO THIS CODE NEEDS REFACTORING FOR VERBOSITY and NOT DRY

    const computerActionChoice = Math.random() < 0.5 ? 'attack2' : 'defend2';
    console.log('computer chose to:', computerActionChoice);

            // user attacks, computer attacks
    if (userChoice === 'attack') {
        console.log('You chose to attack!');
        console.log("your attack points:", userAttack)
        
        if (computerActionChoice === 'attack2') {
            if (userAttack > compAttack) {
                wins++

                computerLifePoints -= userAttack 
                console.log(typeof userLifePoints, typeof compAttack)
               userLifePoints += compAttack; //i added this
                document.querySelector('.opponent-life-points p').textContent = computerLifePoints
                document.querySelector('.user-life-points p').textContent = userLifePoints

            } else if (userAttack === compAttack) {
                ties++
                console.log("you tie")
            } else { //userAttack < compAttack
                losses++
                console.log("you lose")
                userLifePoints -= compAttack
                computerLifePoints = parseInt(computerLifePoints) + parseInt(userAttack); //i added this
                document.querySelector('.opponent-life-points p').textContent = computerLifePoints
                document.querySelector('.user-life-points p').textContent = userLifePoints

            }
            // user attacks, computer defends
        } else if (computerActionChoice === "defend2") {

            if (userAttack > compDefend) {
                wins++
                console.log("you win");
                computerLifePoints -= userAttack
                document.querySelector('.opponent-life-points p').textContent = computerLifePoints
                document.querySelector('.user-life-points p').textContent = userLifePoints
                
            } else if (userAttack === compDefend) {
                ties++
                console.log("you tie")
            } else { //userAttack < compDefend
                losses++
                console.log("you lose")
                userLifePoints -= Math.floor(userAttack / 2); //i added this
                document.querySelector('.opponent-life-points p').textContent = computerLifePoints
                document.querySelector('.user-life-points p').textContent = userLifePoints

            }

        }
        //user defends, computer attacks
    } else if (userChoice === 'defend') {
        console.log('You chose defend!');
        if (computerActionChoice === 'attack2') {

            if (userDefend > compAttack) {
                wins++
                console.log("you win");
                // computerLifePoints -= userDefend
                computerLifePoints -= Math.floor(compAttack / 2); //i added this
                document.querySelector('.opponent-life-points p').textContent = computerLifePoints
                document.querySelector('.user-life-points p').textContent = userLifePoints

            } else if (userDefend === compAttack) {
                ties++
                console.log("you tie")
            } else { //userDefend < compAttack
                losses++
                console.log("you lose")
                userLifePoints -= compAttack
                document.querySelector('.opponent-life-points p').textContent = computerLifePoints
                document.querySelector('.user-life-points p').textContent = userLifePoints

            }
            //computer defends, user defends
            //if both choose defend, i think it should be a tie/retreat
        } else if (computerActionChoice === "defend2") {

            if (userChoice === 'defend' )

            if (userDefend > compDefend) {
                wins++
                console.log("you win");
                computerLifePoints -= userDefend
                document.querySelector('.opponent-life-points p').textContent = computerLifePoints
                document.querySelector('.user-life-points p').textContent = userLifePoints

            } else if (userDefend === compDefend) {
                ties++
                console.log("you tie")
            } else { //userDefend > compDefend
                losses++
                console.log("you lose")
                userLifePoints -= compDefend
                document.querySelector('.opponent-life-points p').textContent = computerLifePoints
                document.querySelector('.user-life-points p').textContent = userLifePoints

            }
        }

    }

    setTimeout(() => {
        document.querySelector(".user-deck-container").addEventListener('click', userPickCard)
        document.querySelector(".user-card").innerHTML = ""
        document.querySelector(".opponent-card").innerHTML = ""
        checkGameStatus()

    }, 3000)
    document.querySelector('.win').textContent = wins
    document.querySelector('.losses').textContent = losses
    document.querySelector('.ties').textContent = ties

};


const getNewComputerCard = async () => {
    return new Promise(async (resolve, reject) => {
        const cardData = await fetch("/api/cards")
        const computerCard = await cardData.json()
        if (cardData.ok) {

            compAttack = computerCard.attack_points;
            compDefend = computerCard.defense_points

            const html = ` <div class="card-mini computer-card" id="${computerCard.id}">
            <div class="god-card-mini card-mini">
            <div class="card-content">
            <div class="name-class">
              <h3>${computerCard.name}</h3>
            </div>
            <div class="points-mini">
            <p id="comp-attack" data-attack="${computerCard.attack_points}">Attack: ${computerCard.attack_points}</p>
            <p id="comp-defend" data-defense="${computerCard.defense_points}">Defend: ${computerCard.defense_points}</p>
            </div>
            </div>
            </div>
            </div>`
            document.querySelector(".opponent-card").innerHTML = html
            resolve()
        } else {
            reject()
        }
    })

}
    // game status
function checkGameStatus() {
    if (userLifePoints <= 0) {
        document.getElementById("lose-sound").play();
        alert("game over. you lose")
    }else if (computerLifePoints <= 0) {
        document.getElementById("win-sound").play();
        alert("game over, you won!!")
    } else if (numCards === 0 && userLifePoints > computerLifePoints) {
        document.getElementById("win-sound").play();
        alert("game over, you win!!")
    } else if (numCards === 0 && userLifePoints < computerLifePoints) {
        document.getElementById("lose-sound").play();
        alert("game over, lose")
    }
}

//game over screen
// const gameOverScreen = `<section class="game-over hidden">
// <br>
// <h2 style="font-family: 'Italianno', cursive;"id= "game-over-heading">${}</h2>
// <h3 style="font-family: inherit;">Game Over</h3>
// <p>${finalScore}</p> 
// <button type="button" class="btn btn-primary" id="game-screen-new-game">New Game</button>
// <a href="/">
// <button type="button" class="btn btn-primary" id="game-screen-home">Home</button>
// </a>
// </section>`


//reset game
const resetGame = () => {
    userLifePoints = 10000;
    computerLifePoints = 10000;
    wins = 0;
    ties = 0;
    losses = 0;
    // gameState = 'userTurn';  // change game state to user turn.
    // saveScores();
};

const saveScores = async (wins, losses, highScore) => {
    const scores = {
        wins,
        losses,
        highScore,
    };

    try {
        const response = await fetch('/api/users', {
            method: 'PUT',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scores),
        });
        if (response.ok) {
            console.log('Scores saved successfully!');
        } else {
            console.error('Failed to save scores.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


const loadScores = async () => {
    try {
        const response = await fetch(`/api/users`);
        if (response.ok) {
            const data = await response.json();
            console.log('Scores loaded:', data);
            //update
            wins = data.wins;
            losses = data.losses;
            highScore = data.highScore;
        } else {
            console.error('Failed to load scores');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

addAttackDefendListener()
