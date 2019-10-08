const { Router } = require('express');
const router =  Router ();
const {isAuthenticated} = require('../helpers/auth');



router.get('/', isAuthenticated, async (req, res) => {
    res.render('index');
});

router.get('/about', async (req, res) => {
    res.render('About');
});


module.exports = router; 