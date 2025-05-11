import React, { useEffect, useMemo, useReducer, useRef } from 'react'
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
} | {
    type:"test"
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

const SocketReducer = (state: SocketState, action: SocketDispatch): SocketState => {
    switch (action.type) {
        case "setUsers":
            return { ...state, usersInRoom: action.users || [] };
        case "setRoom":
            return {
                ...state,
                room: action.room || null,
                usersInRoom: action.users || state.usersInRoom,
                currentUser:
                    action.currentUser ||
                    action.users?.find(u => u.id === state.currentUser?.id) ||
                    state.currentUser
            };
        case "loginSuccess":
            return {
                ...state,
                room: action.room,
                usersInRoom: action.users,
                currentUser: action.currentUser
            };
        case "error":
            return { ...state, isError: true, error: action.error };
        case "errorAknowledged":
            return { ...state, isError: false };
        case "setVoteState":
            return { ...state, voteState: action.voteState };
        default:
            return state;
    }
};

const createSafeDispatch = (dispatch: React.Dispatch<SocketDispatch>, socket: Socket, getState: () => SocketState) => {
    return (action: SocketDispatch) => {
        console.log(action);
        switch (action.type) {
            case "login":
                socket?.emit(SocketEmit.login, { name: action.name, room: action.room }, console.log);
                break;
            case "submitWord":
                socket.emit("submitWord", getState().currentUser, action.word);
                break;
            case "startGame":
                socket.emit("startGame", getState().currentUser);
                break;
            case "callVote":
                socket.emit("callVote", getState().currentUser);
                break;
            case "confirmVote":
                socket.emit("confirmVote", action.userGuessed, action.wordGuessed);
                break;
        }

        dispatch(action); // Always update local state too
    };
};

interface defaultValue {
    socket?: Socket
    state: SocketState;
    dispatch: React.Dispatch<SocketDispatch>;
}

const SocketContext = React.createContext<{
    state: SocketState;
    dispatch: (action: SocketDispatch) => void;
    socket: Socket;
}>({ state: initalState, dispatch: () => {}, socket: null });

const SocketProvider = ({ children }) => {
    const [state, rawDispatch] = useReducer(SocketReducer, initalState);
    const socketRef = useRef<Socket>(socket);

    useEffect(() => {
        initSocket(socketRef.current, rawDispatch);
    }, []);

    const safeDispatch = useMemo(
        () => createSafeDispatch(rawDispatch, socketRef.current, () => state),
        [state]
    );

    return (
        <SocketContext.Provider value={{ state, dispatch: safeDispatch, socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    );
};


export { SocketContext, SocketProvider }