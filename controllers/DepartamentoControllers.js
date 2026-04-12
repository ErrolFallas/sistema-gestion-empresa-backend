const { getDepartamentos, postDepartamento, updateDepartamento } = require('../services/serviceDepartamento');
const { getEmpresa } = require('../services/serviceEmpresa');
const Empleado = require('../models/Empleado');
const Departamento = require('../models/Departamento');

exports.agregarEmpleados = async (req, res) => {
    try {
        const { nombreDepartamento, listaEmpleados, nombreEmpresa } = req.body

        const ocuparDepartamento = new Departamento(nombreDepartamento, listaEmpleados, nombreEmpresa)

        const empresas = await getEmpresa()
        const empresaExistente = empresas.find(e => e.nombreEmpresa === ocuparDepartamento.nombreEmpresa);

        if (!empresaExistente) {
            return res.status(404).json({ message: "La empresa no existe en el sistema." });
        }

        // Verificar que el departamento esté registrado en la empresa
        const departamentoEnEmpresa = empresaExistente.departamentos.includes(ocuparDepartamento.nombreDepartamento);

        if (!departamentoEnEmpresa) {
            return res.status(404).json({ message: "Departamento inexistente en la empresa." });
        }

        const revisarEmpleadosDelSistema = await getDepartamentos()
        let depActual = revisarEmpleadosDelSistema.find(d => d.nombreDepartamento === ocuparDepartamento.nombreDepartamento && d.nombreEmpresa === ocuparDepartamento.nombreEmpresa)

        if (!depActual) {
            await postDepartamento(ocuparDepartamento.nombreDepartamento, [ocuparDepartamento.listaEmpleados], ocuparDepartamento.nombreEmpresa)
            res.status(200).json({ message: "Empleado agregado exitosamente" });
        } else {
            const existe = depActual.listaEmpleados.some(e => e.nombreEmpleado === ocuparDepartamento.listaEmpleados.nombreEmpleado)
            if (!existe) {
                depActual.listaEmpleados.push(ocuparDepartamento.listaEmpleados);
                await updateDepartamento(depActual.nombreDepartamento, depActual.listaEmpleados, depActual.nombreEmpresa, depActual.id)
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
try {
    const { nombreDepartamento } = req.params;
    if (!nombreDepartamento) {
        return res.status(400).json({ message: "Por favor envíe el nombreDepartamento como un parámetro de la url" });
    }

    const informacionDepartamento = await getDepartamentos();
    const informacionCompletaDepartamento = informacionDepartamento.find(e => e.nombreDepartamento === nombreDepartamento);

    if (!informacionCompletaDepartamento) {
        return res.status(404).json({ message: "No existe el departamento" });
    }

    const inforrmacionListaEmpleados = informacionCompletaDepartamento.listaEmpleados.filter(e => e.nombreEmpleado !== "")
    if (inforrmacionListaEmpleados.length === 0) {
        return res.status(200).json({
            message: "Informacion del departamento mostrada exitosamente, no hay empleados registrados",
            data: {
                departamento: informacionCompletaDepartamento
            }
        });
    }
    else {
        return res.status(200).json({
            message: "Informacion del departamento mostrada exitosamente",
            data: {
                nombreDepartamento: informacionCompletaDepartamento.nombreDepartamento,
                listaEmpleados: informacionCompletaDepartamento.listaEmpleados,
                nombreEmpresa: informacionCompletaDepartamento.nombreEmpresa
            }
        });
    }
} catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error del servidor al mostrar información" });
}
}
