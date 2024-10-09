/// CONTROLADORES DEL MODULO ///

// Campos de la tabla peliculas
// id_pelicula
// titulo
// fecha_estreno
// director

const db = require("../db/db");

//// METODO GET  /////

// Para todos las peliculas
const alluser = (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para una pelicula
const showusuarios = (req, res) => {
    const {id_usuarios} = req.params;
    const sql = "SELECT * FROM usuarios WHERE id_usuarios = ?";
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
const storeUsuarios = (req, res) => {
    const {nombre_usuario, email, nombre, apellido, contraseña, rol} = req.body;
    const sql = "INSERT INTO usuarios (nombre_usuario, email, nombre, apellido, contraseña, rol) VALUES (?,?,?,?,?,?)";
    db.query(sql,[nombre_usuario, email, nombre, apellido, contraseña, rol], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const usuario = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(usuario); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateusuario = (req, res) => {
    const {id_usuarios} = req.params;
    const {nombre_usuario, email, nombre, apellido, contraseña, rol} = req.body;
    const sql ="UPDATE usuarios SET nombre_usuario = ?, email = ?, nombre = ?, apellido = ?, contraseña = ?, rol = ? WHERE id_usuarios = ?";
    db.query(sql,[nombre_usuario, email, nombre, apellido, contraseña, rol, id_usuarios], (error, result) => {
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
    destroyUsuario
};
