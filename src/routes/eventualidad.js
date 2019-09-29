const express = require('express');
const router = express.Router();
const Eventualidad = require('../models/Eventualidad');



router.get('/eventualidad', (req, res) => {
    res.render('historias/eventualidad')
})

router.post('/historias/eventualidad',async (req, res) => {
    const {Nombres, Apellidos, Eventualidad} = req.body; 
    const errors = [];
    if(!Nombres){
        errors.push({text: 'Ingrese por favor el Nombre'});
    }
    if(!Apellidos){
        errors.push({text: "Ingrese por favor Apellidos"});
    }
    if(!Eventualidad){
        errors.push({text:"Agregue una eventualidad"}); 
    }

    if(errors.length > 0){
        res.render('historias/eventualidad', {
            errors,
            Nombres,
            Apellidos,
            Eventualidad
        });
    } else{
        const newEventualidad = new Eventualidad({Nombres, Apellidos}); 
        await newEventualidad.save(); 
        res.redirect('/eventualidad'); 
    }
    

});

router.get('/eventualidad', (req, res) => {
    res.send('Notes from database')
})


module.exports = router;