const { getEmpresa, postEmpresa } = require('../services/serviceEmpresa');
const Departamento = require('../models/Departamento');
const Empresa = require('../models/Empresa');

exports.agregarDepartamentos = async (req, res) => {
    const { nombreEmpresa,departamentos } = req.body
    const nuevaEmpresa = new Empresa(nombreEmpresa,departamentos)

    const informacionEmpresa = await getEmpresa() /* Cargar los departamentos registrados en el sistema (db.json en lugar de localStorage) */

    // Solo agregar si el departamento no existe ya (evita duplicados)
    const existeDepartamento = informacionEmpresa.some(d => d.departamentos === nuevaEmpresa.departamentos )
    if (!existeDepartamento) {
        const respuesta = await postEmpresa(nuevaEmpresa.nombreEmpresa, nuevaEmpresa.departamentos) /* Guardar en db.json en lugar de localStorage.setItem */
        if(respuesta){
            console.log("Departamento registrado:", nuevaEmpresa.nombreEmpresa)
            res.status(201).json({ message: "Departamento agregado exitosamente" });
        }else{
            res.status(500).json({ message: "Error al agregar el departamento" });
        }
    }
}

exports.mostrarInfoEmpresa = async (req, res) => {
    const informacionEmpresa = await getEmpresa() /* Cargar desde db.json en lugar de localStorage */
    console.log("Nombre de la empresa: " + informacionEmpresa.nombre);
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