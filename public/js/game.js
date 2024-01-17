// const fs = require('fs');

// read the JSON file synchronously
// const characterData = JSON.parse(fs.readFileSync('path/to/character-seeds.json', 'utf8' ));

//tally wins, loses and ties
let wins = 0;
let ties = 0;
let losses = 0;

//each player begins with 10000 life points!
let userLifePoints = 10000;
let computerLifePoints = 10000;

let userPickCards = 10;
let computerPickCards = 10;

let characterData = []

//  card attack points
let choseAttack = {
    'attack1': 800,
    'attack2': 650 };

//card defend points
let choseDefend = {
    'defend1': 200, 
    'defend2': 850};
//api call to pull datasbase numers
async function getAttackDefendPoints () {
  characterData = await fetch("/api/characters", {
        method: 'GET',
    })
///save where you need 
};

getAttackDefendPoints();
// (use this for server -characterData.map(character => character.defend_points);)


//define a game state variable
let gameState = 'userTurn';

let computerTurnPromise = null//added a variable to store the promise.

//user selects a god or beast card
document.addEventListener('DOMContentLoaded', function () {
    // loadScores();
    //fetch the JSON data
    // fetch('path/to/seeds/character-seeds.json',    //when ready for server change to GET method
    // .then(response => response.json())
    // .then((data) => data)
    // .catch(error)
    //     console.log('Error:', error);
     
    //select the god-card
    console.log('click');
    let godCard = document.getElementById('god-card');

    godCard.addEventListener('click', function () {
        moveCard(godCard);
        console.log('god card');
    });

    //select the beast-card
    let beastCard = document.getElementById('beast-card');

    beastCard.addEventListener('click', function () {
        moveCard(beastCard);
        console.log('beast card');
    });

    //move card to the center
    function moveCard(card) {
        const centerSection = document.querySelector('.center');
        // centerSection.innerHTML = ''; //clear the center section
        centerSection.appendChild(card.cloneNode(true)); //append a clone of the card
        console.log('before hidden class');
        //show the attack and defend buttons
        document.querySelector('.button-container').classList.remove('hidden')
        console.log('after hidden class');
        //add event listenters for each card
        document.querySelector('.button-container').addEventListener('click', function (){
            userCardPlay('attack');
            });
        };

        document.getElementById('defendButton').addEventListener('click', function() {
            userCardPlay('defend');
        });
});
//after moving card

//user plays attack or defense from that card
const userCardPlay = async (choice) => {

    userChoice = choice;

    if (userChoice === 'attack') {
        console.log('You chose to attack!');
        // check if userChoice is a valid attack option
        if (choseAttack.hasOwnProperty('attack1')){
            const userAttackPoints = choseAttack['attack1'];
            if(typeof userAttackPoints === 'number'){
                console.log(userAttackPoints);
                //  change gameState to the computer
                // await computerCardPlay();
                const computerValues = await computerCardPlay();
                console.log(computerValues);
                //calculation for computer //computer returns here 
                 return battle({userChoice, userAttackPoints, ...computerValues});  

                // computerAttackPoints, computerDefendPoints
            };  
        } else {
            console.log('Invalid attack point.');
        }
    }else if (userChoice === 'defend') {
    console.log('You chose defend!');
        //check if userChoice is a valid defend option
        if(choseDefend.hasOwnProperty('defend1')){
            const userDefendPoints = choseDefend['defend1'];
            if(typeof userDefendPoints === 'number'){
                console.log(userDefendPoints);
                // gameState = 'computerTurn'; //change gameState to the computer
                const computerValues = await computerCardPlay();
                console.log(computerValues);
                return battle({userChoice, userDefendPoints, ...computerValues});
            }; 
            // computerAttackPoints, computerDefendPoints
        } else {
            console.log("Invalid defend choice.");
        }
    }
};

function moveComputerCard(computerCardChoice){
    const centerSection = document.querySelector('.center');
    const card = document.createElement('div');
    card.className = computerCardChoice;
    centerSection.appendChild(card)
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