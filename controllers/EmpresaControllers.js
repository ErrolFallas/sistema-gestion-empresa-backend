const { getDepartamentos, postDepartamento } = require('../services/serviceEmpresa');
const Departamento = require('../models/Departamento');
const Empresa = require('../models/Empresa');

exports.agregarDepartamentos = async (req, res) => {
    const { nombre,departamentos } = req.body
    const empresa = new Empresa(nombre,departamentos)

    const existeEmpresa = await getEmpresa() /* Cargar los departamentos registrados en el sistema (db.json en lugar de localStorage) */

    // Solo agregar si el departamento no existe ya (evita duplicados)
    const existe = this.departamentos.some(d => d.nombreDepartamento === departamento.nombreDepartamento)
    if (!existe) {
        this.departamentos.push(departamento)
        await postDepartamento({ nombreDepartamento: departamento.nombreDepartamento, listaEmpleados: departamento.listaEmpleados }) /* Guardar en db.json en lugar de localStorage.setItem */
        console.log("Departamento registrado:", departamento.nombreDepartamento)
        
        res.status(200).json({ message: "Departamento agregado exitosamente" });
    
    }
}

exports.mostrarInfoEmpresa = async (req, res) => {
    this.departamentos = await getDepartamentos() /* Cargar desde db.json en lugar de localStorage */
    console.log("Nombre de la empresa: " + this.nombre);
    console.log("Informacion de cada departamento");
    this.departamentos.forEach(departamento => {
        console.log("Nombre del departamento: " + departamento.nombreDepartamento);
        console.log("Lista de empleados:");
        departamento.listaEmpleados.forEach(emp => {
            console.log(emp.nombreEmpleado, "-", emp.puesto)
        });
    });
    res.status(200).json({ message: "Informacion de la empresa mostrada exitosamente" });
}