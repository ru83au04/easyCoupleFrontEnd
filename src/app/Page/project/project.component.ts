import { Component, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-project',
  imports: [NgFor, NgIf, RouterModule, RouterOutlet],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  list: boolean = true;
  projectList: projectData[] = [
    {
      title: "使用者系統",
      path: 'user-system',
      content: `模擬使用者系統，包含註冊、登入、修改個人資料、登出等功能。
      可擴展為員工出勤考核或網站會員系統`
    },
    {
      title: "台南垃圾清運查詢",
      path: 'food-map',
      content: `利用 google地圖標示出使用者所在地，
      輸入指定時間跟地點，標示出附近的垃圾清運時間與地點(非即時)`
    },
  ];
  // NOTE: 打開專案
  open() {
    this.list = false;
  }
  // NOTE: 關閉專案
  close() {
    this.list = true;
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

interface projectData{
  title: string;
  path: string;
  content: string;
}
