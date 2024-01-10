const express  = require( 'express');
// En routes.js
const { getClientes } = require('./ClientesController.js');
const router = express.Router();

router.get('/', getClientes);

module.exports = router;