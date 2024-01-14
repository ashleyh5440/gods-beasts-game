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



//select cards
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
        document.querySelector('.button-container').addEventListener('click', function () {
        userCardPlay('attack');
        });

        document.getElementById('defendButton').addEventListener('click', function () {
        userCardPlay('defend');
        });
    }



    // computerCardPlay()
});


//  card attack points
let choseAttack = [800, 650];

//card defend points
let choseDefend = [850, 200];

// (use this for server -characterData.map(character => character.defend_points);)

//user plays a card
const userCardPlay = async (choice) => {
    // moveCard(selectedCard);
    userChoice = choice;
    if (choice === 'attack') {
        console.log('You chose to attack!');
        const userAttackPoints = getAttackPoints(userChoice);
    } else if (choseDefend.toLowerCase() === 'defend') {
        console.log('You chose defend!');
        choseDefend.push(getDefendPoints());
    } else {
        console.log("Please choose attack or defend.");
    }

    if (userPickCards !== 0) {
        await computerCardPlay();
    } else {
        console.log('You have run out of cards. Game over!');//if the user runs out of cards the game is over
        endGame();
    }
};

//computer plays a card
const computerCardPlay = async () => {
    //write function where computer chooses between god or beast.
    const computerChooses = ['attack', 'defend'];
    const computerChoice = computerChooses[Math.random() * computerChooses.length];

    if (computerChoice === 'attack') {
        choseAttack.push(getAttackPoints());
        // }else {
        //     choseDefend.push(getDefendPoints());
        // }
        console.log('Computer choice:', computerChoice);
    };

    const getAttackPoints = (choice) => {
        const lastAttackPoints = choseAttack.length > 0 ? choseAttack[choseAttack.length - 1] : 0;

        if (lastAttackPoints.includes(choice)) {
            console.log(choice);
            return choice;
        } else {
            console.log('invalid attack choice');
            return 0;
        }
    };
};
    // const getDefendPoints= (choice) =>{
    //     const lastDefendPoints = choseDefend.length > 0 ? choseDefend[choseDefend.length - 1] : 0;
    //     lastDefendPoints.push(battle);
    // };


    //battle logic
const battle = async (userChoice, userAttackPoints, userDefendPoints) => {
        const computerChoice = choseAttack.length > choseDefend.length ? 'attack' : 'defend';
        const computerAttackPoints = getAttackPoints();
        const computerDefendPoints = getDefendPoints();

        console.log('User choice:', userChoice);
        console.log('Computer choice:', computerChoice);
        //logic for if both user and computer attack. if points are the same its a draw
        if (userChoice === 'attack' && computerChoice === 'attack') {
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
        }

        //logic if user attacks and computer defends. if points are the same its a draw
        if (userChoice === 'attack' && computerChoice === 'defend') {
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
        }

        //logic if user defends and computer attacks. if points are the same its a draw
        if (userChoice === 'defend' && computerChoice === 'attack') {
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
        }
        //logic if both defend play another card
        if (userChoice === 'defend' && computerChoice === 'defend') {

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


    //end game
    const endGame = () => {
        console.log('Game over!');
        resetGame();
    };

    //reset game
    const resetGame = () => {
        userLifePoints = 10000;
        computerLifePoints = 10000;
        wins = 0;
        ties = 0;
        losses = 0;
        userCardPlay();
    };
