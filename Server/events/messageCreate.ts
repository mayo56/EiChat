import { Server, Socket } from "socket.io";

export default {
    name: "messageSend",
    ws: (io: Server, socket: Socket, args:any) => {
        io.in("chat-room").emit("messageCreate", (args));
    }
};