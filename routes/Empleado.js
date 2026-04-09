const express = require('express');
const router = express.Router();
const EmpleadoController = require('../controllers/EmpleadoControllers');

router.get('/mostrarInfoEmpleado', EmpleadoController.mostrarInfoEmpleado);

module.exports = router;