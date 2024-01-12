const router = require('express').Router();

const homeRoutes = require('./home-routes');
// const createDeckRoutes = require('./createdeck-routes');
const apiRoutes = require('./api');


router.use('/', homeRoutes);
// router.use('/createdeck', createDeckRoutes);
router.use('/api', apiRoutes);

module.exports = router;