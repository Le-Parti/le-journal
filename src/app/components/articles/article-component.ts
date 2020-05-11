import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IArticleConfig } from 'src/app/decorators/article';
import { ArticleItem } from 'src/app/decorators/article-item';

export abstract class ArticleComponent implements OnInit {
  constructor(protected titleService: Title) { }

  public static articleItem: ArticleItem;

  public articleItem: ArticleItem;

  public get title() {
    return this.articleItem.info.title;
  }

  public get date() {
    return this.articleItem.info.date;
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
