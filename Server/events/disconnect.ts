import { Server, Socket } from "socket.io";

export default {
    name: "disconnect",
    ws: (io: Server, socket: Socket, args:any) => {
        io.in("chat-room").emit("leaveChat", {user: socket.data.username, join:false});
        console.log(new Date(), ` ${socket.data.username} juste left the chat...`);
    }
};