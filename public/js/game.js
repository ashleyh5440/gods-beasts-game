const fs = require('fs');

//read the JSON file synchronously
const characterData = JSON.parse(fs.readFileSync('path/to/character-seeds.json', 'utf8' ));

//tally wins, loses and ties
const wins = 0;
const ties = 0;
const losses = 0;

//each player begins with 10000 life points!
const userLifePoints = 10000;
const computerLifePoints = 10000;

const cards = 0; //???

const userPickCards = 10;
const computerPickCards = 10;

 //card attach points
let choseAttack = characterData.map(character => character.attack_points);

//card defend points
let choseDefend = characterData.map(character => character.defend_points);


//add event listenters for each card
document.getElementById('attackButton').addEventListener('click', function(){
    playerChoice('attack');
});

document.getElementById('defendButton').addEventListener('click', function(){
    playerChoice('defend');
});


//user plays a card
const userCardPlay = async(choice)=>{
    userChoice = choice;
    if(choice === 'attack'){
    console.log('You chose to attack!');
    choseAttack.push(getAttackPoints());
    } else if(choseDefend.toLowerCase()=== 'defend'){
    console.log('You chose defend!');
    choseDefend.push(getDefendPoints());
    }else {
    console.log("Please choose attack or defend.");
    }

    if(userPickCards !== 0){
        await computerCardPlay();
    }else{
        console.log('You have run out of cards. Game over!');//if the user runs out of cards the game is over
        endGame();
    }  
};

//computer plays a card
const computerCardPlay = async()=> {
    const computerChooses = ['attack', 'defend'];
    const computerChoice = computerChooses[Math.random()* computerChooses.length];

    if(computerChoice === 'attack'){
        choseAttack.push(getAttackPoints());
    }else {
        choseDefend.push(getDefendPoints());
    }
    console.log('Computer choice:', computerChoice);
};

const getAttackPoints= () =>{
    const lastAttackPoints = choseAttack.lenth > 0 ? choseAttack[choseAttack.length - 1] : 0;
    lastAttackPoints.push(battle);
}

const getDefendPoints= () =>{
    const lastDefendPoints = choseDefend.length > 0 ? choseDefend[choseDefend.length - 1] : 0;
    lastDefendPoints.push(battle);
};


//battle logic
const battle = async(userChoice, userAttackPoints, userDefendPoints)=>{
    const computerChoice = choseAttack.length > choseDefend.length ? 'attack' : 'defend';
    const computerAttackPoints = getAttackPoints();
    const computerDefendPoints = getDefendPoints();

    console.log('User choice:', userChoice);
    console.log('Computer choice:', computerChoice);
    //logic for if both user and computer attack. if points are the same its a draw
    if(userChoice === 'attack' && computerChoice === 'attack'){
        //compare attacks points
        if(userAttackPoints > computerAttackPoints){
            console.log('You win!');
            userWins();
            wins++
            computerAttackPoints -= userLifePoints;
        }else if (userAttackPoints < computerAttackPoints){
            console.log('You lose!');
            userLoses();
            losses++
            userAttackPoints -= computerLifePoints;
        }else{
            console.log('Its a draw!');
            ties++;
        }
    }

    //logic if user attacks and computer defends. if points are the same its a draw
    if(userChoice === 'attack' && computerChoice === 'defend'){
        if(userAttackPoints > computerDefendPoints){
            console.log('You win!');
            userWins();
            wins++
            computerDefendPoints -= computerLifePoints;
        }else if ( userAttackPoints < computerDefendPoints){
            console.log('You lose!');
            userLoses();
            losses++
            userLifePoints -= userAttackPoints/2;
        }else{
            console.log('Its a draw!');
            ties++;
        }
    }

    //logic if user defends and computer attacks. if points are the same its a draw
    if(userChoice === 'defend' && computerChoice === 'attack'){
        if(userDefendPoints > computerAttackPoints){
            console.log('You win!');
            userWins();
            wins++
            computerLifePoints -= computerAttackPoints/2;
        }else if ( userDefendPoints < computerAttackPoints){
            console.log('You lose!');
            userLoses();
            losses++
            userDefendPoints -= userLifePoints;
        }else{
            console.log('Its a draw!');
            ties++;
        }
    }
    //logic if both defend play another card
    if(userChoice === 'defend' && computerChoice === 'defend'){

    }

    //check for losers
    if(userLifePoints <= 0){
        console.log('You have died');
        userLoses();
        endGame();
    }
    if(computerLifePoints <= 0){
        console.log('The computer has died');
        userWins();
        endGame();
    }

    //display final scores
    console.log(`Wins: ${wins}, Ties: ${ties}, Losses: ${losses}`);

};

//winning and losing sounds
//<audio id="winSound" src="path/to/public/sound-bites/YouWin-soundEffect.mp3"/>"
const userWins = () =>{
    const winSound = document.getElementById('windSound');
    winSound.play();
};

//<audio id="loseSound" src="path/to/public/sound-bites/Defeat-soundEffect.mp3"/>
const userLoses = () =>{
    const loseSound = document.getElementById('loseSound');
    loseSound.play();
};


//end game
const endGame = () =>{
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
