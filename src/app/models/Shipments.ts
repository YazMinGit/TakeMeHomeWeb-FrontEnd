import { Order } from './Order';
import { User } from './User';
import { State } from './State';
export interface Shipment{
    id:number;
    order:Order | null;
    user:User;
    state:State;
    payment:number;
    paymentDate:Date;
    arrivalDate:Date;
    
}