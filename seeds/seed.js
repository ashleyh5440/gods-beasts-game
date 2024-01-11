const sequelize = require('../config/connection');
const Character = require('../models/Character');
const characterData = require('./character-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Character.bulkCreate(characterData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();