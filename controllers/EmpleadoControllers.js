const { getDepartamentos } = require('../services/serviceEmpleado');
const Empleado = require('../models/Empleado');

exports.mostrarInfoEmpleado = async (req, res) => {

    const departamentos = await getDepartamentos() /* Cargar desde db.json usando el servicio */

    departamentos.forEach(departamento => {
        if (departamento.listaEmpleados) {
            departamento.listaEmpleados.forEach(emp => {
                // Crear objeto real de la clase (POO)
                const empleado = new Empleado(emp.nombreEmpleado, emp.puesto)
                empleado.mostrarInfoEmpleado() /* Ejecutar método POO original */
            });
        }
    });

    res.status(200).json({ message: "Informacion del empleado mostrada exitosamente" });
}