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
   PUT DEPARTAMENTO
   (equivalente a localStorage.setItem - guarda/actualiza un departamento existente)
======================= */
async function putDepartamento(id, departamento) {
    try {
        const respuesta = await fetch(`http://localhost:3000/departamentos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(departamento)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al guardar departamento", error);
    }
}

module.exports = { getDepartamentos, putDepartamento };