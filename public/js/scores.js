async function getHighScores() {
    var response = await fetch("/api/users/getuser", { //returns Promise object with all the content hidden inside it?
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      response = response.json(); 
    }
    var column = document.querySelector("#col2")
    var scoretext = document.createElement('p');
    var winstext = document.createElement('p');
    var losstext = document.createElement('p');
    scoretext.textContent = 'High Score goes here';
    winstext.textContent = "Wins go here";
    losstext.textContent = "Losses go here";
    column.append(scoretext, winstext, losstext);
    
  }
  console.log(getHighScores());