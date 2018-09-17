const Note = require('../models/note.model.js')

exports.create = (req, res) => {

    var newTitle = req.body.title
    var newContent = req.body.content

    if(!newContent){
        return res.status(400).send({
            messages : "cannot be blank"
        })
    }

    const note = new Note({
        title: newTitle || "Untitled Note",
        content: newContent
    })

    note.save()
    .then( data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            messages: err.messages || "Error when creating new notes..."
        })
    })



}

exports.findAll = (req, res) => {
    Note.find()
    .then(notes =>{
        res.send(notes)
    }).catch(err => {
        res.status(500).send({
            messages: err.messages || "Error when retrieving a notes"
        })
    })

}

exports.findOne = (req, res) => {
    
    var id = req.params.noteId

    Note.findById(id)
    .then(note => {
        if(!note){
            return res.status(404).send({
                messages: "Message Not Found (!note) " + id
            })
        }
        res.send(note)
    }).catch(err => {
        if(err.kind === ObjectId){
            return res.status(404).send({
                messages: "Messages Not Found (errkind objid) " + id
            })
        }

        return res.status(500).send({
            messages: "Error while founding a single message" + id
        })
    })
}

exports.update = (req, res) => {

    var id = req.params.noteId
    var newTitle = req.body.title
    var newContent = req.body.content

    if(!newContent){
        return res.status(400).send({
            messages: "Messages content cannot be blank"
        })
    }

    Note.findByIdAndUpdate(id, {
        title: newTitle || "Untitled New Message",
        content: newContent
    }, {new: true})
    .then(note => {
        if(!note){
            return res.status(404).send({
                messages: "id not found for this message" + id
            })
        }
        res.send(note)
    }).catch(err =>{
        if(err.kind === ObjectId){
            return res.status(404).send({
                messages: "id not found for this message" + id
            })
        }
        return res.status(500).send({
            messages: "Error while updating messages" + id
        })
    })

}

exports.delete = (req, res) => {

    var id = req.params.noteId

    Note.findByIdAndRemove(id)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + id
            })
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + id
            })
        }
        return res.status(500).send({
            message: "Could not delete note with id " + id
        })
    })
}