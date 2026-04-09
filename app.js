const express = require('express');
const cors = require('cors');

const DepartamentoRoutes = require('./routes/Departamento');
const EmpleadoRoutes = require('./routes/Empleado');
const EmpresaRoutes = require('./routes/Empresa');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/departamento', DepartamentoRoutes);
app.use('/api/empleado', EmpleadoRoutes);
app.use('/api/empresa', EmpresaRoutes);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});