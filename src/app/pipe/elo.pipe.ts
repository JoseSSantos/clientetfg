import { Pipe, PipeTransform } from '@angular/core';
import { IFecha } from '../model/model-interfaces';

@Pipe({ name: 'elo' })
export class eloPipe implements PipeTransform {
    transform(value: string):string {
    
        return './'+value+".png";
        return("");
    }
}