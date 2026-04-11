const { getDepartamentos, postDepartamento, updateDepartamento } = require('../services/serviceDepartamento');
const { getEmpresa } = require('../services/serviceEmpresa');
const Empleado = require('../models/Empleado');
const Departamento = require('../models/Departamento');

exports.agregarEmpleados = async (req, res) => {
    try {
        const { nombreDepartamento, listaEmpleados } = req.body
        const ocuparDepartamento = new Departamento(nombreDepartamento, listaEmpleados)

        const departamentosDeEmpresa = await getEmpresa()
        const departamentoEnStorage = departamentosDeEmpresa.find(d => d.departamentos && d.departamentos.includes(ocuparDepartamento.nombreDepartamento));

        if (!departamentoEnStorage) {
            return res.status(404).json({ message: "Departamento inexistente en el sistema." });
        }

        const revisarEmpleadosDelSistema = await getDepartamentos()
        let depActual = revisarEmpleadosDelSistema.find(d => d.nombreDepartamento === ocuparDepartamento.nombreDepartamento)

        if (!depActual) {
            await postDepartamento(ocuparDepartamento.nombreDepartamento, [ocuparDepartamento.listaEmpleados])
            res.status(200).json({ message: "Empleado agregado exitosamente" });
        } else {
            const existe = depActual.listaEmpleados.some(e => e.nombreEmpleado === ocuparDepartamento.listaEmpleados.nombreEmpleado)
            if (!existe) {
                depActual.listaEmpleados.push(ocuparDepartamento.listaEmpleados);
                await updateDepartamento(depActual.nombreDepartamento, depActual.listaEmpleados, depActual.id)
                res.status(200).json({ message: "Empleado agregado exitosamente" });
            } else {
                res.status(400).json({ message: "Empleado ya existe en el departamento" });
            }
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Error interno del servidor" })
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