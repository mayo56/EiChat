import { Server, Socket } from "socket.io";

export default {
    name: "join",
    ws: (io: Server, socket: Socket, args:any) => {
        socket.data.username = args.user;
        socket.join("chat-room");
        io.in("chat-room").emit("joinChat", {user:args.user, join:true});
        console.log(new Date(), `${socket.data.username} juste join the chat ! `); 
    }
};