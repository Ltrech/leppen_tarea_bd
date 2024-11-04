// CONFIGURAR LO QUE SERIA UN SERVIDOR CON LAS MINIMAS PRESTACIONES PARA CORRER EXPRESS
// Que este escuchando y tengamos una ruta principal "/" en el proyecto


const express = require("express");
const app = express();

app.use(express.json());
// en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera
// lo voy a poder utilizar

const usuariosRouter = require('./routers/usuarios.router');
app.use('/usuarios', usuariosRouter);
// Siempre que me refiera a usuarios le coloco el prefijo

const pacientesRouter = require('./routers/pacientes.router');
app.use('/pacientes', pacientesRouter);
// Siempre que me refiera a usuarios le coloco el prefijo


app.get("/", (req, res) => {
    res.send("Hola Psicologos");
});
// Esta es la ruta principal del proyecto "/"

const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));