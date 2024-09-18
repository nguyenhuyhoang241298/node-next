'use client'

import { useSocket } from '@/lib/use-socket'
import { SocketEvent } from '@/type/socket'
import { useEffect } from 'react'
import Chat from './chat'

const SocketContainer = () => {
  const { socket } = useSocket()

  useEffect(() => {
    const receiveMessage = (message: string) => {
      const messageComing = document.getElementById('messageComing')
      if (!messageComing) return

      const item = document.createElement('p')
      item.textContent = message
      messageComing.appendChild(item)
    }

    socket.on(SocketEvent.MESSAGE, receiveMessage)

    return () => {
      socket.off(SocketEvent.MESSAGE, receiveMessage)
    }
  })

  return <Chat socket={socket} />
}

export default SocketContainer
