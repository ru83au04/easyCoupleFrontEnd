import { NgFor } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-direction',
  imports: [NgFor],
  template: `
    <main>
      <div class="close" (click)="closeWindow()">X</div>
      <div class="content">
        <h1>{{ content.title }}</h1>
        <div>
          <p *ngFor="let line of article" [innerHTML]="line"></p>
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      main {
        width: 100%;
        height: 100%;
      }
      .content {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        // margin: 10px;
        padding: 15px;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 998;
        height: 98%;
        width: 98%;
        right: 0;
        bottom: 0;
        border-radius: 30px;
        background-color: var(--direction-color);
      }

      .close {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        z-index: 999;
        background-color: rgb(65, 45, 15);
        border-radius: 50%;
        position: absolute;
        width: 50px;
        height: 50px;
        left: -3%;
        top: -8%;
        color: white;
        cursor: pointer;
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
