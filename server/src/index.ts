import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import { createServer } from 'http'
import createError from 'http-errors'
import logger from 'morgan'
import path from 'path'
import { Server } from 'socket.io'
import appRouter from './routes'
import ChatServices from './services/chat.services'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './type'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:3000']
  })
)
app.use(express.static(path.join(__dirname, 'public')))

// router
app.use('/', appRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(500)
  res.json({ error: err })
})

const server = createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})
io.listen(process.env.SOCKET_POST ? Number(process.env.SOCKET_POST) : 8000)
global._io = io
global._io.on('connection', ChatServices.connection)

server.listen(process.env.PORT, () => {
  console.log('Server running...')
})

export { app, server }
