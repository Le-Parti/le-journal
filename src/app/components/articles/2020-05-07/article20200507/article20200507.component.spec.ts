import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Article20200507Component } from './article20200507.component';

describe('Article20200507Component', () => {
  let component: Article20200507Component;
  let fixture: ComponentFixture<Article20200507Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Article20200507Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Article20200507Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
