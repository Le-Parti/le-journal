import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/general/contact/contact.component';
import { HomeComponent } from './components/general/home/home.component';
import { NotFoundComponent } from './components/general/not-found/not-found.component';
import { ArticleFooterComponent } from './components/general/article-footer/article-footer.component';
import { Article20200507Component } from './components/articles/2020-05-07/article20200507/article20200507.component';
import { Article20200513Component } from './components/articles/2020-05-13/article20200513/article20200513.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    NotFoundComponent,
    ArticleFooterComponent,
    Article20200507Component,
    Article20200513Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
