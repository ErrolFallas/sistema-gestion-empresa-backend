import Empresa from "../controller/clases/Empresa.js";
import Departamento from "../controller/clases/Departamento.js";
import Empleado from "../controller/clases/Empleado.js";


const empresa1= new Empresa ("Fressia Explotación")

const departamento1=new Departamento("Desarrollo")
const departamento2=new Departamento("Diseño")
const departamento3=new Departamento("QA")
const departamento4=new Departamento("Marketing")
const departamento5=new Departamento("Recursos Humanos")
const departamento6=new Departamento("tiktok")

const empleado1=new Empleado("Sarai", "gerente")
const empleado2=new Empleado("Andres", "ingeniero")
const empleado3=new Empleado("Steven", "gerente")
const empleado4=new Empleado("Coto", "jefe")

    console.log("-----Registro de departamentos-----");

    empresa1.agregarDepartamentos(departamento1) 
    empresa1.agregarDepartamentos(departamento2)
    empresa1.agregarDepartamentos(departamento3) 
    empresa1.agregarDepartamentos(departamento4) 
    empresa1.agregarDepartamentos(departamento5)  

    console.log("------Registro de empleados-----");

    departamento1.agregarEmpleados(empleado1)
    departamento1.agregarEmpleados(empleado2)
    departamento2.agregarEmpleados(empleado3)

console.log("-----Informacion de la empresa-----");

empresa1.mostrarInfoEmpresa()

console.log("-----Intento de empleado 4 de inventarse un trabajo-----");

departamento6.agregarEmpleados(empleado4)

console.log("---Informacion de los departamentos---");
console.log("---Informacion del departamento de Desarrollo(1)---");
departamento1.mostrarEmpleados()

console.log("---Informacion del departamento de Diseño(2)---");
departamento2.mostrarEmpleados()


console.log("---Informacion del departamento de QA(3)---");
departamento3.mostrarEmpleados()

console.log("-----El empleado 4 postula correctamente a un departamento real-----");
departamento3.agregarEmpleados(empleado4)


console.log("---Informacion del departamento de QA(3)---");
departamento3.mostrarEmpleados()


/* function menu() {
    let entrar = true
    while (entrar === true) {
        let opcion = prompt("Digita alguna de las opciones:\n 1. Crear un departamento.\n2. Agregar un empleado a un departamento.\n3. Mostrar la info de la empresa\n4. Salir del sistema")
        if (opcion === "1") {
            alert("Crear un departamento")
            console.log("Crear un departamento");
        } else if (opcion === "2") {
            alert("Agregar un empleado a un departamento")
            console.log("Agregar un empleado a un departamento");

        } else if (opcion === "3") {
            alert("Mostrando información de la empresa")
            console.log("Estoy saliendo ... Gracias");
        } 
        else if (opcion === "4") {
            alert("Estoy saliendo ... Gracias")
            console.log("Estoy saliendo ... Gracias");
            entrar = false
        }
    }
}

menu() */
 




