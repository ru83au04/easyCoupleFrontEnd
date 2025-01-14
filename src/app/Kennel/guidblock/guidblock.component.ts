import { Component, Input, ViewChild } from '@angular/core';
import { article } from '../../Service/blog.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-guidblock',
  imports: [],
  templateUrl: './guidblock.component.html',
  styleUrls: ['./guidblock.component.css']
})
export class GuidblockComponent {
  @Input() article!: article;
  @ViewChild('guidblock', {static: true}) guidblock!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.setBlock();
  }

  setBlock() {
    this.guidblock.nativeElement.querySelectorAll('div').forEach((div: HTMLElement) => {
      switch (div.id) {
        case 'title':
          div.innerHTML = this.article.title;
          break;
        case 'excerpt':
          div.innerHTML = this.article.excerpt;
          break;
        case 'name':
          div.innerHTML = this.article.author.name;
          break;
        case 'date':
          div.innerHTML = `建立時間：${ this.formatDate(this.article.date) }`;
          break;
        case 'modified':
          div.innerHTML = `最後修改：${this.formatDate(this.article.modified)}`;
          break;
        default:
          break;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

}
