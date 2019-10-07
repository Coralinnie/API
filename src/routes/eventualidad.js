const express = require('express');

const router = express.Router();

const Eventualidad = require('../models/Eventualidad');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/eventualidad', (req, res) => {
    res.render('historias/eventualidad')
})

router.post('/historias/eventualidad', urlencodedParser, (req, res) => {
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
        const newEventualidad = new Eventualidad({Nombres, Apellidos, Eventualidad}); 
    //await newEventualidad.save(); 
        console.log(newEventualidad); 
       
        res.send('ok');
    }
    

});

router.get('/eventualidad', (req, res) => {
    res.send('Notes from database')
})


module.exports = router;