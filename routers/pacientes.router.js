const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcryptjs');
const path = require('path');
const app = express();
// Configuración de multer para la carga de imágenes



// Configuración de almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // La carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  }
});

const upload = multer({ storage: storage });


// Controlador
const controller = require("../controllers/pacientes.controller");

// Rutas para manejar pacientes
router.get('/', controller.allpacientes);  // Mostrar todos los pacientes

router.get('/id_pacientes', controller.showpacientes);  // Mostrar un paciente por ID

// Ruta POST para registrar un nuevo paciente
router.post('/', upload.single('imagen'), controller.storepacientes);

// Ruta PUT para actualizar un paciente
router.put('/:id_pacientes', upload.single('imagen'), controller.updatepacientes);

// Ruta DELETE para eliminar un paciente
router.delete('/:id_pacientes', controller.destroypacientes);

module.exports = router;
