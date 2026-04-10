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


/* =======================
   POST DEPARTAMENTO
======================= */
async function postDepartamento(departamento) {
    try {
        const respuesta = await fetch("http://localhost:3000/departamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(departamento)
        });

        const datoDepartamento = await respuesta.json();
        return datoDepartamento;
    } catch (error) {
        console.error("Error al agregar departamento", error);
    }
}

module.exports = { getDepartamentos, postDepartamento };