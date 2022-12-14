import {IUser} from "../../../backend/src/models/IUser";

export interface IVoteStateClient{
    caller:IUser;
    user_accusation: {[key:string]:string}; // a user accuses another user via its id
    user_wordGuess: {[key:string]:string};
    userVoted?: string[];
}