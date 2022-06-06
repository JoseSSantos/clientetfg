export interface IDate{
    year:number,
    month:number,
    day:number
}
export interface ITime {
    hour: number,
    minute: number
}
export interface IFecha {
    date: IDate,
    time: ITime
}
export interface I2Send{
    id: number
}