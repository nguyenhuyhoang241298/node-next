export enum SocketEvent {
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  LEAVE_ALL_ROOMS = 'leaveAllRooms',
  CONNECT = 'connection',
  DISCONNECT = 'disconnect',
  TYPING = 'typing',
  MESSAGE = 'message',
  REFRESH_DATA = 'refreshData',
  CONNECT_ERROR = 'connect_error',
  SEND_MESSAGE_TO_ROOM = 'sendMessageToRoom',
  CUSTOMER_NOTIFY = 'customerNotify',
}

const {
  JOIN_ROOM,
  LEAVE_ROOM,
  LEAVE_ALL_ROOMS,
  CONNECT,
  DISCONNECT,
  TYPING,
  MESSAGE,
  REFRESH_DATA,
  CONNECT_ERROR,
  SEND_MESSAGE_TO_ROOM,
  CUSTOMER_NOTIFY,
} = SocketEvent

interface Events {
  [JOIN_ROOM]: (
    data: {
      roomId: string
      userType: string
      agentId?: number
      organizationId: number
    },
    callback?: (response: any) => void,
  ) => void

  [LEAVE_ROOM]: (roomId: string) => void

  [LEAVE_ALL_ROOMS]: () => void

  [CONNECT]: () => void

  [DISCONNECT]: () => void

  [TYPING]: () => void

  [MESSAGE]: (message: string) => void

  [REFRESH_DATA]: () => void

  [CONNECT_ERROR]: (err: any) => void

  [SEND_MESSAGE_TO_ROOM]: () => void

  [CUSTOMER_NOTIFY]: (data: {
    organizationId: number
    message: string
    userId?: number
    roomId?: string
  }) => void
}

export interface ServerToClientEvents extends Events {} //on

export interface ClientToServerEvents extends Events {} //emit
