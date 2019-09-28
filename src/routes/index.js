const { Router } = require('express');
const router =  Router ();



router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/about', async (req, res) => {
    res.render('About');
});


module.exports = router; 