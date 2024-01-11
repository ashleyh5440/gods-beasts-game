const router = require('express').Router();

const homeRoutes = require('./home-routes');
const createDeckRoutes = require('./createdeck-routes');


router.use('/', homeRoutes);
router.use('/createdeck', createDeckRoutes);

module.exports = router;