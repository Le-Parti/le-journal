import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ArticlesServiceItem } from './articles.service';

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {

  constructor(protected metaService: Meta) { }

  public clear() {
    document.querySelectorAll<HTMLMetaElement>('meta').forEach(item => item.remove());
  }
  
  public setMetas(title: string, desc: string) {
    this.clear();

    this.metaService.addTags([
      { name: 'description', content: desc },
      { itemprop: 'description', content: desc },
      { itemprop: 'name', content: title },
      { itemprop: 'image', content: '/assets/img/logo.png' },
      
      { name: 'twitter:image', content: '/assets/img/logo.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@AdrienCastex' },
      { name: 'twitter:creator', content: '@AdrienCastex' },
      { name: 'twitter:title', content: `Le Journal :: ${title}` },
      { name: 'twitter:description', content: desc },
      
      { property: 'og:title', content: `Le Journal :: ${title}` },
      { property: 'og:type', content: `website` },
      { property: 'og:image', content: `/assets/img/logo.png` },
      { property: 'og:url', content: window.location.toString() },
      { property: 'og:description', content: desc },
      { property: 'og:site_name', content: 'Le Journal' }
    ])
  }

  public setArticleMetas(article: ArticlesServiceItem) {
    this.clear();

    this.metaService.addTags([
      { name: 'description', content: article.getDescription(155) },
      { itemprop: 'description', content: article.getDescription(500) },
      { itemprop: 'name', content: article.titlePage },
      { itemprop: 'image', content: '/assets/img/logo.png' },
      
      { name: 'twitter:image', content: '/assets/img/logo.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@AdrienCastex' },
      { name: 'twitter:creator', content: '@AdrienCastex' },
      { name: 'twitter:title', content: `Le Journal :: ${article.titlePage}` },
      { name: 'twitter:description', content: article.getDescription(200) },
      
      { property: 'og:title', content: `Le Journal :: ${article.titlePage}` },
      { property: 'og:type', content: `article` },
      { property: 'og:image', content: `/assets/img/logo.png` },
      { property: 'og:url', content: article.canonicalUrl },
      { property: 'og:description', content: article.getDescription(500) },
      { property: 'og:site_name', content: 'Le Journal' },

      { property: 'article:published_time', content: new Date(article.dateNum).toISOString() },
      { property: 'article:modified_time', content: new Date(article.dateNum).toISOString() }
    ])
  }
}
