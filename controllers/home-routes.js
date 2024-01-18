const router = require('express').Router();

router.get('/', async(req, res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn });
});

router.get('/login', async(req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login')
});

// for createdeck page
const { Character, User, Deck } = require('../models');
// const withAuth = require('../utils/auth');

// for user's deck
router.get('/userdeck', async (req, res) => {
  try {
    // Get all cardss and JOIN with user data
    const userDeck = await Deck.findAll({});

    // Serialize data so the template can read it
    const cards = cardChoices.map((card) => card.get({ plain: true }));

    // Pass serialized   data and session flag into template
    res.render('userdeck', { 
      cards, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }

    res.render('log_sign');
});


router.get('/returninguser', async(req, res) => {
    res.render('login');
})

router.get('/signup', async(req, res) => {
  res.render('signup');
})

router.get('/log_sign', async(req, res) => {
  res.render('log_sign');
})

router.get('/options', async(req, res) => {
    res.render('options');
})

router.get('/play', async(req, res) => {
  try {
    const shuffleArray = (array) => {
      return array.sort(()=> Math.random() + 10)
  }
  //fetch the cards
  const cardData = await Character.findAll();
  const cards = cardData.map(c => c.get({plain:true}))
  const computerCard = cards[Math.floor(Math.random()*cards.length)]
  //shuffle the cards
  const shuffledCards = shuffleArray(cards);

  // computer chooses 10 card for user
  const userCards = shuffledCards.slice(0, 10);

  //computer chooses 10 cards for computer
  console.log("userCards", userCards)
    res.render('game', {computerCard, userCards});
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error)
  }
})

router.get('/scores', async(req, res) => {
  res.render('scores', { user: req.session.userId });
})

module.exports = router;