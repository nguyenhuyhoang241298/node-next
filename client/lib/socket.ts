import { ClientToServerEvents, ServerToClientEvents } from '@/type/socket'
import { io, Socket } from 'socket.io-client'

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.NEXT_PUBLIC_SOCKET_URL ?? '',
)
