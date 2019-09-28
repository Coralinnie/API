const express = require('express');
const app = express(); 
const cors = require('cors');
const path = require('path');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const session = require('express-session');

//initilizations
require('./database'); 


//configuraciones/settings
app.set('port', process.env.PORT || 3000); 
app.set('json spaces', 2);

//hbs
const exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));

//rutas a nivel de proyecto
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); 
app.use(express.json()); 
app.use(cors());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'my secret site',
    resave: true,
    saveUninitialized: true
})); 

//routes
app.use(require('./routes/index')); 
app.use(require('./routes/eventualidad')); 
app.use(require('./routes/users'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Empezando el servidor/starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});