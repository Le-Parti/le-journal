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

    this.metaService.addTag({ name: 'description', content: desc })
    this.metaService.addTag({ itemprop: 'description', content: desc })
    this.metaService.addTag({ itemprop: 'name', content: title })
    this.metaService.addTag({ itemprop: 'image', content: '/assets/img/logo.png' })
    
    this.metaService.addTag({ name: 'twitter:image', content: '/assets/img/logo.png' })
    this.metaService.addTag({ name: 'twitter:card', content: 'summary_large_image' })
    this.metaService.addTag({ name: 'twitter:site', content: '@AdrienCastex' })
    this.metaService.addTag({ name: 'twitter:creator', content: '@AdrienCastex' })
    this.metaService.addTag({ name: 'twitter:title', content: `Le Journal :: ${title}` })
    this.metaService.addTag({ name: 'twitter:description', content: desc })
    
    this.metaService.addTag({ property: 'og:title', content: `Le Journal :: ${title}` })
    this.metaService.addTag({ property: 'og:type', content: `website` })
    this.metaService.addTag({ property: 'og:image', content: `/assets/img/logo.png` })
    this.metaService.addTag({ property: 'og:url', content: window.location.toString() })
    this.metaService.addTag({ property: 'og:description', content: desc })
    this.metaService.addTag({ property: 'og:site_name', content: 'Le Journal' })
  }

  public setArticleMetas(article: ArticlesServiceItem) {
    this.clear();

    this.metaService.addTag({ name: 'description', content: article.getDescription(155) })
    this.metaService.addTag({ itemprop: 'description', content: article.getDescription(500) })
    this.metaService.addTag({ itemprop: 'name', content: article.titlePage })
    this.metaService.addTag({ itemprop: 'image', content: '/assets/img/logo.png' })
    
    this.metaService.addTag({ name: 'twitter:image', content: '/assets/img/logo.png' })
    this.metaService.addTag({ name: 'twitter:card', content: 'summary_large_image' })
    this.metaService.addTag({ name: 'twitter:site', content: '@AdrienCastex' })
    this.metaService.addTag({ name: 'twitter:creator', content: '@AdrienCastex' })
    this.metaService.addTag({ name: 'twitter:title', content: `Le Journal :: ${article.titlePage}` })
    this.metaService.addTag({ name: 'twitter:description', content: article.getDescription(200) })
    
    this.metaService.addTag({ property: 'og:title', content: `Le Journal :: ${article.titlePage}` })
    this.metaService.addTag({ property: 'og:type', content: `article` })
    this.metaService.addTag({ property: 'og:image', content: `/assets/img/logo.png` })
    this.metaService.addTag({ property: 'og:url', content: article.canonicalUrl })
    this.metaService.addTag({ property: 'og:description', content: article.getDescription(500) })
    this.metaService.addTag({ property: 'og:site_name', content: 'Le Journal' })

    this.metaService.addTag({ property: 'article:published_time', content: new Date(article.dateNum).toISOString() })
    this.metaService.addTag({ property: 'article:modified_time', content: new Date(article.dateNum).toISOString() })
  }
}
