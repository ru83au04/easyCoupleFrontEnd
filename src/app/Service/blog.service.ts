import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  articles: article[] = [];

  constructor(private http: HttpClient) { 
  }

  async getArticles(): Promise<article[]> {
    try {
      let res = await lastValueFrom(this.http.get<wordpressRes>('https://public-api.wordpress.com/rest/v1.1/sites/ru83au04.wordpress.com/posts/'));
      this.articles = res.posts;
      return this.articles
    } catch(err) {
      console.error(err);
      return [];
    }
  }
  getContent(title: string): string{
    const article = this.articles.find((art) => {
      return art.title === title;
    });
    return article?.content || '';
  }
  getTitleList(): string[]{
    return this.articles.map((art) => {
      return art.title;
    })
  }
}

interface wordpressRes{
  posts: article[],
}
export interface article { 
  ID: number,
  author: {
    name: string,
    firsrt_name: string,
    last_name: string,
    login: string,
  },
  date: string,
  modified: string,
  title: string,
  content: string,
  excerpt: string,
}
