// const fs = require('fs');

//read the JSON file synchronously
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

//  card attack points
let choseAttack = {'attack': 800, 'attack': 650};

//card defend points
let choseDefend = {'defend': 200, 'defend': 850};

// (use this for server -characterData.map(character => character.defend_points);)

//define a game state variable
let gameState = 'userTurn';

let computerTurnPromise = null//added a variable to store the promise.

//user selects a god or beast card
document.addEventListener('DOMContentLoaded', function () {
    //select the god-card
    console.log('click');
    let godCard = document.getElementById('god-card');

    godCard.addEventListener('click', function () {
        moveCard(godCard);
        console.log('god card');
    });

    //select the beast-card
    const beastCard = document.querySelector('.beast-card');
    beastCard.addEventListener('click', function () {
        moveCard(beastCard);
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
        if (choseAttack.hasOwnProperty(userChoice)){
            const userAttackPoints = choseAttack[userChoice];
            console.log(userAttackPoints);
            gameState = 'computerTurn'; //change gameState to the computer
            computerCardPlay();
            await battle({userChoice, userAttackPoints});  
           
        } else {
            console.log('Invalid attack point.');
        }
    }else if (userChoice === 'defend') {
    console.log('You chose defend!');
        //check if userChoice is a valid defend option
        if(choseDefend.hasOwnProperty(userChoice)){
            const userDefendPoints = choseDefend[userChoice];
            console.log(userDefendPoints);
            gameState = 'computerTurn'; //change gameState to the computer
            computerCardPlay();
            await battle({userChoice, userDefendPoints, computerAttackPoints, computerDefendPoints});
            
        } else {
            console.log("Invalid defend choice.");
        }
    }

    if (userPickCards !== 0) {
        computerTurnPromise = computerCardPlay();
        await computerTurnPromise;
    };
                        
    // }else {
        // console.log('You have run out of cards. Game over!');//if the user runs out of cards the game is over
        //     // endGame();
};

function moveComputerCard(computerCardChoice){
    const centerSection = document.querySelector('.center');
    const card = document.createElement('div');
    card.className = computerCardChoice;
    centerSection.appendChild(card)
};

//computer plays a card
const computerCardPlay = async () => {
    // check game state
    if(gameState !== 'computerTurn'){
        console.log("It is the users turn!");
        return;
    }

    if(computerTurnPromise){
        await computerTurnPromise;
    }
    //function where computer chooses between god or beast card.
    const computerCardChoice = Math.random()<0.5 ? 'god-card test' : 'beast-card test';

    return new Promise((resolve)=>{
         //fucntion for computer to chooses between attack or defend
     const computerChooseAction = async (computerCardChoice) =>{
        const computerActionChoice = Math.random() < 0.5 ? 'attack' : 'defend';
        if (computerActionChoice === 'attack') {
            console.log('Computer chose attack!');
            //check
            if(choseAttack.hasOwnProperty(computerActionChoice)){
                const computerAttackPoints = choseAttack[computerActionChoice];
                console.log(computerAttackPoints);

                // await delay(1000);

                gameState = 'battleTurn';
                // const { computerAttackPoints, computerDefendPoints} = await computerMove
                await battle({computerActionChoice, computerAttackPoints})
            } else {
                console.log('Invalid computer attack point')
            }}
        else if (computerActionChoice === 'defend')
            console.log('Computer chose defend!');
            //check
            if(choseDefend.hasOwnProperty(computerActionChoice)){
            const computerDefendPoints = choseDefend[computerActionChoice];
            console.log(computerDefendPoints);

            gameState = 'battleTurn';

            await battle({computerActionChoice, computerDefendPoints});
        } else {
            console.log('Invalid computer defend point');
        }
    }

    if(computerCardChoice === 'god-card test'){
        console.log('Computer chose god card.');
        moveComputerCard(computerCardChoice); 
        computerChooseAction(computerCardChoice);   
    }else{
        console.log('Computer chose beast card.');
        moveComputerCard(computerCardChoice);
        computerChooseAction(computerCardChoice);
       

    // gameState = 'userTurn';  // change game state to user turn.

    //resolve the promise to signal the end of the computers turn
    resolve();
    };
    })
};


//battle logic
const battle = async ({userAttackPoints, userDefendPoints, computerAttackPoints, computerDefendPoints}) => {
    // check the game state
    if(gameState !== 'battleTurn'){
        console.log('invalid battle state.');
        return;
    };

    //wait for the computers move
    const computerMove = await ({computerAttackPoints, computerDefendPoints});

    if(!computerMove){
        console.log('Error in computerCardPlay');
        return;
    }
    // const { computerAttackPoints, computerDefendPoints} = computerMove();
   console.log('user vs computer time!')
    //logic for if both user and computer attack. if points are the same its a draw
    // if (userAttackPoints === 'attack' && computerAttackPoints === 'attack') {
        //compare attacks points
        if (userAttackPoints > computerAttackPoints) {
            console.log('You win!');
            userWins();
            wins++
            computerAttackPoints -= userLifePoints;
        } else if (userAttackPoints < computerAttackPoints) {
            console.log('You lose!');
            userLoses();
            losses++
            userAttackPoints -= computerLifePoints;
        } else {
            console.log('Its a draw!');
            ties++;
        }
    // }

    //logic if user attacks and computer defends. if points are the same its a draw
    // if (userAttackPoints === 'attack' && computerDefendPoints === 'defend') {
        if (userAttackPoints > computerDefendPoints) {
            console.log('You win!');
            userWins();
            wins++
            computerDefendPoints -= computerLifePoints;
        } else if (userAttackPoints < computerDefendPoints) {
            console.log('You lose!');
            userLoses();
            losses++
            userLifePoints -= userAttackPoints / 2;
        } else {
            console.log('Its a draw!');
            ties++;
        }
    // }

    //logic if user defends and computer attacks. if points are the same its a draw
    // if (userDefendPoints === 'defend' && computerAttackPoints === 'attack') {
        if (userDefendPoints > computerAttackPoints) {
            console.log('You win!');
            userWins();
            wins++
            computerLifePoints -= computerAttackPoints / 2;
        } else if (userDefendPoints < computerAttackPoints) {
            console.log('You lose!');
            userLoses();
            losses++
            userDefendPoints -= userLifePoints;
        } else {
            console.log('Its a draw!');
            ties++;
        }
    // }
    //logic if both defend play another card
    if (userDefendPoints === 'defend' && computerDefendPoints === 'defend') {

    }

    //check for losers
    if (userLifePoints <= 0) {
        console.log('You have died');
        userLoses();
        endGame();
    }
    if (computerLifePoints <= 0) {
        console.log('The computer has died');
        userWins();
        endGame();
    }

    //display final scores
    console.log(`Wins: ${wins}, Ties: ${ties}, Losses: ${losses}`);

    gameState = 'userTurn';//change game state to the user for the next round

};

//winning and losing sounds
//<audio id="winSound" src="path/to/public/sound-bites/YouWin-soundEffect.mp3"/>"
const userWins = () => {
    const winSound = document.getElementById('windSound');
    winSound.play();
};

//<audio id="loseSound" src="path/to/public/sound-bites/Defeat-soundEffect.mp3"/>
const userLoses = () => {
    const loseSound = document.getElementById('loseSound');
    loseSound.play();
};


// //end game
// const endGame = () => {
//     console.log('Game over!');
//     resetGame();
// };

//reset game
const resetGame = () => {
    userLifePoints = 10000;
    computerLifePoints = 10000;
    wins = 0;
    ties = 0;
    losses = 0;
    userCardPlay();
};
