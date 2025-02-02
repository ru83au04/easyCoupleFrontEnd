import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-project',
  imports: [NgFor, RouterModule, RouterOutlet],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectList: projectData[] = [
    { title: "使用者系統", path: 'user-system' },
    { title: "美食地圖", path: 'food-map' }
  ];
}

interface projectData{
  title: string;
  path: string;
}
