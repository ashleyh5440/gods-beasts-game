//tally wins, loses and ties
let wins = 0;
let ties = 0;
let losses = 0;

//each player begins with 10000 life points!
let userLifePoints = 10000;
let computerLifePoints = 10000;

let characterData = []

//  user card points
let userAttack = 0;
let userDefend = 0;

//  computer card points
let computerAttack = 0;
let computerDefend = 0;

// api call to pull defense points from cards
async function getDefensePoints() {
    try {
        const response = await fetch("/api/cards", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const dataDefense = await response.json();
            return dataDefense;
        } else {
            console.error('Failed to fetch points');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchDefenseData() {
    try {
        characterData = await getDefensePoints();
        if (characterData) {
            console.log('Fetched data');
        } else {
            console.log('Failed to fetch data')
        }
    } catch (err) {
        console.error('error', err);
    }
}

fetchDefenseData();

getDefensePoints();

// api call to pull attack points from cards
async function getAttackPoints() {
    try {
        const response = await fetch("/api/cards", {
            method: 'GET',
        });

        if (response.ok) {
            const dataAttack = await response.json();
            return dataAttack;
        } else {
            console.error('Failed to fetch points');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

//   function to save data
async function fetchAttackData() {
    try {
        characterData = await getAttackPoints();
        if (characterData) {
            console.log('Fetched data');
        } else {
            console.log('Failed to fetch data');
        }
    } catch (err) {
        console.error('error', err);
    }
}

fetchAttackData();

getAttackPoints();

//move user card to the center
function moveCard(card) {
    const userCardSection = document.querySelector('.user-card'); //move the card to the user-card div
    // centerSection.innerHTML = ''; //clear the center section
    userCardSection.appendChild(card.cloneNode(true)); //append a clone of the card
    console.log('before hidden class');
};

//computer moves card
function moveComputerCard() {
   
    document.querySelector('.button-container').classList.remove('hidden')
    console.log('after hidden class');
    //add event listenters for each card
    document.querySelector('#attackButton').addEventListener('click', function () {
        // computerChooseAction('attack');
        // document.querySelector(".computer-card").classList.remove('hidden');
    });
};

//define a game state variable
let gameState = 'userTurn';

document.querySelector(".user-deck-container").addEventListener('click',async(e) => {
        const el = e.target
        const elid = el.closest(".user-card").id
        console.log(elid)
        const card = document.getElementById(elid)
        // start here!!

        moveCard(card);
        console.log('moved card');
        
        moveComputerCard();
    }
);

//winning and losing sounds
//<audio id="winSound" src="path/to/public/sound-bites/YouWin-soundEffect.mp3"/>"
const userWins = () => {
    // const winSound = document.getElementById('windSound');
    // winSound.play();
    window.alert("You win!")
};

//<audio id="loseSound" src="path/to/public/sound-bites/Defeat-soundEffect.mp3"/>
const userLoses = () => {
    // const loseSound = document.getElementById('loseSound');
    // loseSound.play();
    window.alert("You lost!")
};

const promptUserTurn = () => {
    window.alert("Its your turn!")
};

//end game
const endGame = () => {
    console.log('Game over!');
    resetGame();
};

//end battle round
const endBattleRound = () => {
    console.log('End round');
    gameState = 'userTurn'
    promptUserTurn();
};

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

//battle logic
//**************** */ -- userAttack replaces userAttackPoints???
const battle = async ({ userChoice,userAttack, computerAttack, computerDefend, computerChoice}) => {

    console.log(userAttack);
    console.log(userDefend);
    console.log(userChoice)
    console.log(computerAttack);
    console.log(computerDefend);
  
    console.log('user vs computer time!')

    //convert values to numbers
    // userAttackPoints = parseInt(userAttackPoints);
    // userDefendPoints = parseInt(userDefendPoints);
    // computerAttackPoints = parseInt(computerAttackPoints);
    // computerDefendPoints = parseInt(computerDefendPoints);

    let roundWin = 'draw';

    if (typeof computerAttack === "undefined") {
        // console.log('computer is attacking');
        if (typeof userAttack === 'undefined') {
            console.log('user is defending & computer is defendig')//calculation
            if (userDefend === computerDefend) {
                roundWin = 'draw';
            } else if (userDefend > computerDefend) {
                userLifePoints += computerDefend
                roundWin = 'user';
            } else {
                computerLifePoints += userDefend;
                roundWin = 'computer'
            }
        } else {
            console.log('user is defending & computer is attacking')//check
            if (userDefend === computerAttack) {
                roundWin = 'draw';
            }
            else if (userDefend > computerAttack) {
                computerLifePoints -= computerAttack / 2;
                roundWin = 'user';
            } else {
                userDefend -= userLifePoints;
                roundWin = 'computer'
            }
        }
    } else {
        // console.log('computer is defending');
        if (typeof userDefend === 'undefined') {
            console.log('user is attacking, computer is defending')//calculation
            if (userAttack === computerDefend) {
                roundWin = 'draw';
            } else if (userAttack > computerDefend) {
                userLifePoints += computerDefend;
                roundWin = 'user';
            } else {
                userLifePoints -= userAttack / 2;
                roundWin = 'computer'
            }
        }

        else {
            console.log('user & computer is attacking') //do calculation here 

            if (userAttack === computerAttack) {
                roundWin = 'draw';
            }
            else if (userAttack > computerAttack) {
                userLifePoints += computerAttack
                roundWin = 'user';
            } else {
                computerLifePoints += userAttack;
                roundWin = 'computer'
            }
        }
    };

    //check for losers
    if (userLifePoints <= 0) {
        console.log('You have died');
        userLoses();
        endGame();
        return;
    };
    if (computerLifePoints <= 0) {
        console.log('The computer has died');
        userWins();
        endGame();
        return;
    };

    if (roundWin === 'user') {
        wins++
        userWins();
        endBattleRound();
    };

    if (roundWin === 'computer') {
        losses++
        userLoses();
        endBattleRound();
    };

    //display final scores
    console.log(`Wins: ${wins}, Ties: ${ties}, Losses: ${losses}`);
    // saveScores(wins, ties, losses);
    // gameState = 'userTurn';//change game state to the user for the next round

};



//attach and defend buttons
let userChoice = [];
        
//if the user chooses attack, take the attack points

document.getElementById('attackButton').addEventListener('click', async function () {
    //user
    userChoice = 'attack';
    if(userChoice === 'attack'){
        userAttack = await getAttackPoints();
        console.log('You chose to attack!');
        console.log(userAttack);
    }else{
        console.log('No attack points :(');
    };
    //computer
    computerChoice ='attack';
    if(computerChoice === 'attack'){
        computerAttack = await getAttackPoints();
     console.log('Computer chose to attack!');
     console.log(computerAttack);
    }else{
    console.log('No attack points for Computer :(');
    }
    return battle({userAttack, userDefend, computerAttack, computerDefend})
});

//if the user chooses defend, take the defend points
document.getElementById('defendButton').addEventListener('click', async function () {
    userChoice = 'defend';
    if(userChoice === 'defend'){
    userDefend = await getDefensePoints();
    console.log('You chose defend!');
    console.log(userDefend);
    } else{console.log('No defend points :(')
    }; 
    // await battle({userChoice, userDefend});
     //computer
     computerChoice ='defend';
     if(computerChoice === 'defend'){
         computerAttack = await getAttackPoints();
      console.log('Computer chose to defend!');
      console.log(computerDefend)
     }else{
     console.log('No defend points for Computer :(');
     }
     return battle({userAttack, userDefend, computerAttack, computerDefend})
});

const getNewComputerCard = async() => {
    const cardData = await fetch("/api/cards")
    const computerCard = await cardData.json()
    const html = ` <div class="card-mini computer-card" id="${computerCard.id}">
    <div class="god-card-mini card-mini">
      <div class="card-content">
        <div class="name-class">
          <h3>${computerCard.name}</h3>
        </div>
        <div class="points-mini">
          <p>Attack: ${computerCard.attack_points}<br>
          Defend: ${computerCard.defense_points}</p>
        </div>
      </div>
    </div>
  </div>`
  document.querySelector(".opponent-card").innerHTML = html
}



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



// logic for if both user and computer attack. if points are the same its a draw
//     compare attacks points
// if (userAttackPoints === '800' && computerAttackPoints === '650') {
//     console.log('You')
//     userWins();
//     wins++
//     userLifePoints += computerAttackPoints;
// }
// if (userAttackPoints === '800' && computerDefendPoints === '850') {
//     console.log('You lose!');
//     userLoses();
//     losses++
//     userLifePoints -= userAttackPoints / 2;
// }

 // came from moveComuterCard ---
//  const opponentCardSection = document.querySelector('.opponent-card'); //move the card to the opponent-card div
    // computerCardChoice = document.querySelector('card-mini')
    // // centerSection.innerHTML = ''; //clear the center section
    // let card = computerCardChoice
    // console.log(card)

    // let cardClone = card.cloneNode(true)
    // console.log(cardClone)

    // opponentCardSection.appendChild(cardClone); //append a clone of the card
    // console.log('before hidden class');
    //show the attack and defend buttons