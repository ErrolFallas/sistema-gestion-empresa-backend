const express = require('express');
const router = express.Router();
const EmpresaControllers = require('../controllers/EmpresaControllers');

router.post('/agregarDepartamentos', EmpresaControllers.agregarDepartamentos);
router.get('/mostrarInfoEmpresa/:id', EmpresaControllers.mostrarInfoEmpresa);


module.exports = router;