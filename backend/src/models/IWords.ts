export interface IWordsList{
    words:IWord[]
}

export interface IWord{
    names:string[];
    accept: {[key:string]:string[]}
}