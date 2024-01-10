const Character = require('./Character');
const Deck = require('./Deck');
const User = require('./User');

Deck.hasMany(Character, { as: 'characters' });
Character.belongsTo(Deck, {
    foreignKey: 'deckId',
    as: 'deck'
})


module.exports = { Character, Deck, User };