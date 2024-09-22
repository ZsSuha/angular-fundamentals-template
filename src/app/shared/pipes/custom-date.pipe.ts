import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'customDate'
})

export class CustomDatePipe implements PipeTransform {
    transform(date: Date, format: string = 'dd.MM.yyyy') {
        return new DatePipe('en-US').transform(date, format);
    }
}
