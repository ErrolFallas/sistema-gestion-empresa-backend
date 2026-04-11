const { getEmpresa, postEmpresa, updateEmpresa } = require('../services/serviceEmpresa');
const Departamento = require('../models/Departamento');
const Empresa = require('../models/Empresa');

exports.agregarDepartamentos = async (req, res) => {
    try {
        const { nombreEmpresa, departamentos } = req.body;
        const nuevaEmpresa = new Empresa(nombreEmpresa, departamentos);

        const informacionEmpresa = await getEmpresa();

        let empresaActual = informacionEmpresa.find(e => e.nombreEmpresa === nuevaEmpresa.nombreEmpresa);

        if (!empresaActual) {
            // Si no existe la empresa, se crea con un array que contiene este departamento
            await postEmpresa(nuevaEmpresa.nombreEmpresa, [nuevaEmpresa.departamentos]);
            return res.status(201).json({ message: "Departamento agregado exitosamente" });
        } else {
            // Si la empresa existe, verificamos si el departamento ya está en la lista
            let existeDepartamento = empresaActual.departamentos.some(d => d === nuevaEmpresa.departamentos);

            if (!existeDepartamento) {
                empresaActual.departamentos.push(nuevaEmpresa.departamentos);
                // Se hace un update simulando un PATCH
                await updateEmpresa(empresaActual.nombreEmpresa, empresaActual.departamentos, empresaActual.id);
                return res.status(200).json({ message: "departamentos actualizados" });
            } else {
                return res.status(400).json({ message: "El departamento ya existe en la empresa" });
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.mostrarInfoEmpresa = async (req, res) => {
    const informacionEmpresa = await getEmpresa() /* Cargar desde db.json en lugar de localStorage */
    console.log("Nombre de la empresa: " + informacionEmpresa.nombreEmpresa);
    console.log("Informacion de cada departamento");
    informacionEmpresa.forEach(departamento => {
        console.log("Nombre del departamento: " + departamento.nombreDepartamento);
        console.log("Lista de empleados:");
        departamento.listaEmpleados.forEach(emp => {
            console.log(emp.nombreEmpleado, "-", emp.puesto)
        });
    });
    res.status(200).json({ message: "Informacion de la empresa mostrada exitosamente" });
}