const express = require('express');
const roomController = require('../controllers/roomController');

const routes = new express.Router()

routes.get('/:iniDate/:endDate', roomController.index)

module.exports = routes;