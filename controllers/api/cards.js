const router = require('express').Router();
const { Character, User } = require('../../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    // const shuffleArray = (array) => {
    //     return array.sort(()=> Math.random() + 10)
    // }
    // //fetch the cards
    const cardData = await Character.findAll();
    const cards = cardData.map(c => c.get({plain:true}))
    const computerCard = cards[Math.floor(Math.random()*cards.length)]

    // //shuffle the cards
    // const shuffledCards = shuffleArray(cards);

    // // computer chooses 10 card for user
    // const userCards = shuffledCards.slice(0, 10);

    // //computer chooses 10 cards for computer
    // const computerCards = shuffledCards.slice(0, 10);

    res.json(computerCard);
  
  }catch (error){
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'})
  }
});
   

module.exports = router;