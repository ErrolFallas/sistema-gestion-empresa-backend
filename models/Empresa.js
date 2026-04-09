class Empresa {
    constructor(nombre, departamentos = []) {
        this.nombre = nombre
        this.departamentos = JSON.parse(localStorage.getItem("departamentos")) || departamentos
    }
}

module.exports = Empresa