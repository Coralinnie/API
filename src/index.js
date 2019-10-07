const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('req-flash');
const exphbs = require('express-handlebars');
//const cookieParser = require('cookie-parser');

//initilizations
require('./database');
require('./config/passport');


//configuraciones/settings
app.set('port', process.env.PORT || 3000);

//hbs
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
//app.use(cookieParser());
//app.use(session({ secret: '123' }));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

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