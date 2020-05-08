import { Type } from '@angular/core';
import { IArticleConfig } from './article';
import { Route } from '@angular/router';

export class ArticleItem {
    public constructor(component: Type<any>, articleInfo: IArticleConfig) {
      this.component = component;
      this.info = articleInfo;
    }
  
    public readonly component: Type<any>
    public readonly info: IArticleConfig;
  
    public get date() {
      return this.info.date;
    }

    public get title() {
      return this.info.title;
    }

    public get titleHtml() {
      return this.info.titleHtml || this.title;
    }
  
    public get dateInfo() {
      const splitted = this.date.split('-');
  
      return {
        day: splitted[2],
        month: splitted[1],
        year: splitted[0],
      }
    }
  
    private _routeEntry: Route;
    public get routeEntry(): Route {
      if(!this._routeEntry) {
        this._routeEntry = {
          path: `${this.date}-${this.info.title.toLocaleLowerCase().replace(/\s+/img, '-')}`,
          component: this.component
        }
      }

      return this._routeEntry;
    }
  }
  