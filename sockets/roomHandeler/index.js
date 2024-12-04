import { v4 as uuidv4 } from "uuid";


let room = {}

// Room Handeker
export const roomHandeler = ({ socket, io }) => {

    // Room join
    socket.on("join-room", ({ roomId, peerId }) => {
        try {
            
            console.log("user req to join with id: ", roomId);
            socket.join(roomId);
            
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
            room[roomId] = []
            socket.emit("room-cretaed", { roomId });
            console.log("room create triggered", roomId);

        } catch (e) {

            console.log("Error at create-room socket: ", e)
            socket.emit("error", {
                message: "An error occurred while joining the room.",
            });

        }
    });
};
