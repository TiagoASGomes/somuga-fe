import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateString',
  standalone: true,
})
export class TruncateStringPipe implements PipeTransform {
  transform(
    value: string,
    maxLength: number = 15,
    ellipsis: string = '...'
  ): unknown {
    if (value.length > maxLength) {
      return value.slice(0, maxLength) + ellipsis;
    }
    return value;
  }
}
