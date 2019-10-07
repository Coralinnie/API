const router = require('express').Router();
var bodyParser = require('body-parser')
const User = require('../models/users');
const passport = require('passport');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/users/signup', (req, res) => {
    res.render('users/signup')
});

router.post('/users/signup', urlencodedParser, async (req, res) => {

    let errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden.' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe tener por lo menos 4 caracteres.' })
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        // Confirmar si 
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {

            req.flash('error_msg', 'El email se encuentra en uso, intenta nuevamente.');
            res.redirect('/users/signup');

        } else {
            // Guardar nuevo usuario
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Te has registrado exitosamente.');
            res.redirect('/users/signin');
        }
    }
});
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

module.exports = router; 