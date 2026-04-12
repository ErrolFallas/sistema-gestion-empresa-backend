const { getDepartamentos } = require('../services/serviceEmpleado');
const Empleado = require('../models/Empleado');

exports.mostrarInfoEmpleado = async (req, res) => {
    try {
        const { nombreEmpleado } = req.params;
        if (!nombreEmpleado) {
            return res.status(400).json({ message: "Por favor envíe el nombreEmpleado como un parámetro de la url" });
        }

        const departamentos = await getDepartamentos();

        // Buscar el empleado dentro de todos los departamentos
        const empleadoEncontrado = departamentos.find(d => d.listaEmpleados.find(e => e.nombreEmpleado === nombreEmpleado));

        if (!empleadoEncontrado) {
            return res.status(404).json({ message: "No existe el empleado en ningun departamento" });
        }
        else {
            const empleado = empleadoEncontrado.listaEmpleados.find(e => e.nombreEmpleado === nombreEmpleado);
            return res.status(200).json({
                message: "Informacion del empleado mostrada exitosamente",
                data: {
                   nombreEmpleado: empleado.nombreEmpleado,
                    puesto: empleado.puesto,
                    nombreDepartamento: empleadoEncontrado.nombreDepartamento
                }
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error del servidor al mostrar información del empleado" });
    }
}