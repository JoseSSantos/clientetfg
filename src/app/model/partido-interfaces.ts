import { IEquipo } from "./equipo-interfaces";
import { I2Send, IFecha } from "./model-interfaces";



export interface IPartido {
    id:number,
    equipo1:IEquipo,
    equipo2:IEquipo,
    fecha: IFecha
}
export interface IPartido2Send{
    id:number,
    equipo1:I2Send,
    equipo2:I2Send,
    fecha: IFecha
}
export interface IPartidoNew{
    id:number,
    equipo1:I2Send,
    fecha: IFecha
}
export interface IPartidoPage {
    content: IPartido[];
    totalElements: number,
    totalPages: number
}