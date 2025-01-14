import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import hljs from 'highlight.js';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css',]
})
export class ArticleComponent {
  @Input() article!: string;
  @Output() closeArticle = new EventEmitter<boolean>();
  @ViewChild('articleOuter', {static: true}) articleOuter!: ElementRef;
  constructor() { }

  ngOnInit() { 
    
  }
 
  ngAfterViewInit() { 
    this.buildArticle();
  }
  // NOTE: 關閉文章視窗(使用 @Output發送事件)
  close() {
    this.closeArticle.emit(false);
  }
  // NOTE: 重構 wordpress 文章內容
  buildArticle() {
    let articleHTML = this.articleOuter.nativeElement;
    articleHTML.innerHTML = this.article;
    articleHTML.querySelectorAll('pre code').forEach((block: HTMLElement) => {
      hljs.highlightElement(block as HTMLElement);
      block.style.borderRadius = '10px';
    });
  }
}
