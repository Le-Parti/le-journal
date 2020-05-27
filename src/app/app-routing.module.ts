import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/general/contact/contact.component';
import { HomeComponent } from './components/general/home/home.component';
import { NotFoundComponent } from './components/general/not-found/not-found.component';
import { ArticleComponent } from './components/article/article.component';

const generalRoutes: Routes = [
  { path: '', redirectTo: '/chronologie', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  { path: 'chronologie', component: HomeComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: '**', component: NotFoundComponent }, // 404
];

const routes: Routes = generalRoutes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
