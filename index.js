// CONFIGURAR LO QUE SERIA UN SERVIDOR CON LAS MINIMAS PRESTACIONES PARA CORRER EXPRESS
// Que este escuchando y tengamos una ruta principal "/" en el proyecto


const express = require("express");
const app = express();

app.use(express.json());
// en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera
// lo voy a poder utilizar

const usuariosRouter = require('./routers/usuarios.router');
app.use('/usuarios', usuariosRouter);
// Tabla Usuarios

const pacientesRouter = require('./routers/pacientes.router');
app.use('/pacientes', pacientesRouter);
// tabla Pacientes

const rolRouter= require('./routers/rol.router');
app.use('/rol', rolRouter);
// Tabla Rol


const rol_por_usuarioRouter= require('./routers/rol_por_usuario.router');
app.use('/rol_por_usuario', rol_por_usuarioRouter);
// Tabla Rol_por_usuario

const hcRouter= require('./routers/historia_clinica.router');
app.use('/historia_clinica', hcRouter);
// Tabla Historia clinica//

const tipo_sesionRouter= require('./routers/tipo_sesion.router');
app.use('/tipo_sesion', tipo_sesionRouter);
// Tabla Historia clinica//



app.get("/", (req, res) => {
    res.send("Hola Psicologos");
});
// Esta es la ruta principal del proyecto "/"

const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));