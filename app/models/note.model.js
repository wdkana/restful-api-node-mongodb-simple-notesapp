const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title: String,
    content: String 
    }, {
        timestamp: true
    })

module.exports = mongoose.model('Note', NoteSchema)