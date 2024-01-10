const wins = 0;/// i think we want to add up wins until the user or computer run out of life points
const ties = 0;
const losses = 0;

const userLifePoints = 10000;
const computerLifePoints = 10000;

const userPickCards = 10;
const computerPickCards = 10;

//add event listenters for each card 
const cards = async()=> {
    const chooseAttack = [""]; //
    const chooseDefend = [""];

    const computerChoices = ['attach', 'defend'];
    const computerChoice = computerChoices[Math.random()* computerChoices.length];
    computerChoice.push(/*battle logic*/);
    //add if computer no cards, computer loses

  //ask the user to choose between attack and defend
    const userChoice = await playerChoice();
        if(chooseAttack.toLowerCase() === 'attack'){
        //perform attack logic
        console.log('You chose to attack!');
        chooseAttack.push(/*battle logic*/)        
        } else if(chooseDefend.toLowerCase()=== 'defend'){
        //perform defend logic
        console.log('You chose defend!');
        chooseDefend.push(/*battle logic*/);
        }else {
        console.log("Please choose attack or defend.");
        }
    // display the user cards
    // console.log('Your attack cards:', chooseAttack);
    console.log('Your card!:', userChoice);
    console.log('Computer choice:', computerChoice);
    //add if user runs out of cards the user loses 
};

const playerChoice = async()=>{
    //ask the user to choose attack or defend 
    const chooseAttack = [""]; //
    const chooseDefend = [""];
};


//logic for if both user and computer attack. if points are the same its a draw

//logic if user attacks and computer defends. if points are the same its a draw

//logic if user defends and computer attacks. if points are the same its a draw

//logic if both defend take a break and eat a snack 

//logic if run out of life points, user or computer loses 


//--------------------------------------------------------------------------

//user begins game
const playGame = async () =>{
    const cancelGame = 0;//
    //if use pressed Cancel, immediately end function
    if(cancelGame){
        return;
    };

    //user chooses card to play (atack or defend)
    // const playerChoice = 0; //window.prompt("Enter...")
    //computer gets random index from array of 10 options 
    // const index = Math.floor(Math.random()* options.length);
    // const computerChoice = options[index];
    //co
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
    
   // variable to turn over cards
   //compaire lifepoints 
}};

