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

  close() {
    this.closeArticle.emit(false);
  }

  buildArticle() {
    let articleHTML = this.articleOuter.nativeElement;
    articleHTML.innerHTML = this.article;
    articleHTML.querySelectorAll('pre code').forEach((block: HTMLElement) => {
      hljs.highlightElement(block as HTMLElement);
      block.style.borderRadius = '10px';
    });
  }
}
