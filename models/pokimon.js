const mongoose = require('mongoose');

const pokimonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    imgsrc: {
        type: String,
        required: true,
    }
});

const Pokimon = mongoose.model('Pokimon', pokimonSchema);
module.exports = Pokimon;
