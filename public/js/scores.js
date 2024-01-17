
app.post('saveScores', async (req, res)=>{
    const {username, wins, losses, ties} = req.body;

    try{
        let score = await Score.findOne({username});

        if(!score){
            score = new Score ({username, wins, losses, highScore});
        }else{
            score.wins = wins;
            score.losses = losses;
            score.ties = highScore;
        }
        await score.save();
        res.send('Scores saved Successfully!');
    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
});
const highScoreHandler = async(event) => {
    event.preventDefault();
}

app.get('/loadScores/:username', async (req, res)=>{
    const username = req.params.username;
    try{
        const score = await Score.findOne({username});

        if(!score){
            res.status(404).send('User not found');
        }else{
            res.json(score);
        }
    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
})

