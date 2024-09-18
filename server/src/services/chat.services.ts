import { Socket } from 'socket.io'

class ChatServices {
  connection(socket: Socket) {
    socket.on('message', (message: string) => {
      _io.emit('message', message)
    })
  }
}

export default new ChatServices()
