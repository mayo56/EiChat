import { Server, Socket } from "socket.io";

interface wstest {
    (io: Server, socket: Socket, args:any):void
};

export type eventWS = {
    name: string;
    off?: boolean;
    ws: wstest
};