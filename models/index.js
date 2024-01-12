const User = require('./User');
const Deck = require('./Deck');
const Character = require('./Character');

Deck.hasMany(Character, { foreignKey: 'deck_id' });
Character.belongsTo(Deck, {
    foreignKey: 'deck_id',
})


module.exports = { Character, Deck, User };