import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  article: string = `
    這邊除了記錄成為全端工程式的心路歷程外，
    也會分享學習過程中的紀錄，也要向數位游牧夥伴們打聲招呼，
    如果你已經找到你的帳篷，恭喜你；
    如果還在努力中，你並不孤單，我們都在同一條路上。
  `
  forFrontEnd = this.article.split('\n');

}
