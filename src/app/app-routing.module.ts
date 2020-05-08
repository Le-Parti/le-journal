import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/general/contact/contact.component';
import { HomeComponent } from './components/general/home/home.component';
import { NotFoundComponent } from './components/general/not-found/not-found.component';
import { ArticlesTimelineService } from './services/articles-timeline.service';

const articles = ArticlesTimelineService.articles
  .map(item => item.routeEntry);

const generalRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: NotFoundComponent }, // 404
];

const routes: Routes = articles.concat(generalRoutes);

ArticlesTimelineService.routes = routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
