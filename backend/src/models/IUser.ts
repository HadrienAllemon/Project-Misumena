export interface IUser{
    id:string;
    name:string;
    room:string;
    isHisTurn:boolean;
    assignedWord?:string;
    score?:number;
}