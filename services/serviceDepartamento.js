/* =======================
   GET PELÍCULAS
======================= */
async function getParque() {
    try {
        const respuesta = await fetch("http://localhost:3000/parqueDiversiones");
        const datosParque = await respuesta.json();
        return datosParque;
    } catch (error) {
        console.error("Error al obtener Parque", error);
    }
}
export { getParque };


/* =======================
   POST PELÍCULAS
======================= */
async function postParque(Parque) {
    try {
        const respuesta = await fetch("http://localhost:3000/parqueDiversiones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Parque)
        });

        const datoParque = await respuesta.json();
        return datoParque;
    } catch (error) {
        console.error("Error al agregar Parque", error);
    }
}
export { postParque };


/* =======================
   PUT PELÍCULAS
======================= */
async function updateParque(id, Parque) {
    try {
        const respuesta = await fetch(`http://localhost:3000/parqueDiversiones/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Parque)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar Parque", error);
    }
}
export { updateParque};


/* =======================
   DELETE PELÍCULAS
======================= */
async function deleteParque(id) {
    try {
        await fetch(`http://localhost:3000/parqueDiversiones/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error("Error al eliminar Parque", error);
    }
}
export { deleteParque };


/* =======================
   PATCH PELÍCULAS
======================= */
async function updatePatchParque(id, Parque) {
    try {
        const respuesta = await fetch(`http://localhost:3000/parqueDiversiones/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Parque)
        });

        return await respuesta.json();
    } catch (error) {
        console.error("Error al editarParque", error);
    }
}
export { updatePatchParque };