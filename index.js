const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const authRouter = require('./routes/authRoutes');

app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}))

/* CONFIGURACION PARA FORMULARIO */
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


/* ROUTES*/
app.use(authRouter)

app.listen(4500,()=>{
    console.log('servidor ejecutandose')
})