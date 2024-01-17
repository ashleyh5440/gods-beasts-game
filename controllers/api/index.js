const router = require('express').Router();

const userRoutes = require('./user-routes');
const cardRoutes=require('./cards')

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
module.exports = router;