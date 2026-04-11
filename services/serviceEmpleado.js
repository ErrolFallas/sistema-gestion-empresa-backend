/* =======================
   GET DEPARTAMENTOS
======================= */
async function getEmpleados() {
    try {
        const respuesta = await fetch("http://localhost:3005/Empleado");
        const datosEmpleados = await respuesta.json();
        return datosEmpleados;
    } catch (error) {
        console.error("Error al obtener la informacion del empleado", error);
    }
}

module.exports = { getEmpleados };
