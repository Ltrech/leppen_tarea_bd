/// CONTROLADORES DEL MODULO ///




const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../db/db");
const buscarUsuario = (email, res)=>{
    const sql = "SELECT * FROM usuarios where fecha_baja is null and email= ?";
    db.query(sql,[email], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el email"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    });  
}

const buscarUsuarioPorEmail = function (email, res, cb) {
    const sql = "SELECT * FROM usuarios where fecha_baja is null and email= ?";
    let usuario = null;

    db.query(sql,[email], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el email"});
        };
		

        console.log("Row: "+ rows[0]);
       cb(rows[0]);
    }); 
  };
//// METODO GET  /////

// Para todos los usuarios
const alluser = (req, res) => {
    const sql = "SELECT * FROM usuarios where fecha_baja is null";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para un usuario
const showusuarios = (req, res) => {
    const {id_usuarios} = req.params;
    const sql = "SELECT * FROM usuarios WHERE fecha_baja is null and id_usuarios = ?";
    db.query(sql,[id_usuarios], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el usuario"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////

//// insetar un nuevo usuario  ////
const storeUsuarios = (req, res) => {
    const { email, contraseña, rol, fecha_baja } = req.body;
    if (!email || !contraseña || !rol || fecha_baja === undefined) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    bcrypt.hash(contraseña, 8, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send("Error de encriptación");
        }

        const sql = "INSERT INTO usuarios (email, contraseña, rol, fecha_baja) VALUES (?,?,?,?)";
        db.query(sql, [email, hashedPassword, rol, fecha_baja], (error, result) => {
            if (error) {
                return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
            }

            const usuario = { ...req.body, id: result.insertId };
            res.status(201).json(usuario); // muestra creado con éxito el elemento
        });
    });
};



//// METODO PUT  ////

//// Modificar Datos  ////
const updateusuario = (req, res) => {
    const {id_usuarios} = req.params;
    const {email, contraseña, rol} = req.body;
    const sql ="UPDATE usuarios SET email = ?, contraseña = ?, rol = ? WHERE id_usuarios = ?";
    db.query(sql,[email, contraseña, rol, id_usuarios], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El usuario a modificar no existe"});
        };
        
        const usuarios = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(usuarios); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////

//// Eliminar  ////
const destroyUsuario = (req, res) => {
    const {id_usuarios} = req.params;
    const sql = "DELETE FROM usuarios WHERE id_usuarios = ?";
    db.query(sql,[id_usuarios], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El Usuario no existe"});
        };
        res.json({mesaje : "Usuario Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    alluser,
    showusuarios,
    storeUsuarios,
    updateusuario,
    destroyUsuario,
    buscarUsuarioPorEmail
};
