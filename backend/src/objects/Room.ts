import { IRoom, IRoomState, IRoomVoteResults } from "shared";
import { IUser } from "../models/IUser";
import { IWord } from "../models/IWords";
import { VoteState } from "./VoteState";
interface roomsWords {
    [key: string]: string[];
}

interface IWordsHandler {
    wordData?: IWord;
    standardWord: string;
    intruderWord: string;
}

const initWordHandler: IWordsHandler = {
    standardWord: "",
    intruderWord: ""
}

export class Room {
    public id: string;
    public users: IUser[];
    public userAdmin: IUser;
    public usersPlaying: IUser[] = [];
    public currentTurnUserId: string;
    public currentGuesses: roomsWords = {};
    public results: IRoomVoteResults|null = null;
    
    //Modifiable variables
    public scoreUpGuessedUser: number = 50;
    public scoreUpGuessedWord:number = 100;
    public scoreDownGuessedUser:number = -50;
    public scoreDownGuessedWord: number = -100;
    public maxWordsPerRound: number = 3;
    public maxRound: number = 3;
    
    // Room controllers
    public currentRound: number = 0;
    public roomState: IRoomState = "idle";

    // public voteCaller:string = "";
    public voteState: VoteState | null = null;

    #wordsHandler: IWordsHandler = initWordHandler;
    #intruderId: string = "";
    constructor(id: string, users: IUser[]) {
        this.id = id;
        this.users = users;
        this.userAdmin = users[0];
        this.currentTurnUserId = users[0].id;
    }

    public passTurn(): void {
        const turnIndex = this.usersPlaying.findIndex((user) => user.id === this.currentTurnUserId);
        let nextUser: IUser;

        if (turnIndex === this.usersPlaying.length - 1) nextUser = this.usersPlaying[0];
        else nextUser = this.usersPlaying[turnIndex + 1];

        if (this.currentGuesses[nextUser.id]?.length >= this.maxWordsPerRound) {
            this.startVote();
            return;
        }

        this.usersPlaying[turnIndex].isHisTurn = false;
        nextUser.isHisTurn = true;
        this.currentTurnUserId = nextUser.id;
    }

    public startGame(byUser: IUser, word: IWord) {
        if (byUser.id !== this.userAdmin.id) throw "Could not launch game because you are not admin of the room";
        if (!word) throw "Could not find a word to start the game";
        this.#wordsHandler.wordData = word
        this.usersPlaying = this.users;
        this.usersPlaying.forEach((user, index) => user.isHisTurn = index === 0);
        this.assignWordsToUsers();
        this.roomState = "ongoing";
        return this.usersPlaying;
    }

    private assignWordsToUsers() {
        if (!this.#wordsHandler?.wordData || !this.usersPlaying?.length) throw "Could not assign words";
        [this.#wordsHandler.intruderWord, this.#wordsHandler.standardWord] = [...this.#wordsHandler?.wordData.names].sort(w => .5 - Math.random()).slice(0, 2);
        const intruderIndex = Math.floor(Math.random() * this.usersPlaying.length);
        this.usersPlaying.forEach((user, index) => user.assignedWord = index === intruderIndex ? this.#wordsHandler.intruderWord : this.#wordsHandler.standardWord);
        this.#intruderId = this.usersPlaying[intruderIndex].id;
    }

    public submitWord(userId: string, newWord: string) {
        if (this.currentTurnUserId !== userId) throw "It's not your turn";
        if (this.roomState !== "ongoing") return;
        if (this.currentGuesses[userId]) this.currentGuesses[userId].push(newWord);
        else this.currentGuesses[userId] = [newWord];
        this.passTurn();
        return this.users;
    }

    public startVote(user: IUser|null = null): void {
        if (this.roomState != "ongoing") return;
        if (!this.voteState) this.voteState = new VoteState(user);
        this.roomState = "voting";
    }

    public confirmVote(user: IUser, userGuessed: string, wordGuessed: string): IRoom {
        if (!this.voteState) throw "no votestate found for room " + this.id;
        if (this.roomState !== "voting") throw "we're not voting in this room right now";
        const user_voted:string[] = this.voteState.addVote(user.id, userGuessed, wordGuessed);
        if (user_voted.length === this.usersPlaying.length) this.closeVoting();
        return this.toJson();
    }

    public closeVoting() {
        if (!this.voteState) throw "could not find votestate for room " + this.id

        const scoreTrack:{[key:string]:number} = {};
        const {accusations, wordGuesses} = this.voteState.get_votes();
        this.usersPlaying.forEach(user => {
            let _userScore = 0;
            if (!user.score) user.score = 0;
            
            if (accusations[user.id] === this.#intruderId) _userScore += this.scoreUpGuessedUser;
            else _userScore += this.scoreDownGuessedUser
            
            let _intruderWordAccept = this.#wordsHandler.wordData?.accept[this.#wordsHandler.intruderWord];
            if (wordGuesses[user.id]) {
                if (_intruderWordAccept?.includes(wordGuesses[user.id])) _userScore += this.scoreUpGuessedWord;
                else _userScore += this.scoreDownGuessedWord;
            }

            user.score += _userScore;
            scoreTrack[user.id] = _userScore;
        })
        this.roomState = "results";
        this.results = {
            users_accusations:accusations,
            intruder:this.#intruderId,
            intruderWord:this.#wordsHandler.intruderWord,
            othersWord:this.#wordsHandler.standardWord,
            scoreModification: scoreTrack
        }
    }

    private getUserPlayingForClient(): IUser[] {
        return this.usersPlaying.map(user => ({ ...user, assignedWord: undefined }));
    }

    public toJson(): IRoom {
        return { ...this, usersPlaying: this.getUserPlayingForClient() };
    }
}