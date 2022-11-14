import { Shipment } from './Shipments';
import { User } from './User';
export interface Order{
    id:number;
    limitDate:Date;
    destinationCountry:string;
    destinationCity:string;
    destinationAddress:string;
    originCountry:string;
    originCity:string;
    nameProduct:string;
    categoryProduct:string;
    priceProduct:number;
    urlProduct:string;
    dimensionsProduct:string;
    user:User;
    shipment:Shipment;
}