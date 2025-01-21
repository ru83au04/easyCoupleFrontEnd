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
  article?: article;
  articleOpen: boolean = false;

  constructor(private blogSrv: BlogService) { }

  ngOnInit() {
    this.getArticleList();
  }
  // NOTE: 取得所有文章
  async getArticleList(): Promise<void>{
    this.articles = await this.blogSrv.getArticles();
  }
  // NOTE: 取出文章內文
  getArticle(title: string): void{
    this.articleOpen = true;
    this.article = this.articles.find(art => art.title === title);
  }
  // NOTE: 文章列表與文章頁面切換
  closeArticle() {
    this.articleOpen = false;
  }
}
