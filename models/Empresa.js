class Empresa {
    constructor(nombreEmpresa, departamentos = []) {
        this.nombreEmpresa = nombreEmpresa
        this.departamentos = departamentos
    }
}

module.exports = Empresa