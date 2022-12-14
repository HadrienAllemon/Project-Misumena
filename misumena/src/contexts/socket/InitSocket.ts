import { IRoom } from 'shared/sharedModels/IRoom';
import { IUser } from 'models/IUser';
import { ClientToServerEvents, loginCallBack, ServerToClientEvents } from 'shared/SocketModels'
import { Socket } from 'socket.io-client'
import { SocketDispatch } from './SocketContext'
import { IVoteStateClient } from 'models/IVoteStateClient';


export const initSocket = (Socket:Socket<ServerToClientEvents,ClientToServerEvents>, dispatch:React.Dispatch<SocketDispatch>) => {
    Socket.on("users", (users:IUser[])=>dispatch({type:"setUsers", users:users}))
    Socket.on("loginSuccess", (loginElm:loginCallBack) => dispatch({type:"loginSuccess", users:loginElm.users, room:loginElm.room, currentUser:loginElm.currentUser}))
    Socket.on("setRoom", (Room:IRoom, users?:IUser[], currentUser?:IUser) => dispatch({type:"setRoom", room:Room, users:users, currentUser:currentUser}))
    Socket.on("error", (error:string) => dispatch({type:"error", error:error}));
    // Socket.on("startVote", (voteState:IVoteStateClient) => dispatch({type:"setVoteState", voteState:voteState}))
}