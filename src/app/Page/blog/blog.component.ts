import { Component, ViewChild, ElementRef } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { BlogService } from '../../Service/blog.service';
import { ArticleComponent } from '../../Kennel/article/article.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [HighlightModule, ArticleComponent, NgIf],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  titles!: string[];
  content: string = '';
  articleOpen: boolean = false;

  constructor(private blogSrv: BlogService) { }

  ngOnInit() {
    this.getArticleList();
  }

  async getArticleList() {
    let titleList = document.getElementById('titleList');
    this.titles = await this.blogSrv.getArticleList();
    this.titles.map((title) => {
      const txt = document.createElement('h1');
      txt.innerHTML = title;
      txt.addEventListener('click', () => {
        this.articleOpen = false;
        this.getArticle(title);
      });
      titleList!.appendChild(txt);
    })
  }
  getArticle(title: string) {
    this.articleOpen = true;
    this.content = this.blogSrv.getArticle(title);
  }

  closeArticle() {
    this.articleOpen = false;
  }
}
