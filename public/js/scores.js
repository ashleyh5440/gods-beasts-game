// Do we need to make a table to intake the scores?-HP
// i think below is for a scores route -HP
app.post('saveScores', async (req, res)=>{
    const {username, wins, losses, ties} = req.body;

    try{
        let score = await Score.findOne({username});

        if(!score){
            score = new Score ({username, wins, losses, ties});
        }else{
            score.wins = wins;
            score.losses = losses;
            score.ties = ties;
        }
        await score.save();
        res.send('Scores saved Successfully!');
    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error')
    }
});

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

