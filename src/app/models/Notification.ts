import { User } from './User';

export interface Notification{
    id:number,
    user:User,
    title:string,
    description:string,
    urlImage:string,
    viewed:boolean;
    date:Date
}