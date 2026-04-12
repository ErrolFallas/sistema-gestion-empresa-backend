/* =======================
   GET DEPARTAMENTOS
======================= */
async function getDepartamentos() {
    try {
        const respuesta = await fetch("http://localhost:3005/departamentos");
        const datosDepartamentos = await respuesta.json();
        return datosDepartamentos;
    } catch (error) {
        console.error("Error al obtener la informacion del empleado", error);
    }
}

module.exports = { getDepartamentos };
