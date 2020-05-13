import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Article20200513Component } from './article20200513.component';

describe('Article20200513Component', () => {
  let component: Article20200513Component;
  let fixture: ComponentFixture<Article20200513Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Article20200513Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Article20200513Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
