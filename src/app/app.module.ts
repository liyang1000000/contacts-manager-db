import { BrowserModule } from '@angular/platform-browser'
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ContactsModule } from './contacts/contacts.module'
import { isPlatformBrowser } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'contact-manager'}),
    ContactsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
     const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the browser'
     console.log(`Running ${platform} with appId=${appId}`)
  }
  
}
