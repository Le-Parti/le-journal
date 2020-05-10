import { Article20200507Component } from './2020-05-07/article20200507/article20200507.component';
import { ArticlesTimelineService } from 'src/app/services/articles-timeline.service';

export function articlesLoader() {
    const articles = [
        Article20200507Component
    ];

    for(const articleClass of articles) {
        ArticlesTimelineService.addArticle(articleClass.articleItem);
    }
}
