import { User } from './User';

export interface Support{
    id:number,
    user:User,
    comment:string,
    date:Date,
}