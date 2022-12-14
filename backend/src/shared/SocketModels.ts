import { IUser } from "../models/IUser";
import { Room } from "../objects/Room";
import * as socketio from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IRoom } from "./sharedModels/IRoom";
import { VoteState } from "../objects/VoteState";

export interface loginCallBack {
    users:IUser[];
    room:Room;
    currentUser:IUser;
}

// Shortcut for socketio.Socket
export interface SocketClient extends socketio.Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>{}

export interface ClientToServerEvents {
    login: (args:{name:string, room:string}, callback: (callbackElm:loginCallBack)=>void) => Promise<void>,
    disconnect: (reason:string) => void;
    submitWord:(user:IUser, word:string)=>void;
    startGame: (userAdmin : IUser) => void;
    callVote: (user:IUser) => void;
    confirmVote: (userGuessed:string, wordGuessed:string) => void;
}

export interface ServerToClientEvents {
    notification: (args:{title:string, description:string}) => void;
    users:(users:IUser[]) => void;
    setRoom:(room:IRoom, users?:IUser[], currentUser?: IUser) => void;
    loginSuccess:(callbackElm:loginCallBack) => void;
    error:(error:string) => void;
    // startVote:(voteState:VoteState) => void;
}