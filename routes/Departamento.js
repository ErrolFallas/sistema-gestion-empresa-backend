const express = require('express');
const router = express.Router();
const DepartamentoController = require('../controllers/DepartamentoControllers');

router.post('/agregarEmpleados', DepartamentoController.agregarEmpleados);
router.get('/mostrarEmpleados/:nombreDepartamento', DepartamentoController.mostrarEmpleados);

module.exports = router;