import { IUser } from "../models/IUser";

interface vote_return{
    accusations: {[key:string]:string};
    wordGuesses: {[key:string]:string};
}

export class VoteState{
    public caller:IUser|null=null;
    public user_voted: string[] = [];
    #user_accusation: {[key:string]:string} = {} // a user accuses another user via its id
    #user_wordGuess: {[key:string]:string} = {} // a user can guess the intruder's word
    constructor(caller:IUser|null){
        this.caller = caller;
    }

    public addVote(userId: string, accusation:string, wordGuessed:string = ""):string[]{
        if (this.user_voted.includes(userId)) return this.user_voted;
        this.#user_accusation[userId] = accusation
        if (wordGuessed.length) this.#user_wordGuess[userId] = wordGuessed;
        this.user_voted.push(userId)
        return this.user_voted;
    }

    // function to return votes, the votes are kept private to facilitate transit to front-end
    public get_votes():vote_return{
        return {accusations: this.#user_accusation, wordGuesses : this.#user_wordGuess}
    }
}