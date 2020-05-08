import { Component } from '@angular/core';
import { ArticleComponent } from '../../ArticleComponent';
import { Article } from 'src/app/decorators/article';

@Article({
  date: '2020-05-07',
  title: 'Election prodigieuse du Parti',
  titleHtml: 'Election prodigieuse du <span class="parti">Parti</span>'
})
@Component({
  selector: 'app-article20200507',
  templateUrl: './article20200507.component.html',
  styleUrls: ['./article20200507.component.scss']
})
export class Article20200507Component extends ArticleComponent {
}
