const router = require('express').Router();

router.get('/', async(req, res) => {
    res.render('homepage');
})

const { Character, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/createdeck', async (req, res) => {
  try {
    // Get all cardss and JOIN with user data
    const cardChoices = await Character.findAll({});
    console.log(cardChoices);

    // Serialize data so the template can read it
    const cards = cardChoices.map((project) => project.get({ plain: true }));
    console.log(cards)
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