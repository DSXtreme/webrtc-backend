import { v4 as uuidv4 } from "uuid";

/**
 * {
 *  "roomdId": ["peerIds"]
 * }
 */
let room = {};

// Room Handeker
export const roomHandeler = ({ socket, io }) => {
    /**
     * Room join
     * params: {roomid, peerId}
     *  roomId and peerId is coming from clent
     */

    socket.on("join-room", ({ roomId, peerId }) => {
        try {
            console.log("peerid: ", peerId);
            console.log("roomId: ", roomId);
            

            socket.join(roomId);
            room[roomId].push(peerId);

            socket.to(roomId).emit("user-joined",{peerId})

            // removing all disconnected members
            socket.on("disconnect", () => {
                room[roomId] = room[roomId].filter((id) => id !== peerId);
                console.log("room: ", room)
 
                // Letting all user know about the disconnected user
                socket.to(roomId).emit("user-disconnected", peerId)
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
    });

    // Create room
    socket.on("create-room", () => {
        try {
            const roomId = uuidv4();
            socket.join(roomId);
            room[roomId] = [];
            socket.emit("room-cretaed", { roomId });
            console.log("room create triggered", roomId);
        } catch (e) {
            console.log("Error at create-room socket: ", e);
            socket.emit("error", {
                message: "An error occurred while joining the room.",
            });
        }
    });
};
