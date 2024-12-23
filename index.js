import express from "express"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"
import dotenv from "dotenv"
import { redisClient } from "./models/redisClient.js"
import { roomHandeler } from "./sockets/roomHandeler/index.js"
import { getRedisValue, mainController } from "./controllers/mainController.js"

dotenv.config()

const app = express()

// Enable CORS for all origins
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"],
    }
})

// Handle new socket connections
io.on("connection", (socket) => {
    console.log("User is connected")

    // Handle room-related events
    roomHandeler({ socket, io, redisClient })

    // Handle socket disconnection
    socket.on("disconnect", () => {
        console.log("user is disconnected")
    })

    // Handle socket errors
    socket.on("error", (err) => {
        console.error("socket error: ", err)
    })
})

// Define a route for the root URL
app.get("/", mainController)

// Define a route for getting the value from Redis
app.get("/getRedisValue", getRedisValue)

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({
        message: "Something went wrong!",
        error: err.message
    })
})

// Start the server on port 3001
server.listen(3001, () => console.log("server is running at 3001"))