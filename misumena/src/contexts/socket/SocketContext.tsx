import React, { useEffect, useReducer } from 'react'
import io, { Socket } from 'socket.io-client'
import { IUser } from "models/IUser";
import { SocketEmit } from "shared/SocketAction"
import { ClientToServerEvents, loginCallBack, ServerToClientEvents } from 'shared/SocketModels';
import { initSocket } from './InitSocket';
import { IRoom } from 'shared/sharedModels/IRoom';
import { IVoteStateClient } from 'models/IVoteStateClient';
import { VoteState } from '../../../../backend/src/objects/VoteState';

// export const enum SocketEmit {
//     login="login",
//     connection="connection",
//     SendMessage="SendMessage" // to del
// }


const ENDPOINT = 'http://localhost:3080/';
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(ENDPOINT, { transports: ['websocket', 'polling'] })

export type SocketDispatch = {
    type: "setUsers";
    users?: IUser[];
} | {
    type: "setRoom",
    room?: IRoom;
    users: IUser[];
    currentUser?:IUser;
} | {
    type: "login",
    name: string,
    room: string
} | {
    type: "loginSuccess",
    users: IUser[],
    room: IRoom;
    currentUser: IUser;
} | {
    type: "submitWord",
    word: string
} | {
    type: "error",
    error: string
} | {
    type: "errorAknowledged"
} | {
    type:"startGame"
} | {
    type:"callVote"
} | {
    type:"setVoteState",
    voteState:IVoteStateClient
} | {
    type:"confirmVote",
    wordGuessed:string,
    userGuessed:string,
}

interface SocketState {
    room: IRoom | null,
    voteState:IVoteStateClient,
    usersInRoom: IUser[],
    currentUser: IUser,
    isError: boolean,
    error: string,
}

const initalState: SocketState = {
    room: null,
    voteState:null,
    usersInRoom: [],
    currentUser: null,
    isError: false,
    error: ""
}

const SocketReducer = (state: SocketState = initalState, action: SocketDispatch): SocketState => {
    console.log("type", action.type);
    switch (action.type) {
        case "setUsers":
            return {
                ...state,
                usersInRoom: action.users || []
            }
        case "setRoom":
            console.log(state,action);
            return {
                ...state,
                room: action.room || null,
                usersInRoom: action.users || state.usersInRoom,
                currentUser: action.currentUser || action.users?.find((user) => user.id === state.currentUser.id) || state.currentUser
            }
        case "login": {
            socket?.emit(SocketEmit.login, { name: action.name, room: action.room }, console.log);
            return state;
        }
        case "loginSuccess": {
            return {
                ...state,
                room: action.room,
                usersInRoom: action.users,
                currentUser: action.currentUser
            }
        }
        case "submitWord": {
            socket?.emit("submitWord", state.currentUser, action.word);
            return state;
        }
        case "startGame": {
            socket?.emit("startGame", state.currentUser);
            return state;
        }
        case "callVote":{
            socket?.emit("callVote", state.currentUser);
            return state;
        }
        case "error": {
            return {
                ...state,
                isError: true,
                error: action.error
            }
        }
        case "errorAknowledged": {
            return {
                ...state,
                isError: false
            }
        }
        // case "setVoteState":{
        //     console.log(action.voteState);
        //     return {
        //         ...state,
        //         voteState:action.voteState
        //     }
        // }
        case "confirmVote":{
            socket.emit("confirmVote", action.userGuessed, action.wordGuessed)
        }
        default:
            return state;
    }

}

interface defaultValue {
    socket?: Socket
    state: SocketState;
    dispatch: React.Dispatch<SocketDispatch>;
}

const SocketContext = React.createContext<defaultValue>({ state: initalState, dispatch: () => { } });

const SocketProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SocketReducer, initalState);

    useEffect(() => initSocket(socket, dispatch),[]);

    return (
        <SocketContext.Provider value={{ state, dispatch, socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }