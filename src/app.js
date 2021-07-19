import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import mqtt from 'mqtt'

import { createServer } from 'http'

// importamos las rutas
// import wapRoutes from "./routes/waps.routes";
import reportRoutes from './routes/report.routes'


import { createRoles, createAdmin } from "./libs/initialSetup"

// importamos los modelos
// import Tracking from './models/Tracking'
import House from './models/House'


const app = express();

// config sockets
const server = createServer(app)
const io = require('socket.io')(server)

createRoles();
//createAdmin(); // para mejorar el codigo del weon de fazt

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000"
};
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Welcome Routes

// Routes
// app.use("/api/waps", wapRoutes)
app.use('/api/report', reportRoutes)


// Sockets
let USERS = {}

io.on("connection", (socket) => {
  console.log(`${socket.id} was connected`)
  USERS[socket.id] = socket

  socket.on('disconnect', () => {
    console.log(`${socket.id} was disconnected`)
  })
})

const options = {
  clientId: 'SERVER-AEROGENERADOR',
  username: 'ServerNode',
  password: ''
}

const connectUrl = 'ws://143.198.128.180:8083/mqtt'
const client = mqtt.connect(connectUrl, options)
client.on('connect', () => {
  console.log('Client connected by SERVER:')
  // Subscribe
  client.subscribe('unsaac/aerogenerador/#', { qos: 0 })
})

client.on('message', async (topic, message) => {
  const data = JSON.parse(message.toString())
  console.log(data)
  if (data) {
    const new_device = new House(data)
    await new_device.save()
  }
})

setInterval(async () => {
  let sensors = await House.find().sort({_id: -1}).limit(1)
  for (let i in USERS) {
    USERS[i].emit('sensors', sensors)
    // USERS[i].emit('winex', winex)
  }
}, 5000)

server.listen(3000, () => {
  console.log('server is ok')
})

export default app