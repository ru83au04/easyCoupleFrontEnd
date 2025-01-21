import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import hljs from 'highlight.js';
import { article } from '../../Service/blog.service';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css',]
})
export class ArticleComponent {
  @Input() article?: article;
  @Output() closeArticle = new EventEmitter<boolean>();
  @ViewChild('articleOuter', { static: false }) articleOuter!: ElementRef;
  @ViewChild('articleTitle', { static: false }) articleTitle!: ElementRef;
  title: string = '';
  content: string = '';
  showBackButton: boolean = false;
  constructor() { }

  ngOnInit() { 
    
  }
 
  ngAfterViewInit() { 
    this.buildArticle();
  }
 
  // NOTE: 重構 wordpress 文章內容
  buildArticle() {
    let titleHTML = this.articleTitle.nativeElement;
    titleHTML.innerHTML = this.article?.title;
    let articleHTML = this.articleOuter.nativeElement;
    articleHTML.innerHTML = this.article?.content;
    articleHTML.querySelectorAll('pre code').forEach((block: HTMLElement) => {
      hljs.highlightElement(block as HTMLElement);
      block.style.borderRadius = '10px';
    });
    articleHTML.querySelectorAll('h3').forEach((block: HTMLElement) => {
      block.style.textShadow = '5px 5px 5px #000';
    });
    articleHTML.querySelectorAll('h4').forEach((block: HTMLElement) => {
      block.style.textShadow = '5px 5px 5px #000';
    });
    articleHTML.querySelectorAll('li').forEach((block: HTMLElement) => {
      block.className = 'custom';
    });
    articleHTML.querySelectorAll('tr').forEach((block: HTMLElement) => {
      block.style.paddingRight = '20px';
      block.style.paddingLeft = '20px';
      block.style.margin = '0px';
    });
    articleHTML.querySelectorAll('td').forEach((block: HTMLElement) => {
      block.style.paddingRight = '20px';
      block.style.paddingLeft = '20px';
      block.style.margin = '0px';

    });
    articleHTML.querySelectorAll('em').forEach((block: HTMLElement) => {
      block.style.paddingRight = '20px';
    });
  }

   // NOTE: 關閉文章視窗(使用 @Output發送事件)
  close() {
    this.closeArticle.emit(false);
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
