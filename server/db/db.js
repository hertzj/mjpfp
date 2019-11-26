const Sequelize = require('sequelize');
const PG_DB = 'postgres://localhost:5432/acme-calendar';
const db = new Sequelize(PG_DB, {logging: false});

module.exports = { db };