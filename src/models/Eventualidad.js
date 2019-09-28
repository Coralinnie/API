const mongoose = require ('mongoose');
const {Shema} = mongoose; 

const EvenSchema = new Schema ({
    Nombres: {type: String, required: true},
    Apellidos: {type: String, required:true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Eventualidad', EvenSchema)