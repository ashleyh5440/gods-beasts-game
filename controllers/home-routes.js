const router = require('express').Router();

router.get('/', async(req, res) => {
    res.render('homepage');
});

router.get('/login', async(req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login')
});

const { Character, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/createdeck', async (req, res) => {
  try {
    // Get all cardss and JOIN with user data
    const cardChoices = await Character.findAll({});

    // Serialize data so the template can read it
    const cards = cardChoices.map((card) => card.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('createdeck', { 
      cards, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }

    // res.render('log_sign');
});

router.get('/returninguser', async(req, res) => {
    res.render('login');
})

router.get('/options', async(req, res) => {
    res.render('options');
})

router.get('/play', async(req, res) => {
    res.render('game');
})

router.get('/signup', async(req, res) => {
    res.render('signup');
})
module.exports = router;