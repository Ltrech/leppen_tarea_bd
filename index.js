// CONFIGURAR LO QUE SERIA UN SERVIDOR CON LAS MINIMAS PRESTACIONES PARA CORRER EXPRESS
// Que este escuchando y tengamos una ruta principal "/" en el proyectoconst express = require("express");


const express = require("express");


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');


// Otras rutas y configuraciones

app.get('/registro', (req, res) => {
    res.render('registro');
});


const usuariosRouter = require('./routers/usuarios.router');
app.use('/usuarios', usuariosRouter);

const pacientesRouter = require('./routers/pacientes.router');
app.use('/pacientes', pacientesRouter);

const rolRouter = require('./routers/rol.router');
app.use('/rol', rolRouter);

const rol_por_usuarioRouter = require('./routers/rol_por_usuario.router');
app.use('/rol_por_usuario', rol_por_usuarioRouter);

const hcRouter = require('./routers/historia_clinica.router');
app.use('/historia_clinica', hcRouter);

const tipo_sesionRouter = require('./routers/tipo_sesion.router');
app.use('/tipo_sesion', tipo_sesionRouter);

// Ruta principal
app.get("/", (req, res) => {
    res.send("Hola Psicologos");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
