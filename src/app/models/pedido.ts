export interface Pedido{
    id:number;
    idCliente:number;
    fechaOrden: string;
    fechaLimite: string;
    paisRecibe:string;
    ciudad:string;
    direccion: string;
    paisTrae:string;
    url:string;
    nameProd:string;
    categoria:string;
    precio:number;
    dimensiones:string;
    estado: string;
}