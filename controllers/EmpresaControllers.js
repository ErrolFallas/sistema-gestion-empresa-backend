const conexion = require('../config/db');
const Departamento = require('../models/Departamento');
const Empresa = require('../models/Empresa');

exports.agregarDepartamentos = (req, res) => {
    const { nombreDepartamento, listaEmpleados } = req.body
    const departamento = new Departamento(nombreDepartamento, listaEmpleados)

    // Solo agregar si el departamento no existe ya (evita duplicados)
    const existe = this.departamentos.some(d => d.nombreDepartamento === departamento.nombreDepartamento)
    if (!existe) {
        this.departamentos.push(departamento)
        localStorage.setItem("departamentos", JSON.stringify(this.departamentos))
        console.log("Departamento registrado:", departamento.nombreDepartamento)
        res.status(200).json({ message: "Departamento agregado exitosamente" });
    }
}

exports.mostrarInfoEmpresa = (req, res) => {
    console.log("Nombre de la empresa: " + this.nombre);
    console.log("Informacion de cada departamento");
    this.departamentos.forEach(departamento => {
        console.log("Nombre del departamento: " + departamento.nombreDepartamento);
        console.log("Lista de empleados:");
        departamento.listaEmpleados.forEach(emp => {
            console.log(emp.nombreEmpleado, "-", emp.puesto)
        });
        res.status(200).json({ message: "Informacion de la empresa mostrada exitosamente" });
    });
}