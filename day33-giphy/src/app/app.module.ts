import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ResultComponent } from './components/result/result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { GiphyService } from './services/giphy.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
