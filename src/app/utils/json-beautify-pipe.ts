import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'jsonBeautify' })
export class JsonBeautifyPipe implements PipeTransform {
  transform(value: any): string {
    return JSON.stringify(JSON.parse(value), null, 2);
  }
}