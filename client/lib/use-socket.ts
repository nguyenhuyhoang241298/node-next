import { SocketEvent } from '@/type/socket'
import { useEffect, useState } from 'react'
import { socket } from './socket'

export function useSocket() {
  const [socketConnected, setSocketConnected] = useState(socket.connected)

  function onConnect() {
    setSocketConnected(true)
  }

  function onDisconnect() {
    setSocketConnected(false)
  }

  useEffect(() => {
    socket.on(SocketEvent.CONNECT, onConnect)

    socket.on(SocketEvent.DISCONNECT, onDisconnect)

    socket.on(SocketEvent.CONNECT_ERROR, (err: any) => {
      console.log('CONNECT_ERROR: ', err)
    })

    return () => {
      socket.off(SocketEvent.CONNECT, onConnect)
      socket.off(SocketEvent.DISCONNECT, onDisconnect)
      socket.off(SocketEvent.CONNECT_ERROR)
    }
  }, [])

  return { socketConnected, socket }
}
