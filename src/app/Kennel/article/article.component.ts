import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  showBackButton: boolean = false;
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

  // NOTE: 返回按鈕的收放
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const backButton = document.getElementById('back');
    if (backButton) {
      const rect = backButton.getBoundingClientRect();
      const distance = 50; // 距離範圍
      if (
        event.clientX >= rect.left - distance &&
        event.clientX <= rect.right + distance &&
        event.clientY >= rect.top - distance &&
        event.clientY <= rect.bottom + distance
      ) {
        backButton.classList.add('show');
      } else {
        backButton.classList.remove('show');
      }
    }
  }
}
