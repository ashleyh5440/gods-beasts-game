const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async(req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!userData) {
            res.status(400).json({message: 'Email or password is incorrect.'});
            return;
        }
        if (userData.password !== req.body.password) {
            res.status(400).json({ message: 'Password is incorrect.'});
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ user: userData, message: 'You are logged in!' });
        });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.post('/', async(req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;