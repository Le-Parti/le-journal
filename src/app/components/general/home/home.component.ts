import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ArticlesService, ArticlesServiceItem } from 'src/app/services/articles.service';
import { MetaTagsService } from 'src/app/services/meta-tags.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(protected titleService: Title, protected articlesService: ArticlesService, protected router: Router, protected metaTagsService: MetaTagsService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Le Journal :: Chronologie');
    
    this.metaTagsService.setMetas('Le Journal', 'Le Journal, média ultra-capitaliste totalitaire.');
  }
  
  public get articles() {
    return this.articlesService.orderedAricles;
  }

  public gotoArticle(article: ArticlesServiceItem): void {
    this.router.navigate([ article.routeEntry.path ]);
  }
}
