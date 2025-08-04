import { IUser } from "./IUser";
import { IRoom } from "./IRoom";

export interface loginCallBack {
    users:IUser[];
    room:IRoom;
    currentUser:IUser;
}

// Shortcut for socketio.Socket

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