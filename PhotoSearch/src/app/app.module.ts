import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientJsonpModule, HttpClientModule, HttpInterceptor, withFetch } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
   SearchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
