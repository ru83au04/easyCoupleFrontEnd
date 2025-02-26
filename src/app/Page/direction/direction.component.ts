import { NgFor } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-direction',
  imports: [NgFor],
  template: `
    <main>
      <div class="content">
        <div class="close" (click)="closeWindow()">X</div>
        <div class="text">
          <div>
            <h1>{{ content.title }}</h1>
          </div>
          <div>
            <p *ngFor="let line of article" [innerHTML]="line"></p>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      main {
        height: 100%;
        width: 100%;
      }
      .content {
        display: flex;
        flex-direction: column;
        padding: 15px;
        z-index: 998;
        border-radius: 30px;
        background-color: var(--direction-color);
      }
      .close {
        z-index: 999;
        height: 20px;
        width: 20px;
        padding: 0px;
        margin: 0px;
      }
      .close:hover{
        cursor: pointer;
        transform: translate(2px, -2px);
      }

      .text {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 15px;
        overflow-y: auto;
      }
    `,
  ],
})
export class DirectionComponent {
  @ViewChild('contentIt') contentIt!: ElementRef;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() content: Content = { title: '', content: '' };
  title!: string;
  direction!: string;
  article!: string[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      this.title = this.content.title;
      this.direction = this.content.content;
      this.article = this.direction.split('\n');
    }
  }

  closeWindow() {
    this.close.emit(false);
  }
}

export interface Content {
  title: string;
  content: string;
}
