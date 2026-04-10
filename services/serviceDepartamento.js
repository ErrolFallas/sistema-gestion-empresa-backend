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
   PATCH DEPARTAMENTO
   (actualiza un departamento existente, en este caso su lista de empleados)
======================= */
async function patchDepartamento(id, departamento) {
    try {
        const respuesta = await fetch(`http://localhost:3000/departamentos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(departamento)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar departamento", error);
    }
}

module.exports = { getDepartamentos, patchDepartamento };