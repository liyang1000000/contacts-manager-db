import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'
import { SharedModule} from './shared/shared.module'

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SharedModule
  ],
  exports: [
  	RouterModule
  ]
})
export class AppRoutingModule { }
