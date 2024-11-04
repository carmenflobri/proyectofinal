const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Aseguramos que el email sea único
    password: { type: String, required: true } // Asegúrate de manejar la contraseña de forma segura
});

// Cambiado el nombre del modelo a "Employee"
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

module.exports = EmployeeModel;
