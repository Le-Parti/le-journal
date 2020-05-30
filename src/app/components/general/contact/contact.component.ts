import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ArticlesService } from 'src/app/services/articles.service';
import { MetaTagsService } from 'src/app/services/meta-tags.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(protected articlesService: ArticlesService, protected titleService: Title, protected metaTagsService: MetaTagsService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Le Journal :: Contacter le Journal');

    this.metaTagsService.setMetas('Contacter le Journal', 'Contactez le Journal, média ultra-capitaliste totalitaire.');
  }

  public get capSafeArticle() {
    return this.articlesService.getArticleById(7);
  }
}
