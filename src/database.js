const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Adminc:12345@cluster0-vtbhu.mongodb.net/pacientes',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));