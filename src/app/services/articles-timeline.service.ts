import { Injectable } from '@angular/core';
import { ArticleItem } from '../decorators/article-item';
import { Routes } from '@angular/router';

export interface IArticlesTimelineEntry {
  current: ArticleItem
  previous?: ArticleItem
  next?: ArticleItem
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesTimelineService {

  public static routes: Routes;

  public static articles: ArticleItem[] = [];
  public static addArticle(articleItem: ArticleItem) {
    this.articles.push(articleItem);
    this.articles.sort((a, b) => a.date.localeCompare(b.date));

    if(this.routes) {
      this.routes.unshift(articleItem.routeEntry);
    }
  }

  public get articles() {
    return ArticlesTimelineService.articles;
  }

  public findByDate(date: string) {
    return this.articles.find(item => item.date === date);
  }
  public findIndexByDate(date: string) {
    return this.articles.findIndex(item => item.date === date);
  }

  public getEntry(articleDate: string): IArticlesTimelineEntry {
    return {
      current: this.findByDate(articleDate),
      next: this.getNext(articleDate),
      previous: this.getPrevious(articleDate)
    }
  }

  public getPrevious(articleDate: string) {
    const index = this.findIndexByDate(articleDate);

    if(index >= 0) {
      return this.articles[index - 1];
    } else {
      return undefined;
    }
  }

  public getNext(articleDate: string) {
    const index = this.findIndexByDate(articleDate);

    if(index >= 0) {
      return this.articles[index + 1];
    } else {
      return undefined;
    }
  }

  public hasPrevious(articleDate: string) {
    return !!this.getPrevious(articleDate);
  }
  public hasNext(articleDate: string) {
    return !!this.getNext(articleDate);
  }
}
