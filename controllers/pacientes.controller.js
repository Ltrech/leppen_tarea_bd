/// CONTROLADORES DEL MODULO ///
const bcrypt = require('bcryptjs');



const db = require("../db/db");

const usuarioControllers = require("./usuarios.controller");


//// METODO GET  /////

// Para todos los Paciente
const allpacientes = (req, res) => {
    const sql = "SELECT * FROM pacientes";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para un paciente
const showpacientes = (req, res) => {
    const {id_pacientes} = req.params;
    const sql = "SELECT * FROM pacientes WHERE id_pacientes = ?";
    db.query(sql,[id_pacientes], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el paciente"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////

//// insetar un nuevo paciente  ////
const storepacientes = (req, res) => {

    console.log(req.file);
    let imageName="";
    if(req.file){
        imageName= req.file.filename;
    };
    // Verificar los datos recibidos
    console.log("Datos recibidos en req.body:", req.body);
    console.log("Archivo recibido:", req.file);
  
    // Desestructurar los datos del formulario
    const { nombre_paciente, apellido_paciente, fecha_nac, telefono, domicilio, email, contrasena } = req.body;
    
    if (!nombre_paciente || !apellido_paciente || !fecha_nac || !telefono || !domicilio || !email || !contrasena) {
      return res.status(400).send("Todos los campos son obligatorios");
    }
  
    // Hashear la contraseña

    
    bcrypt.hash(contrasena, 8, (err, hashedPassword) => {
      if (err) {
        return res.status(500).send("Error de encriptación");
      }
  
      // Insertar en la base de datos (usuarios)
      const sqlUsuario = "INSERT INTO usuarios (email, contrasena) VALUES (?, ?)";
      db.query(sqlUsuario, [email, hashedPassword], (error, resultUsuario) => {
        if (error) {
          return res.status(500).json({ error: "ERROR: No se pudo insertar en usuarios" });
        }
  
        // Usar el id del nuevo usuario para registrar en la tabla pacientes
        const usuario_id = resultUsuario.insertId;
        const sqlPaciente = "INSERT INTO pacientes (nombre_paciente, apellido_paciente, fecha_nac, telefono, domicilio, imagen, usuario_id) VALUES (?,?,?,?,?,?,?)";
        db.query(sqlPaciente, [nombre_paciente, apellido_paciente, fecha_nac, telefono, domicilio, imageName, usuario_id], (error, result) => {
          if (error) {
            return res.status(500).json({ error: "ERROR: No se pudo insertar en pacientes" });
          }
  
          res.status(201).json({ mensaje: "Registro exitoso" });
        });
      });
    });
  };
  


//// METODO PUT  ////

//// Modificar Datos  ////
const updatepacientes = (req, res) => {
    const {id_pacientes} = req.params;
    const {nombre_paciente,apellido_paciente, fecha_nac, telefono, domicilio} = req.body;
    const sql ="UPDATE pacientes SET nombre_paciente = ?, apellido_paciente = ?, fecha_nac = ?, telefono = ?, domicilio = ?, imagen = ? WHERE id_pacientes = ?";
    db.query(sql,[nombre_paciente,apellido_paciente, fecha_nac, telefono, domicilio,imageName, id_pacientes], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El Paciente a modificar no existe"});
        };
        
        
        const pacientes = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(pacientes); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////

//// Eliminar Datos  ////
const destroypacientes = (req, res) => {
    const {id_pacientes} = req.params;
    const sql = "DELETE FROM pacientes WHERE id_pacientes = ?";
    db.query(sql,[id_pacientes], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El Paciente no existe"});
        };
        res.json({mesaje : "Paciente Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allpacientes,
    showpacientes,
    storepacientes,
    updatepacientes,
    destroypacientes
};
