import { User } from './User';
import { Category } from './Category';
export interface Comentario{
    id:number,
    userSend:User,
    userReceives:User,
    title:string,
    category:Category,
    content:string,
    date:Date
}