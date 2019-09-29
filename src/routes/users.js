const { Router } = require('express');
const router =  Router ();
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/users/signin', (req, res) => {
    res.render('users/signin'); 
})

router.get('/users/signup', (req, res)=> {
    res.render('users/signup')
});

router.post('/users/signup', urlencodedParser, (req, res) =>{
    console.log("######################################################");
    console.log("######################################################", req);
    console.log("######################################################", res);
    console.log("###################################################### body", req.body);
    res.send('ok');
})

module.exports = router; 