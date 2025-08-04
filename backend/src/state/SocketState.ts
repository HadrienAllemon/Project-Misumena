import { IUser } from "../models/IUser";
import * as socketio from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "shared";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Room } from "../objects/Room";

interface ISocketState{
    rooms:Room[];
    users:IUser[];
    currentUser:IUser | null;
    io:socketio.Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any> | null;
    findRoom: (id:string) => Room|undefined;
    // client:socketio.Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any> | null
}

const SocketState:ISocketState = {
    rooms:[],
    users:[],
    currentUser:null,
    io:null,
    findRoom : (id:string) => SocketState.rooms.find(room => room.id === id)
}

export default SocketState;