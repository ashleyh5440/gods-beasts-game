const router = require('express').Router();

router.get('/', async(req, res) => {
    res.render('homepage');
});

router.get('/login', async(req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('log_sign');
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