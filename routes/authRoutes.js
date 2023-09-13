const {Router} = require('express');
const router = Router()
const authController = require('../controllers/authControllers')

/* METODO POST */
router.post('/signup', authController.signup_post)
router.post('/login', authController.login_post)

/* METODO GET */
router.get('/signup', authController.signup_get)
router.get('/login', authController.login_get)

module.exports = router
