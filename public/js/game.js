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
        getNewComputerCard();
        moveComputerCard();
    }
);


// winning and loosing sounds

const userWins = () => {
    playWinSound();
    window.alert("You win!")
};

const winSound = new Audio('./sound-bites/YouWin-SoundEffect.mp3');

const playWinSound = () =>{
    winSound.play();
};
// loosing sound
const userLoses = () => {
    playLoseSound();
    window.alert("You lost!")
};

const loseSound = new Audio('./sound-bites/Defeat-SoundEffect.mp3');

const playLoseSound = () => {
    loseSound.play();
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
    saveScores();
};

//battle logic
const battle = async ({userChoice,userAttack, computerAttack, computerDefend}) => {

    console.log(userAttack);
    console.log(userAttack.attack_points)
    console.log(userDefend);
    console.log(userChoice)
    console.log(computerAttack);
    console.log(computerDefend);
  
    console.log('user vs computer time!')

    let roundWin = 'draw';

    if ( computerAttack === "undefined") {
        if (userAttack === 'undefined') {
            console.log('user & computer is defending') //do calculation here 
            if (userDefend === computerDefend) {
                roundWin = 'draw';
            } else if (userDefend > computerDefend) {
                userLifePoints += computerDefend
                roundWin = 'user';
            } else {
                computerLifePoints += userDefend;
                roundWin = 'computer'
            };

            
        }else {
            console.log('user is defending, computer is attacking')//calculation
            if (userDefend === computerAttack) {
                roundWin = 'draw';
            }
            else if (userDefend > computerAttack) {
                computerLifePoints -= computerAttack / 2;
                roundWin = 'user';
            } else {
                userDefend -= userLifePoints;
                roundWin = 'computer'
            };
        }
    } else {
        // console.log('computer is defending');
        if (userDefend === 'undefined') {
            console.log('user is attacking & computer is defending')//check
            if (userAttack === computerDefend) {
                roundWin = 'draw';
            } else if (userAttack > computerDefend) {
                userLifePoints += computerDefend;
                roundWin = 'user';
            } else {
                userLifePoints -= userAttack / 2;
                roundWin = 'computer'
            };
        }
        else {
            console.log('user is attacking & computer is attacking')//calculation
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
        // userLoses();
        endGame();
        return;
    };
    if (computerLifePoints <= 0) {
        console.log('The computer has died');
        // userWins();
        endGame();
        return;
    };

    if (roundWin === 'user') {
        wins++
        document.querySelector(".user-points").innerHTML = wins;
        userWins();
        endBattleRound();
    };

    if (roundWin === 'computer') {
        losses++
        document.querySelector(".computer-points").innerHTML = losses;
        userLoses();
        endBattleRound();
    };

    

    //display final scores
    console.log(`Wins: ${wins}, Ties: ${ties}, Losses: ${losses}`);
};


//attach and defend buttons
let userChoice = [];
        

//if the user/computer chooses attack, take the attack points
document.getElementById('attackButton').addEventListener('click', async function () {
    //user
    userChoice = 'attack';
    if(userChoice === 'attack'){
        userAttack = (await getAttackPoints()).attack_points;
        console.log('You chose to attack!');
        console.log(userAttack);
    }else{
        console.log('No attack points :(');
    };
    //computer
    moveComputerCard();
    computerChoice ='attack';
    if(computerChoice === 'attack'){
        computerAttack = (await getAttackPoints()).attack_points;
     console.log('Computer chose to attack!');
     console.log(computerAttack);
    }else{
    console.log('No attack points for Computer :(');
    }
    return battle({userAttack, userDefend, computerAttack, computerDefend})
});

//if the user/computer chooses defend, take the defend points
document.getElementById('defendButton').addEventListener('click', async function () {
    userChoice = 'defend';
    if(userChoice === 'defend'){
    userDefend = (await getDefensePoints()).defense_points;
    console.log('You chose defend!');
    console.log(userDefend);
    } else{console.log('No defend points :(')
    }; 
    // await battle({userChoice, userDefend});
     //computer
     moveComputerCard();
     computerChoice ='defend';
     if(computerChoice === 'defend'){
         computerDefend = (await getDefensePoints()).defense_points;
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
};

getNewComputerCard();

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


