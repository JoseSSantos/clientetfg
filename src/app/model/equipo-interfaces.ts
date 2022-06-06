import { IFile } from "./file-interface"

export interface IEquipo {
    id: number,
    nombre: string,
    descripcion: string,
    siglas:string,
    file:IFile
}
export interface IEquipoPage{
    content: IEquipo[],
    totalElements: number,
    totalPages: number
}