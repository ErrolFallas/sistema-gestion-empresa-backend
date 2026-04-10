const { getDepartamentos, putDepartamento } = require('../services/serviceDepartamento');
const Empleado = require('../models/Empleado');
const Departamento = require('../models/Departamento');

exports.agregarEmpleados = async (req, res) => {
    const { nombreDepartamento, nombreEmpleado, puesto } = req.body
    const empleado = new Empleado(nombreEmpleado, puesto)
    this.nombreDepartamento = nombreDepartamento

    const departamentosDeEmpresa = await getDepartamentos() /* Cargar los departamentos registrados en el sistema (db.json en lugar de localStorage.getItem) */
    const departamentoEnStorage = departamentosDeEmpresa.find(d => d.nombreDepartamento === this.nombreDepartamento)


    if (!departamentoEnStorage) {
        console.log("Error: Departamento inexistente en el sistema.");
        return;
    } /* Validar si el departamento existe antes de intentar guardar empleados */


    this.listaEmpleados = departamentoEnStorage.listaEmpleados || []; /* Sincronizar la lista de memoria con la de almacenamiento para no perder datos previos */


    const existe = this.listaEmpleados.some(e => e.nombreEmpleado === empleado.nombreEmpleado)
    if (!existe) {
        this.listaEmpleados.push(empleado) /* Solo agregar si el empleado no existe en este departamento (evita duplicados) */


        departamentoEnStorage.listaEmpleados = this.listaEmpleados /* Actualizar la lista en el registro global */
        await putDepartamento(departamentoEnStorage.id, departamentoEnStorage) /* Guardar en db.json en lugar de localStorage.setItem */

        console.log("Empleado agregado: " + empleado.nombreEmpleado + " al departamento " + this.nombreDepartamento);
        res.status(200).json({ message: "Empleado agregado exitosamente" });
    }
}


exports.mostrarEmpleados = async (req, res) => {
    console.log("Empleados del departamento: ", this.nombreDepartamento);
    const buscarEmpleados = await getDepartamentos() /* Cargar desde db.json en lugar de localStorage.getItem */
    const existenEmpleados = buscarEmpleados.find(d => d.nombreDepartamento === this.nombreDepartamento)
    if (!existenEmpleados || !existenEmpleados.listaEmpleados || existenEmpleados.listaEmpleados.length === 0) {

        console.log("No hay registro");


    } else {
        existenEmpleados.listaEmpleados.forEach(departamento => {
            if (departamento.nombreEmpleado === "") {
                console.log("No hay empleado");
            } else {
                console.log("Nombre: ", departamento.nombreEmpleado);
                console.log("Puesto: ", departamento.puesto);
                res.status(200).json({ message: "Informacion del departamento mostrada exitosamente" });
            }
        });

    }


}