import { Article20200507Component } from './2020-05-07/article20200507/article20200507.component';
import { ArticlesTimelineService } from 'src/app/services/articles-timeline.service';
import { Article20200513Component } from './2020-05-13/article20200513/article20200513.component';

export function articlesLoader() {
    const articles = [
        Article20200507Component,
        Article20200513Component
    ];

    for(const articleClass of articles) {
        ArticlesTimelineService.addArticle(articleClass.articleItem);
    }
}
