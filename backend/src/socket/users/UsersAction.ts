import { IUser } from "../../models/IUser"
import SocketState from "../../state/SocketState";

export const addUser = (id:string, name:string, room:string):IUser => {
    const existingUser = SocketState.users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())
    if (existingUser) throw  "Username has already been taken" ;
    if (!name && !room) throw  "Username and room are required" ;
    if (!name) throw  "Username is required" ;
    if (!room) throw  "Room is required" ;

    const user = { id, name, room, isHisTurn:false }
    SocketState.users.push(user);
    return user;
}

export const getUser = (id:string) => {
    let user = SocketState.users.find(user => user.id === id);
    return user;
}

export const getUsers = (room:string) => SocketState.users.filter(user => user.room === room)

export const deleteUser = (id:string) => {
    const index = SocketState.users.findIndex((user) => user.id === id);
    if (index !== -1) return SocketState.users.splice(index, 1)[0];
}

