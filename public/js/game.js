// const fs = require('fs');

// read the JSON file synchronously
// const characterData = JSON.parse(fs.readFileSync('path/to/character-seeds.json', 'utf8' ));

// const userCards = require('/api/cards');
// const cards = import {userCards, computerCards};

//tally wins, loses and ties
let wins = 0;
let ties = 0;
let losses = 0;

//each player begins with 10000 life points!
let userLifePoints = 10000;
let computerLifePoints = 10000;

// let userPickCards = 10;
// let computerPickCards = 10;

let characterData = []

//  card attack points
let choseAttack = {
    'attack': []}; //object or array?

//card defend points
let choseDefend = {
    'defend': []};

//api call to pull defense points from cards
async function getDefensePoints() {
    try {
        const response = await fetch("/api/cards", {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
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
        if (characterData){
            console.log('Fetched data');
        } else {
            console.log('Failed to fetch data')
        }
    } catch(err) {
        console.error('error', err);
    }
}

fetchDefenseData()

getDefensePoints();

//api call to pull attack points from cards
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
        if (characterData){
            console.log('Fetched data');
        } else {
            console.log('Failed to fetch data');
        }
    } catch(err) {
        console.error('error', err);
    }
}

fetchAttackData()

getAttackPoints();

//define a game state variable
let gameState = 'userTurn';

//user selects a god or beast card
document.addEventListener('DOMContentLoaded', function () {
     
    //select a card
    let cards = document.querySelector('[id^=card]')
 
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            moveCard(cards[i]);
            console.log('moved card');
            let computerCardChoice = cards[i].querySelector(".card-mini");
            moveComputerCard(computerCardChoice)
        });
}

    //move card to the center
    function moveCard(card) {
        const userCardSection = document.querySelector('.user-card'); //move the card to the user-card div
        // centerSection.innerHTML = ''; //clear the center section
        userCardSection.appendChild(card.cloneNode(true)); //append a clone of the card
        console.log('before hidden class');
        //show the attack and defend buttons
        document.querySelector('.button-container').classList.remove('hidden')
        console.log('after hidden class');
        //add event listenters for each card
        document.querySelector('.button-container').addEventListener('click', function (){
            userCardPlay('attack');
            });
        };
});

document.getElementById('defendButton').addEventListener('click', function() {
    userCardPlay('defend');
    const opponentCardSection = document.querySelector('.opponent-card'); //move the card to the opponent-card div
    computerCardChoice = document.querySelector('.card-mini')
    // centerSection.innerHTML = ''; //clear the center section
    let card = computerCardChoice
    console.log(card)

    let cardClone = card.cloneNode(true)
    console.log(cardClone)

    opponentCardSection.appendChild(cardClone); //append a clone of the card
    // opponentCardSection.classList.remove('hidden')
    cardClone.classList.remove('hidden')
});

function moveComputerCard(computerCardChoice) {
    const opponentCardSection = document.querySelector('.opponent-card'); //move the card to the opponent-card div
    computerCardChoice = document.querySelector('card-mini')
    // centerSection.innerHTML = ''; //clear the center section
    let card = computerCardChoice
    console.log(card)

    let cardClone = card.cloneNode(true)
    console.log(cardClone)

    opponentCardSection.appendChild(cardClone); //append a clone of the card
    console.log('before hidden class');
    //show the attack and defend buttons
    document.querySelector('.button-container').classList.remove('hidden')
    console.log('after hidden class');
    //add event listenters for each card
    document.querySelector('#attackButton').addEventListener('click', function (){
        userCardPlay('attack');
        cardClone.classList.remove('hidden');
        });
    };    

//user plays attack or defense from that card
const userCardPlay = async (choice) => {
    //check the game state
    if(gameState !== 'userTurn'){
        console.log('its not your turn.');
        return;
    }

    userChoice = choice;

    if (userChoice === 'attack') {
        console.log('You chose to attack!');
        // check if userChoice is a valid attack option
        if (choseAttack.hasOwnProperty('attack')){
            const userAttackPoints = choseAttack['attack'];
            if(typeof userAttackPoints === 'number'){
                console.log(userAttackPoints);
                gameState = 'computerTurn'; //change gameState to the computer
                computerCardPlay();
                await battle({userChoice, userAttackPoints});  
            };  
        } else {
            console.log('Invalid attack point.');
        }
    }else if (userChoice === 'defend') {
    console.log('You chose defend!');
        //check if userChoice is a valid defend option
        if(choseDefend.hasOwnProperty('defend')){
            const userDefendPoints = choseDefend['defend'];
            if(typeof userDefendPoints === 'number'){
                console.log(userDefendPoints);
                gameState = 'computerTurn'; //change gameState to the computer
                computerCardPlay();
                await battle({userChoice, userDefendPoints});
            };
        } else {
            console.log("Invalid defend choice.");
        }
    }

    if (userPickCards !== 0) {
        computerTurnPromise = computerCardPlay();
        await computerTurnPromise;
    };
    gameState = 'computerTurn';  // change game state to computer turn.                 
    // }else {
        // console.log('You have run out of cards. Game over!');//if the user runs out of cards the game is over
        //     // endGame();
};

//computer plays a card
const computerCardPlay = async () => {
    //function where computer chooses between god or beast card.
    const computerCardChoice = Math.random()<0.5 ? 'god-card test' : 'beast-card test';


     const computerChooseAction = async () =>{
        const computerActionChoice = Math.random() < 0.5 ? 'attack2' : 'defend2';
        if (computerActionChoice === 'attack2') {
            console.log('Computer chose attack!');
            //check
            if(choseAttack.hasOwnProperty('attack2')){
                const computerAttackPoints = choseAttack[computerActionChoice];
                if(typeof computerAttackPoints === 'number'){
                    console.log(computerAttackPoints);
                    gameState = 'battleTurn';
                    console.log(computerAttackPoints + 'line 171')
                 
                    return {computerActionChoice, computerAttackPoints};
                   
                };
            } else {
                console.log('Invalid computer attack point')
            }}
        else if (computerActionChoice === 'defend2')
            console.log('Computer chose defend!');
            //check
            if(choseDefend.hasOwnProperty('defend2')){
                const computerDefendPoints = choseDefend[computerActionChoice];
                if(typeof computerDefendPoints === 'number'){
                    console.log(computerDefendPoints);
                    gameState = 'battleTurn';
                    console.log(computerDefendPoints + 'line 187')
               
                    return {computerActionChoice, computerDefendPoints};
                };
        } else {
            console.log('Invalid computer defend point');
        }
    }

    if(computerCardChoice === 'god-card test'){
        console.log('Computer chose god card.');
        moveComputerCard(computerCardChoice); 
        return await computerChooseAction(computerCardChoice);   
    }else{
        console.log('Computer chose beast card.');
        moveComputerCard(computerCardChoice);
        return await computerChooseAction(computerCardChoice);
    };
    };

// wait for the computers move// usually done via function
// function playComputerMove(){
//         if(!computerActionChoice || !computerAttackPoints, 
//             !computerDefendPoints)
//             console.log('Error in computerCardPlay');
//          return (computerActionChoice, computerAttackPoints, computerDefendPoints);

//         };

//battle logic
const battle = async ({userChoice, userAttackPoints, userDefendPoints, computerAttackPoints, computerDefendPoints, computerValues,computerActionChoice}) => {

    console.log(userAttackPoints);
    console.log(computerAttackPoints);
    console.log(computerDefendPoints);
    // check the game state
    // if(gameState !== 'battleTurn'){
    //     // console.log('you cant battle.');
    //     return;
    // };

    // await playComputerMove();

    // const { computerAttackPoints, computerDefendPoints} = computerMove();
    console.log('user vs computer time!')

    //convert values to numbers
    userAttackPoints = parseInt(userAttackPoints);
    userDefendPoints = parseInt(userDefendPoints);
    computerAttackPoints = parseInt(computerAttackPoints);
    computerDefendPoints = parseInt(computerDefendPoints);

let roundWin = 'draw';

    if(typeof computerAttackPoints === "undefined"){
        // console.log('computer is attacking');
        if(typeof userAttackPoints === 'undefined'){
            console.log('user is defending & computer is defendig')//calculation
            if(userDefendPoints === computerDefendPoints){
                roundWin = 'draw';
            }else if(userDefendPoints > computerDefendPoints){
                userLifePoints += computerDefendPoints
                roundWin = 'user';
            }else{
                computerLifePoints += userDefendPoints;
                roundWin = 'computer'
            }
        }else{
            console.log('user is defending & computer is attacking')//check
            if(userDefendPoints === computerAttackPoints){
                roundWin = 'draw';
            }
            else if(userDefendPoints > computerAttackPoints ){
                computerLifePoints -= computerAttackPoints / 2;
                roundWin = 'user';
            }else{
                userDefendPoints -= userLifePoints;
                roundWin = 'computer'
            }
        }
    }else{
        // console.log('computer is defending');
            if(typeof userDefendPoints === 'undefined'){
            console.log('user is attacking, computer is defending')//calculation
            if(userAttackPoints === computerDefendPoints){
                roundWin = 'draw';
            }else if (userAttackPoints > computerDefendPoints){
                userLifePoints += computerDefendPoints;
                roundWin = 'user';
            }else{
                userLifePoints -= userAttackPoints/2;
                roundWin = 'computer'
            }}
    
        else{
            console.log('user & computer is attacking') //do calculation here 

            if(userAttackPoints === computerAttackPoints){
                roundWin = 'draw';
            }
            else if(userAttackPoints > computerAttackPoints ){
            userLifePoints += computerAttackPoints
            roundWin = 'user';
            }else{
                computerLifePoints += userAttackPoints;
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

    if(roundWin === 'user'){
        wins++
        userWins();
        endBattleRound();
    };

    if(roundWin === 'computer'){
        losses++
        userLoses();
        endBattleRound();
    };
  
    //display final scores
    console.log(`Wins: ${wins}, Ties: ${ties}, Losses: ${losses}`);
    // saveScores(wins, ties, losses);
    // gameState = 'userTurn';//change game state to the user for the next round

};

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

const promptUserTurn = () =>{
    window.alert("Its your turn!")
};

// //end game
// const endGame = () => {
//     console.log('Game over!');
//     resetGame();
// };

//end battle round
const endBattleRound = () =>{
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

const saveScores = async (wins, losses, highScore) => {
    const scores={ 
    wins,
    losses,
    highScore,
};

try{
    const response = await fetch('/api/users', {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scores),
});
if(response.ok){
    console.log('Scores saved successfully!');
}else{
    console.error('Failed to save scores.');
}
}catch (error){
    console.error('Error:', error);
}
};


const loadScores = async () => {
    try{
        const response = await fetch(`/api/users`);
        if(response.ok){
            const data = await response.json();
            console.log('Scores loaded:', data);
            //update
            wins = data.wins;
            losses = data.losses;
            highScore = data.highScore;
        }else{
            console.error('Failed to load scores');
        }
    }catch(error){
            console.error('Error:', error);
        }
    };


    
    // logic for if both user and computer attack. if points are the same its a draw
    //     compare attacks points
    if(userAttackPoints === '800' && computerAttackPoints === '650'){
        console.log('You')
        userWins();
        wins++
        userLifePoints += computerAttackPoints;
    }
    if(userAttackPoints === '800' && computerDefendPoints === '850'){
        console.log('You lose!');
            userLoses();
            losses++
            userLifePoints -= userAttackPoints/2;
    }