const router = require('express').Router();
const { Character, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all cardss and JOIN with user data
    const cardChoices = await Character.findAll({
      include: [
        {
          model: Character,
          attributes: [
          'name',
          'class',
          'description',
          'attack_points',  
          'defense_points',
          ],
        },
      ],
    });

    // Serialize data so the template can read it
    const card = cardChoices.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('createdeck', { 
      card, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;