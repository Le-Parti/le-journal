import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(protected titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Le Journal :: Contacter le journal');
  }

}
