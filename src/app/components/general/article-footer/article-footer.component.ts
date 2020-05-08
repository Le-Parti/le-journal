import { Component, OnInit, Input } from '@angular/core';
import { ArticlesTimelineService, IArticlesTimelineEntry } from '../../../services/articles-timeline.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-footer',
  templateUrl: './article-footer.component.html',
  styleUrls: ['./article-footer.component.scss']
})
export class ArticleFooterComponent implements OnInit {

  constructor(protected articlesTimelineService: ArticlesTimelineService) { }

  @Input('article-date')
  articleDate: string

  articleEntry: IArticlesTimelineEntry

  ngOnInit(): void {
    this.articleEntry = this.articlesTimelineService.getEntry(this.articleDate);
  }

}
