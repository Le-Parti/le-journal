import { TestBed } from '@angular/core/testing';

import { ArticlesTimelineService } from './articles-timeline.service';

describe('ArticlesTimelineService', () => {
  let service: ArticlesTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesTimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
