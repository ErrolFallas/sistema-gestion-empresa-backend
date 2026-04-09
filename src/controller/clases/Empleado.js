class Empleado {
    constructor(nombreEmpleado, puesto) {
        this.nombreEmpleado=nombreEmpleado
        this.puesto=puesto
    }

    mostrarInfoEmpleado(){
        console.log("Nombre: ",this.nombreEmpleado);
        console.log("Puesto: ",this.puesto);
    }
}

export default Empleado