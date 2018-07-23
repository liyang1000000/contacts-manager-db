import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(rows, start, end, args): any {
    if (rows) {
    	return rows.slice(start-1, end)
    }
  }

}
