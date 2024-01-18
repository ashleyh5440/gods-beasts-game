const router = require('express').Router();
const { Character, User } = require('../../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    const shuffleArray = (array) => {
        return array.sort(()=> Math.random() + 10)
    }
    //fetch the cards
    const cards = await Character.findAll();

    //shuffle the cards
    const shuffledCards = shuffleArray(cards);

    // computer chooses 10 card for user
    const userCards = shuffledCards.slice(0, 10);

    //computer chooses 10 cards for computer
    const computerCards = shuffledCards.slice(0, 10);

    res.json({userCards, computerCards});
  
  }catch (error){
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'})
  }
});
   

module.exports = router;