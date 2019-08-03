const Chat = require('../db/schemas/chat.db')

module.exports.getChatList = (req, res, next) => {
    let username = req.query.username || ''
    Chat.find({user: username}, {_id: 0, messages: 0})
        .exec((err, data) => {
            if(err) return next(err)
            res.json(data)
        })
}

module.exports.getChatHistory = (req, res, next) => {
    let room = req.query.room || ''
    Chat.findOne({room: room}, {_id: 0, messages: 1})
        .exec((err, data) => {
            if(err) return next(err)
            res.json(data)
        })
}

module.exports.createRoom = (room, user, next) => {
    Chat.create({room: room, user: user, createdDate: new Date()}, (err, data) => next(err, data))
}

module.exports.roomEvent = (room, doctor, type, next) => {
    Chat.findOneAndUpdate({room: room}, {doctor: doctor, $push: { messages: {username: doctor, type: type}}})
        .exec((err, data) => {
            next(err, data)
        })
}


module.exports.addMessage = (room, data, next) => {
    Chat.findOneAndUpdate({room: room}, {$push: {messages: data}})
        .exec((err, data) => next(err, data) )
}