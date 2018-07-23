import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationModule, ModalModule } from 'ngx-bootstrap'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { PaginationPipe } from './pipes/pagination.pipe'
import { FilterPipe } from './pipes/filter.pipe'
import { NotificationsComponent } from './notifications/notifications.component'
import { NotificationsService } from './notifications/notifications.service'

@NgModule({
  imports: [
  	CommonModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
  	PageNotFoundComponent,
  	PaginationPipe,
  	FilterPipe,
  	NotificationsComponent
  ],
  exports: [
  	CommonModule,
  	PaginationModule,
  	ModalModule,
  	PageNotFoundComponent,
  	PaginationPipe,
  	FilterPipe,
  	NotificationsComponent
  ],
  providers: [
  	NotificationsService
  ]
})
export class SharedModule { }
