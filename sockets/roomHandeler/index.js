import { v4 as uuidv4 } from "uuid";
import { createClient } from "redis";
import { handleJoinRoom, handleCreateRoom } from "./roomEvents.js";

/**
 * {
 *  "roomdId": ["peerIds"]
 * }
 */
let room = {};

// Room Handeler
export const roomHandeler = ({ socket, redisClient }) => {

    socket.on("join-room", (data) => {
        console.log("join-room triggered");
        handleJoinRoom(socket, data)
    });
    socket.on("create-room", () => {
        console.log("create-room triggered");
        handleCreateRoom(socket)
    });

};
