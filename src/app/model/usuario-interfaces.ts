import { ITipoUsuario } from "./tipousuario-interfaces";
import { IEquipo } from "./equipo-interfaces"
import { I2Send } from "./model-interfaces";

export interface IUsuario {
    id: number,
    login: string,
    email: string,
    summonername: string,
    accountid: string,
    wins:number |undefined,
    losses:number|undefined,
    profileiconid: number,
    summonerlevel: number,
    rank: string |undefined,
    tier: string |undefined,
    tipousuario: ITipoUsuario,
    equipo: IEquipo,
    discord:string,
    twitter:string,
    descripcion:string
}
export interface IUsuarioPage{
    content: IUsuario[],
    totalElements: number,
    totalPages:number
}
export interface IUsuario2Send{
    id: number,
    password: string,
    login: string,
    email: string,
    summonername: string,
    accountid: string,
    profileiconid: number,
    summonerlevel: number,
    wins:number,
    losses:number,
    rank: string,
    tier: string,
    tipousuario: I2Send,
    equipo: I2Send,
    discord:string,
    twitter:string,
    descripcion:string

}