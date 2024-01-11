const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        class: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                equals: 'God',
                equals: 'Beast',
            },
        },
        attack_points: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        defense_points: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deck_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'deck',
                key: 'id',
            },
            allowNull: true,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'character',
    }
);

module.exports = Character;