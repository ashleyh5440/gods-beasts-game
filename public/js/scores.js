// Do we need to make a table to intake the scores?-HP
// i think below is for a scores route -HP
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

