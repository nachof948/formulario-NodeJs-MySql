const mysql = require('mysql');
const path = require('path');
require('dotenv').config()

const dbConfig ={
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
/* CONEXION CON LA BASE DE DATOS */
const conexion = mysql.createConnection(dbConfig)

conexion.connect((error)=>{
    if(error){
        console.log('Error al conectar' + error)
    } else{
        console.log('Conexion exitosa')
    }
})
/* SIGN UP */
module.exports.signup_post = (req, res) =>{
    let { emailOrPhone, fullName, password } = req.body;

    const selectQuery = 'SELECT * FROM cuentas WHERE emailOrPhone = ?';
    const values = [emailOrPhone];

    conexion.query(selectQuery, values, (error, result) => {
        if (error) {
            res.send('<h1>Error al registrarse</h1>');
        } else {
            if (result.length > 0) {
                res.send('<h1>Este usuario ya está registrado</h1>');
            } else {
                const insertQuery = 'INSERT INTO cuentas (`emailOrPhone`, `fullName`, `password`) VALUES (?, ?, ?)';
                const insertValues = [emailOrPhone, fullName, password];
                conexion.query(insertQuery, insertValues, (insertError) => {
                    if (insertError) {
                        res.send('<h1>Error al registrarse</h1>');
                    } else {
                        res.send('<h1>Registro exitoso, muchas gracias!!</h1>');
                    }
                });
            }
        }
    })
}
module.exports.signup_get = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Sign-up.html'));
}

/* LOGIN */
module.exports.login_post = (req, res) =>{
    let { email, password } = req.body;

    if (email && password) {
        conexion.query('SELECT * FROM cuentas WHERE emailOrPhone = ? AND password = ?', [email, password], (error, resultado, fields) => {
            if (error) {
                res.send('<h1>Error al iniciar sesión</h1>');
                return;
            }
            if (resultado.length > 0) {
                req.session.loggedin = true;
                req.session.emailOrPhone = email;
                res.send(`<h1>Bienvenido tu email es ${email}</h1>`);
            } else {
                res.redirect('/signup'); // Redirecciona a la página de registro
            }
        });
    } else {
        res.send('<h1>Por favor, ingrese sus credenciales</h1>');
    }
}
module.exports.login_get = (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/Log-in.html'));
}