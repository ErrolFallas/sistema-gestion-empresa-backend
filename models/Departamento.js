class Departamento {
    constructor(nombreDepartamento, listaEmpleados = [], nombreEmpresa) {
        this.nombreDepartamento = nombreDepartamento
        this.listaEmpleados = listaEmpleados
        this.nombreEmpresa = nombreEmpresa
    }}

module.exports = Departamento