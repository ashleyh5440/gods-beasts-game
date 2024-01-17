const router = require('express').Router();
const { Character, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/cards', async (req, res) => {
  try {
    cards = []

    numCards = 10
    // computer chooses 10 card for user
    let userCards = Math.floor(math.random()* numCards)
    //computer chooses 10 cards for computer
    let computeCards = 

    // Pass serialized data and session flag into template
    res.render('createdeck', { 
      cards, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;