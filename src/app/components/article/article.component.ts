import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { KEY_CODE } from 'src/app/consts/keycodes';
import { MetaTagsService } from 'src/app/services/meta-tags.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  constructor(protected articlesService: ArticlesService, protected route: ActivatedRoute, protected router: Router, protected titleService: Title, protected metaTagsService: MetaTagsService) { }

  private _articleId: number;
  public get articleId() {
    return this._articleId;
  }
  public set articleId(value) {
    this._articleId = value;

    if(typeof value === 'number' && this.article) {
      this.titleService.setTitle('Le Journal :: ' + this.article.titlePage);

      this.metaTagsService.setArticleMetas(this.article);
    }
  }

  protected subId;

  ngOnInit(): void {
    this.subId = this.route.paramMap.subscribe((params) => {
      this.articleId = parseFloat(/(\d+(?:\.\d+)?)/.exec(params.get('id'))[1]);
    })
  }
  
  ngOnDestroy() {
    this.subId.unsubscribe();
  }

  public get index() {
    return this.articlesService.orderes.indexOf(this.articleId);
  }

  public get next() {
    return this.articlesService.getArticleById(this.articlesService.orderes[this.index + 1]);
  }
  public get previous() {
    return this.articlesService.getArticleById(this.articlesService.orderes[this.index - 1]);
  }

  public get article() {
    return this.articlesService.getArticleById(this.articleId);
  }

  public get capSafeArticle() {
    return this.articlesService.getArticleById(7);
  }

  public clickOnLink(event: MouseEvent) {
    const element = event.target as HTMLElement;
  }
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch(event.keyCode) {
      case KEY_CODE.RIGHT_ARROW:
        this.router.navigate([ this.next.routeEntry.path ]);
        break;
        
      case KEY_CODE.LEFT_ARROW:
        this.router.navigate([ this.previous.routeEntry.path ]);
        break;
    }
  }
}
