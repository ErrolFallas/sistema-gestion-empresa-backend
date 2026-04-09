import Empresa from "../controller/clases/Empresa.js";
import Departamento from "../controller/clases/Departamento.js";
import Empleado from "../controller/clases/Empleado.js";

// Crear empresa
const empresa1 = new Empresa("Fressia Explotación");

// ----------------------
// MENU CON PROMPT
// ----------------------

function menu() {
    let entrar = true;

    while (entrar === true) {
        let opcion = prompt(
            "Digita alguna de las opciones:\n" +
            "1. Crear un departamento\n" +
            "2. Agregar un empleado a un departamento\n" +
            "3. Mostrar la info de la empresa\n" +
            "4. Mostrar empleados de un departamento\n" +
            "5. Salir del sistema"
        );

        // 🔹 Crear departamento
        if (opcion === "1") {
            let nombreDepto = prompt("Ingrese el nombre del departamento:");

            if (nombreDepto) {
                const nuevoDepto = new Departamento(nombreDepto);
                empresa1.agregarDepartamentos(nuevoDepto);
                alert("Departamento creado correctamente");
            } else {
                alert("Nombre inválido");
            }
        }

        // 🔹 Agregar empleado
        else if (opcion === "2") {
            let nombreEmpleado = prompt("Ingrese el nombre del empleado:");
            let puestoEmpleado = prompt("Ingrese el puesto del empleado:");
            let nombreDepto = prompt("Ingrese el nombre del departamento:");

            if (nombreEmpleado && puestoEmpleado && nombreDepto) {
                const nuevoEmpleado = new Empleado(nombreEmpleado, puestoEmpleado);

                // 🔥 IMPORTANTE: solo usamos el nombre (tu clase busca en localStorage)
                const departamentoTemp = new Departamento(nombreDepto);

                departamentoTemp.agregarEmpleados(nuevoEmpleado);
                alert("Proceso ejecutado (revisar consola)");
            } else {
                alert("Datos incompletos");
            }
        }

        // 🔹 Mostrar empresa
        else if (opcion === "3") {
            console.log("----- INFORMACIÓN DE LA EMPRESA -----");
            empresa1.mostrarInfoEmpresa();
        }

        // 🔹 Mostrar empleados de un departamento
        else if (opcion === "4") {
            let nombreDepto = prompt("Ingrese el nombre del departamento:");

            if (nombreDepto) {
                const departamentoTemp = new Departamento(nombreDepto);
                departamentoTemp.mostrarEmpleados();
            }
        }

        // 🔹 Salir
        else if (opcion === "5") {
            alert("Estoy saliendo ... Gracias");
            console.log("Estoy saliendo ... Gracias");
            entrar = false;
        }

        else {
            alert("Opción inválida");
        }
    }
}

menu();