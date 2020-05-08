import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ArticlesTimelineService } from 'src/app/services/articles-timeline.service';
import { ArticleItem } from 'src/app/decorators/article-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(protected titleService: Title, protected articlesTimelineService: ArticlesTimelineService, protected router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Accueil');
  }
  
  public get mostRecentArticles() {
    return this.articlesTimelineService.articles.slice(this.articlesTimelineService.articles.length - 3).reverse();
  }

  public get firstArticle() {
    return this.articlesTimelineService.articles[0];
  }

  public gotoArticle(date: string): void
  public gotoArticle(articleItem: ArticleItem): void
  public gotoArticle(articleItemOrDate: ArticleItem | string): void
  public gotoArticle(articleItemOrDate: ArticleItem | string) {
    const articleItem = typeof articleItemOrDate === 'string' ? this.articlesTimelineService.findByDate(articleItemOrDate) : articleItemOrDate;
    this.router.navigate([ articleItem.routeEntry.path ]);
  }
}
