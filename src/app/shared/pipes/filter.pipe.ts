import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], keyword: string, status: string, currentItems: any[]): any {
  	let filteredItems = items
  	if (filteredItems) {
  		if (keyword && keyword.replace(/ /g, '') !== '') {
	  		filteredItems = filteredItems.filter((item) => {
		    	for (const i in item) {
		    		if (item[i].toLowerCase().indexOf(keyword.toLowerCase())>=0) {
		    			return true
		    		}
		    	}
		    	return false
		    })
	  	}
	  	if (status !== '') {
	  		filteredItems = filteredItems.filter((item) => {
		  		return item.status === status
		  	})
	  	}
  	}
  	currentItems['models'] = filteredItems
  	return filteredItems
  }

}
