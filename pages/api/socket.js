import { Server } from 'Socket.IO'
let savedContent = [
    {
        type: 'paragraph',
        children: [{ text: 'Test of my editor' }]
    }
]
const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {

        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io


        io.on('connection', socket => {
            socket.emit('start', savedContent)

            socket.on('content-change', content => {

                savedContent = content;

                io.emit('content-input', content);
            });
        })
    }

    res.end()
}

export default SocketHandler