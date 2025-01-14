import { Component} from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { article, BlogService } from '../../Service/blog.service';
import { ArticleComponent } from '../../Kennel/article/article.component';
import { NgIf, NgFor } from '@angular/common';
import { GuidblockComponent } from "../../Kennel/guidblock/guidblock.component";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [HighlightModule, NgIf, ArticleComponent, GuidblockComponent, NgFor],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  articles!: article[];
  content: string = '';
  articleOpen: boolean = false;

  constructor(private blogSrv: BlogService) { }

  async ngOnInit() {
    this.getArticleList();
  }
 
  async getArticleList() {
    this.articles = await this.blogSrv.getArticles();
  }
  getArticle(title: string) {
    this.articleOpen = true;
    this.content = this.blogSrv.getContent(title);
  }
  closeArticle() {
    this.articleOpen = false;
  }
}
