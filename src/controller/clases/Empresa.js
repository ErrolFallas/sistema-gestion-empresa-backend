import Departamento from "./Departamento.js";

class Empresa {
    constructor(nombre, departamentos = []) {
        this.nombre = nombre
        this.departamentos = JSON.parse(localStorage.getItem("departamentos")) || departamentos
    }

    agregarDepartamentos(departamento) {
        // Solo agregar si el departamento no existe ya (evita duplicados)
        const existe = this.departamentos.some(d => d.nombreDepartamento === departamento.nombreDepartamento)
        if (!existe) {
            this.departamentos.push(departamento)
            localStorage.setItem("departamentos", JSON.stringify(this.departamentos))
            console.log("Departamento registrado:", departamento.nombreDepartamento)
        }
    }

    mostrarInfoEmpresa() {
        console.log("Nombre de la empresa: " + this.nombre);
        console.log("Informacion de cada departamento");
        this.departamentos.forEach(departamento => {
            console.log("Nombre del departamento: " + departamento.nombreDepartamento);
            console.log("Lista de empleados:");
            departamento.listaEmpleados.forEach(emp => {
                console.log(emp.nombreEmpleado, "-", emp.puesto)
            });
        });
    }
}
export default Empresa