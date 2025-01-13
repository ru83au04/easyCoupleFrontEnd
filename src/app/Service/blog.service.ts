import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  articles: article[] = [];

  constructor(private http: HttpClient) { }
  
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
