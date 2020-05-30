import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(protected articlesService: ArticlesService, protected titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Le Journal :: Contacter le journal');
  }

  public get capSafeArticle() {
    return this.articlesService.getArticleById(7);
  }
}
