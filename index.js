import express from "express"
import http from "http"
import cors from "cors"
import {Server} from "socket.io"
import { roomHandeler } from "./sockets/roomHandeler/index.js"

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"], 
    }
})

io.on("connection", (socket) => {
    console.log("User is connected")

    // Request to join room
    // socket.on("join-room",() => {
    //     console.log("join req")
    // })

    roomHandeler({socket,io})

    // Handel disconnct
    socket.on("disconnect",()=>{
        console.log("user is disconnected")
    })

    // error 
    socket.on("error", (err)=>{
        console.error("socket error: ", err)
    })
})

app.get("/",(req,res) => {
    console.log("ping")
    return res.send({
        message: "Running"
    })
})


server.listen(3001, ()=>console.log("server is running at 3001"))