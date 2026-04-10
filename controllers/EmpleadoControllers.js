const conexion = require('../config/db');
const Empleado = require('../models/Empleado');

exports.mostrarInfoEmpleado = (req, res) => {
    console.log("Nombre: ", this.nombreEmpleado);
    console.log("Puesto: ", this.puesto);
    res.status(200).json({ message: "Informacion del empleado mostrada exitosamente" });
}