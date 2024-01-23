const router = require('express').Router();
const { Character, User } = require('../../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // //fetch the cards
    const cardData = await Character.findAll();
    const cards = cardData.map(c => c.get({plain:true}))
    const computerCard = cards[Math.floor(Math.random()*cards.length)]

    res.json(computerCard);
  
  }catch (error){
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'})
  }
});
   

module.exports = router;