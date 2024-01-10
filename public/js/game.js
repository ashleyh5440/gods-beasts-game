const wins = 0;/// i think we want to add up wins until the user or computer run out of life points
const ties = 0;
const losses = 0;

const cards = 10;//deck

const userAttack = [""]; //
const userDefend = [""];

const computerAttach = [""];
const computerDefend = [""];

const userLifePoints = 10000;
const computerLifePoints = 10000;

const userPickCards = 10;
const computerPickCards = 10;


//user begins game
const playGame = async () =>{
    const userChoice = 0; //window.prompt("Enter...")
    const cancelGame = 0;//

    //if use pressed Cancel, immediately end function
    if(cancelGame){
        return;
    };

    //computer gets random index from array of 10 options
    const index = Math.floor(Math.random()* options.length);
    const computerChoice = options[index];

    //if choices are the same, its a tie
    if(userChoice === computerChoice){
        ties++;
        window.alert("its a tie!");
//check every win condition for player
    // }else if(
    //     (userChoice === userAttack) ={

    //     };
    // ){
    //     wins++;
    //     window.alert("You win!");
    //      //if above conditions failed, assume player lost
    // }else{
    //     losses++;
    //     window.alert("You lost!");
    // }
    
   
}};