/* =======================
   GET DEPARTAMENTOS
======================= */
async function getDepartamentos() {
    try {
        const respuesta = await fetch("http://localhost:3000/departamentos");
        const datosDepartamentos = await respuesta.json();
        return datosDepartamentos;
    } catch (error) {
        console.error("Error al obtener departamentos", error);
    }
}

module.exports = { getDepartamentos };
