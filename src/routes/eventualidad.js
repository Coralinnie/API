const express = require('express');
const router = express.Router();
const eventualidad = require('../models/Eventualidad');

router.get('/eventualidad', (req,res) => {
    res.render('partials/eventualidad')
})

router.post('/partials/eventualidad', (req, res) => {
    const {Nombres, Apellidos} = req.body;
    const errors = []; 
    if(!Nombres){
        errors.push({text: 'Por favor ingrese el nombre del paciente'})
    }
    if(!Apellidos){
        errors.push({text: 'Por favor los apellidos del paciente'})
    }
    if(errors.length > 0 ){
        res.render('partials/eventualidad', {
            errors,
            Nombres,
            Apellidos
        })
    } else {
        res.send('ok')
    }
}); 

module.exports = router;