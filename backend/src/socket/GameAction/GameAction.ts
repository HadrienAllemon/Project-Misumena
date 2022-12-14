import { Socket } from "socket.io";
import { IUser } from "../../models/IUser";
import { IWord, IWordsList } from "../../models/IWords";
import { SocketClient } from "../../shared/SocketModels";
import SocketState from "../../state/SocketState";
import { getUser } from "../users/UsersAction";
const wordlist: IWordsList = require("../../../words.json");

export const SubmitWord = (user: IUser, word: string, client: SocketClient) => {
    console.log("submit word > ", word);
    try {
        const room = SocketState.findRoom(user.room);
        if (!room) throw "Room not found : " + user.room;
        const newUserArray = room?.submitWord(user.id, word);
        SocketState.io?.in(user.room).emit('setRoom', room.toJson(), newUserArray);
        console.log("submit word to room >", room?.id);
    } catch (error: any) {
        console.error(error);
        client.emit("error", error?.message || error);
    }
}

export const StartGame = (user: IUser, client: SocketClient) => {
    try {
        const room = SocketState.findRoom(user.room);
        if (!room) throw "Room not found : " + user.room;
        const newUserArray: IUser[] = room?.startGame(user, getRandomWord());
        newUserArray.forEach((user) => {
            SocketState.io?.to(user.id).emit("setRoom", room?.toJson(), undefined, user);
        });
    } catch (error: any) {
        console.error(error);
        client.emit("error", error?.message || error);
    }
}

const getRandomWord = (): IWord => {
    const index = Math.floor(Math.random() * wordlist.words.length);
    return wordlist.words[index];
}

export const callVote = (client: SocketClient) => {
    try {
        const user = getUser(client.id);
        if (!user) throw "User not found : " + client.id;
        const room = SocketState.findRoom(user.room);
        if (!room) throw "Room not found : " + user.room;
        room.startVote(user);
        SocketState.io?.in(user.room).emit('setRoom', room?.toJson());
    } catch (error: any) {
        console.error(error);
        client.emit("error", error?.message || error);
    }
}

export const confirmVote = (userGuessed: string, wordGuessed: string, client: SocketClient) => {
    try {
        const user = getUser(client.id);
        if (!user) throw "user not found : " + client.id;
        const room = SocketState.findRoom(user?.room);
        if (!room) throw "Room not found : " + user.room;

        room.confirmVote(user, userGuessed, wordGuessed);
        SocketState.io?.in(user.room).emit('setRoom', room);
    } catch (error: any) {
        console.error(error);
        client.emit("error", error?.message || error);
    }
}