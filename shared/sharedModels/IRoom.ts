import {IUser} from "../../models/IUser";
import { VoteState } from "../../objects/VoteState";
import { IRoomVoteResults } from "./IRoomVoteResults";
interface roomsWords {
    [key:string]:string[];
}

export interface IRoom {
    id:string;
    users:IUser[];
    usersPlaying:IUser[] ;
    currentTurnUserId:string;
    userAdmin: IUser;
    currentGuesses:roomsWords;
    roomState:IRoomState;
    voteState:VoteState | null;
    results:IRoomVoteResults | null;
}

export type IRoomState = "idle" | "ongoing" | "voting" | "results"
