const Sequelize = require('sequelize');
const { db } = require('./../db.js');

const { STRING, TIME, DATEONLY } = Sequelize;

const Event = db.define("events", {
    title: {
        type: STRING,
        allowNull: false,
    },
    date: {
        type: DATEONLY,
        allowNull: false,
    }
});

module.exports = { Event }