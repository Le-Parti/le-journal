import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  constructor(protected articlesService: ArticlesService, protected route: ActivatedRoute, protected titleService: Title) { }

  private _articleId: number;
  public get articleId() {
    return this._articleId;
  }
  public set articleId(value) {
    this._articleId = value;

    if(typeof value === 'number' && this.article) {
      this.titleService.setTitle('Le Journal :: ' + this.article.titlePage);
    }
  }

  protected subId;

  ngOnInit(): void {
    this.subId = this.route.paramMap.subscribe((params) => {
      this.articleId = parseInt(/(\d+)/.exec(params.get('id'))[1]);
    })
  }
  
  ngOnDestroy() {
    this.subId.unsubscribe();
  }

  public get index() {
    return this.articlesService.orderes.indexOf(this.articleId);
  }

  public get next() {
    console.log(this.index);
    return this.articlesService.getArticleById(this.articlesService.orderes[this.index + 1]);
  }
  public get previous() {
    return this.articlesService.getArticleById(this.articlesService.orderes[this.index - 1]);
  }

  public get article() {
    return this.articlesService.getArticleById(this.articleId);
  }
}
