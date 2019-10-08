const express = require('express');
const router = express.Router();

// Models
const Note = require('../models/evento');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New Note
router.get('/eventualidad', isAuthenticated, (req, res) => {
  res.render('historias/eventualidad');
});

router.post('historias/eventualidad', isAuthenticated, async (req, res) => {
  const { Nombres, Apellidos, Eventualidad } = req.body;
  const errors = [];
  if (!Nombres) {
    errors.push({text: 'Por favor ingrese un nombre'});
  }
  if (!Apellidos) {
    errors.push({text: 'Por favor ingrese apellidos'});
  }
  if (!Eventualidad) {
    errors.push({text: 'Por favor ingrese eventualidad'});
  }
  if (errors.length > 0) {
    res.render('/historias/eventualidad', {
      errors,
      Nombres,
      Apellidos,
      Eventualidad
    });
  } else {
    const newNote = new Note({Nombres, Apellidos});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Eventualidad agregada');
    res.redirect('/');
  }
});



module.exports = router;