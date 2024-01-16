const User = require('./User');
const Deck = require('./Deck');
const Character = require('./Character');

// Deck.hasMany(Character, { foreignKey: 'deck_id' });
// Character.belongsTo(Deck, {
//     foreignKey: 'deck_id',
// })

User.hasOne(Deck {

})


module.exports = { Character, Deck, User };