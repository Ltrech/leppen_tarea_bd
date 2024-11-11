/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();


///ACA VA EL MULTER para las imagenes////

const multer = require("multer");
const path = require("path");


//diskstorage para guardar en el disco  y memorystorage para guardar en la nube//
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'uploads');
    },
    filename:(req, file, cb) =>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },

});

const upload = multer({storage});

const controller = require("../controllers/pacientes.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allpacientes);

// Para un producto
router.get('/:id_pacientes', controller.showpacientes);

//// METODO POST  ////
router.post('/', upload.single('imagen'), controller.storepacientes);

//// METODO PUT  ////
router.put('/:id_pacientes',upload.single('imagen'), controller.updatepacientes);

//// METODO DELETE ////
router.delete('/:id_pacientes', controller.destroypacientes);

// EXPORTAR ROUTERS
module.exports = router;
