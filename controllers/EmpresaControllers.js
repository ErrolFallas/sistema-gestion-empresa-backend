const { getEmpresa, postEmpresa, updateEmpresa } = require('../services/serviceEmpresa');
const { getDepartamentos } = require('../services/serviceDepartamento');
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
    try {
        const { id } = req.params; 
        if (!id) {
            return res.status(400).json({ message: "Por favor envíe el id de la empresa como un parámetro de la url" });
        }

        const informacionEmpresa = await getEmpresa();
        const informacionCompletaEmpresa = informacionEmpresa.find(e => e.id === id);

        if (!informacionCompletaEmpresa) {
            return res.status(404).json({ message: "No existe la empresa" });
        }

        const departamentos = await getDepartamentos();
        // Buscar departamentos que pertenezcan a esta empresa por nombreEmpresa
        const departamentosDeLaEmpresa = departamentos.filter(d => d.id === id);

        if (departamentosDeLaEmpresa.length === 0) {
            // Solo info de empresa
            return res.status(200).json({
                message: "Informacion de la empresa mostrada exitosamente",
                data: {
                    empresa: informacionCompletaEmpresa.nombreEmpresa,
                    departamentos: informacionCompletaEmpresa.departamentos
                }
            });
        } else {
            // Info de empresa y departamentos vinculados con detalle
            return res.status(200).json({ 
                message: "Informacion de la empresa mostrada exitosamente", 
                data: {
                    empresa: informacionCompletaEmpresa.nombreEmpresa,
                    departamentos: departamentosDeLaEmpresa.map(d => ({
                        nombreDepartamento: d.nombreDepartamento,
                        listaEmpleados: d.listaEmpleados
                    }))
                }
            });
        }
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Error del servidor al mostrar información" });
    }
}