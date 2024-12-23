import { v4 as uuidv4 } from "uuid";
// import { redisClient } from "../../models/redisClient";
import { redisClient } from "../../models/redisClient.js";

// let room = {};


//Room join function
export const handleJoinRoom = (socket, { roomId, peerId }) => {
    try {

    
        console.log("peerid: ", peerId);
        console.log("roomId: ", roomId);

        socket.join(roomId);
        // room[roomId].push(peerId);

        // Letting all user know about the new user
        socket.to(roomId).emit("user-joined", { peerId });

        // removing all disconnected members
        socket.on("disconnect", () => {
            // room[roomId] = room[roomId].filter((id) => id !== peerId);
            console.log("room: ", roomId);

            // Letting all user know about the disconnected user
            socket.to(roomId).emit("user-disconnected", peerId);
        });

        socket.emit("get-user", {
            roomId,
            peerId,
        });
    } catch (e) {
        console.log("error at joining: ", e);
        socket.emit("error", {
            message: "An error occurred while joining the room.",
        });
    }
};

// Room create function  
export const handleCreateRoom = (socket) => {
    try {
        const roomId = uuidv4();
        socket.join(roomId);
        // room[roomId] = [];
        socket.emit("room-cretaed", { roomId });
        console.log("room create triggered", roomId);
    } catch (e) {
        console.log("Error at create-room socket: ", e);
        socket.emit("error", {
            message: "An error occurred while joining the room.",
        });
    }
};
