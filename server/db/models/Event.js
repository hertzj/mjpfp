const Sequelize = require('sequelize');
const { db } = require('./../db.js');

const { STRING, TIME, DATEONLY } = Sequelize;

const Event = db.define('event', {
    title: {
        type: STRING,
        allowNull: false,
        // validate?
    },
    time: {
        type: TIME,
        allowNull: false,
    },
    date: {
        type: DATEONLY,
        allowNull: false,
    }
});

module.exports = { Event }