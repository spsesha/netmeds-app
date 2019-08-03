const mongoose = require('mongoose'),
    Schema = mongoose.Schema

let chatSchema = new Schema({
    room: { type: String },
    user: { type: String },
    doctor: { type: String },
    createdDate: { type: Date },
    messages: [
        {
            type: { type: String },
            username: { type: String },
            message: { type: String }
        }
    ]
})

module.exports = mongoose.model('Chat', chatSchema)