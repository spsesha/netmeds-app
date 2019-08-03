const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    io = require('socket.io')(http),
    bodyParser = require('body-parser'),
    mongoose = require('./db/mongoose'),
    chat = require('./controllers/chat.ctrl')

mongoose.connectDB()
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/chat-list', chat.getChatList)
app.get('/api/chat-history', chat.getChatHistory)


io.on('connection', (socket) => {

    socket.on('new-message', (message) => {
        io.emit('server-response', message)
    })

    socket.on('set-username', (data) => {
        socket.username = data.username
        socket.isDoctor = data.isDoctor
        if(data.isDoctor)
            socket.join('doctor')
    })

    socket.on('send-request', (room, cb) => {
        if(!socket.room) {
            socket.room = room
            socket.join(socket.room)
            io.to('doctor').emit('new-request', {username: socket.username, room: socket.room})
            chat.createRoom(room, socket.username, (err, data) => {
                cb(true)
            })
        }
    })

    socket.on('join-room', (room, cb) => {
        socket.room = room
        socket.leave('doctor')
        socket.join(room)
        socket.to(room).emit('doctor-chat', {username: socket.username, type: 'join'})
        io.to('doctor').emit('remove-request', {room: room})
        chat.roomEvent(room, socket.username, 'join', (err, data) => cb() )
    })

    socket.on('doctor-chat', (data) => {
        let temp = {type: 'msg', username: socket.username, message: data.message}
        chat.addMessage(socket.room, temp, (err, message) => {
            socket.to(socket.room).emit('doctor-chat', temp)
        })
    })

    socket.on('leave-room', () => {
        socket.leave(socket.room)
        if (socket.isDoctor)
            socket.join('doctor')
        chat.roomEvent(socket.room, socket.username, 'leave', (err, data) => {
            io.to(socket.room).emit('doctor-chat', {type: 'leave', username: socket.username})
            socket.room = undefined;
        })
    })

    socket.on('disconnect', () => {
        if(socket.room) {
            chat.roomEvent(socket.room, socket.username, 'leave', (err, data) => {
                io.to(socket.room).emit('doctor-chat', {type: 'leave', username: socket.username})
                socket.room = undefined;
            })
        }
    })
})

http.listen(port, () =>{
    console.log(`Server listening to port ${port}`)
})