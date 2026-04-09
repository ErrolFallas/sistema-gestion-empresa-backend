const conexion = require('../config/db');
const Empleado = require('../models/Empleado');

exports.mostrarInfoEmpleado=(req,res)=>{
    conexion.query('SELECT * FROM Empleado', (error, results) => {
        if (error) {
            console.error('Error al obtener los empleados:', error);
            return;
        }
        console.log('Empleados:', results);
    });
    console.log("Nombre: ",this.nombreEmpleado);
    console.log("Puesto: ",this.puesto);
    res.status(200).json({ message: "Informacion del empleado mostrada exitosamente" });
}