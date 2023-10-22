import express from "express";
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000
const app = express()

// http server
const server = createServer(app)

// Web sockets server
const io = new Server(server)
io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message', (msg) => {
        console.log('message: '+ msg)
    })
})

app.use(logger('dev'))
app.get('/', (req, res) => {
    res.sendFile(process.cwd()+'/client/index.html')
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

