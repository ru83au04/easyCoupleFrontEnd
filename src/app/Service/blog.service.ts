import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  articles: article[] = [];

  constructor(private http: HttpClient) { }
  // NOTE: 插入 Highlight.js腳本(讓 Code區塊可以針對不同語法標示高亮字體)
  loadHighlightScript(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!document.getElementById('highlightJsScript')) {
        const script = document.createElement('script');
        script.id = 'highlightJsScript';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load highlight.js'));
        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }
  async getArticleList(): Promise<string[]> {
    let res = await lastValueFrom(this.http.get<wordpressRes>('https://public-api.wordpress.com/rest/v1.1/sites/ru83au04.wordpress.com/posts/'));
    let articles = res.posts;
    return articles.map((art) => {
      this.articles.push(art);
      return art.title;
    });
  }
  getArticle(title: string): string{
    const article = this.articles.find((art) => {
      return art.title === title;
    });
    return article?.content || '';
  }
}

interface wordpressRes{
  posts: article[],
}
interface article { 
  ID: number,
  author: object,
  title: string,
  content: string,
}
