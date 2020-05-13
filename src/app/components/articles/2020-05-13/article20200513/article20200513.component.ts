import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '../../article-component';
import { Article } from 'src/app/decorators/article';

@Article({
  date: '2020-05-13',
  title: 'Attentats sans précédent',
})
@Component({
  selector: 'app-article20200513',
  templateUrl: './article20200513.component.html',
  styleUrls: ['./article20200513.component.scss']
})
export class Article20200513Component extends ArticleComponent {
}
