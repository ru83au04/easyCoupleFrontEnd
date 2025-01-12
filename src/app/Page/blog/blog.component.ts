import { Component } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { BlogService } from '../../Service/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [HighlightModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  titles!: string[];

  constructor(private blogSrv: BlogService) { }

  ngOnInit() {
    this.blogSrv.loadHighlightScript().then(() => {
      console.log('Highlight.js loaded successfully');
    }).catch(err => {
      console.error('Failed to load Highlight.js', err);
    });
    this.getArticleList();
  }

  async getArticleList() {
    let outer = document.getElementById('outer');
    this.titles = await this.blogSrv.getArticleList();
    this.titles.map((title) => {
      const txt = document.createElement('h1');
      txt.innerHTML = title;
      txt.tabIndex = 0;
      txt.addEventListener('click', () => this.getArticle(title));
      outer!.appendChild(txt);
    })
  }
  getArticle(title: string) {
    const content = this.blogSrv.getArticle(title);
    let articleInner = document.getElementById('articleInner')
    if (articleInner) {
      articleInner.innerHTML = content;
      return;
    }
    let textDiv = document.createElement('div');
    textDiv.id = "articleInner";
    textDiv.innerHTML = content;
    document.getElementById('articleTxt')?.appendChild(textDiv);
  }
}
