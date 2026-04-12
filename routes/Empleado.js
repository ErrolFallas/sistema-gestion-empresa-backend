const express = require('express');
const router = express.Router();
const EmpleadoController = require('../controllers/EmpleadoControllers');

router.get('/mostrarInfoEmpleado/:nombreEmpleado', EmpleadoController.mostrarInfoEmpleado);

module.exports = router;