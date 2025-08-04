import { IUser } from "../../models/IUser";

export interface IRoomVoteResults{
    users_accusations: {[key:string]:string};
    intruder:string;
    intruderWord: string;
    othersWord: string;
    scoreModification: {[key:string]:number}; 
}