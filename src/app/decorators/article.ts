import { ArticlesTimelineService } from '../services/articles-timeline.service'
import { ArticleItem } from './article-item';

export interface IArticleConfig {
    date: string
    title: string
    titleHtml?: string
}

export function Article(config: IArticleConfig) {
    return function(target) {
        const articleItem = new ArticleItem(target, config);

        Object.defineProperty(target, 'articleItem', {
            value: articleItem
        })
        Object.defineProperty(target.prototype, 'articleItem', {
            value: articleItem
        })

        ArticlesTimelineService.addArticle(articleItem);
    }
}
