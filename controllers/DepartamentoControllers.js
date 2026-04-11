const { getDepartamentos, postDepartamento, updateDepartamento } = require('../services/serviceDepartamento');
const { getEmpresa } = require('../services/serviceEmpresa');
const Empleado = require('../models/Empleado');
const Departamento = require('../models/Departamento');

exports.agregarEmpleados = async (req, res) => {
    const { nombreDepartamento, listaEmpleados } = req.body
    const ocuparDepartamento = new Departamento(nombreDepartamento, listaEmpleados)
    

    const departamentosDeEmpresa = await getEmpresa() /* Cargar los departamentos registrados en el sistema (db.json en lugar de localStorage.getItem) */
    const departamentoEnStorage = departamentosDeEmpresa.find(d => d.departamentos === ocuparDepartamento.nombreDepartamento)


    if (!departamentoEnStorage) {
        res.status(404).json({ message: "Departamento inexistente en el sistema." });
    } /* Validar si el departamento existe antes de intentar guardar empleados */


    const revisarEmpleadosDelSistema= await getDepartamentos()


    const existe = revisarEmpleadosDelSistema.some(e => e.listaEmpleados.nombreEmpleado === ocuparDepartamento.listaEmpleados.nombreEmpleado)
    if (!existe) {
        if(existe.listaEmpleados.length === 0){
            const respuesta = await postDepartamento(ocuparDepartamento.nombreDepartamento, ocuparDepartamento.listaEmpleados) /* Solo agregar si el empleado no existe en este departamento (evita duplicados) */
        }else{
            const actualizacion = await updateDepartamento(departamentoEnStorage.id, { listaEmpleados: ocuparDepartamento.listaEmpleados }) /* Guardar en db.json usando PATCH */
        }

        console.log("Empleado agregado: " + empleado.nombreEmpleado + " al departamento " + this.nombreDepartamento);
        res.status(200).json({ message: "Empleado agregado exitosamente" });
    }
    else{
        res.status(400).json({ message: "Empleado ya existe en el departamento" });
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