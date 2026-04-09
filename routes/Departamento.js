const express = require('express');
const router = express.Router();
const DepartamentoController = require('../controllers/DepartamentoControllers');

router.post('/agregarEmpleados', DepartamentoController.agregarEmpleados);
router.get('/mostrarEmpleados', DepartamentoController.mostrarEmpleados);

module.exports = router;