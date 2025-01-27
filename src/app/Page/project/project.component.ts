import { Component } from '@angular/core';
import { UserSystemComponent } from '../user-system/user-system.component';
import { FoodMapComponent } from '../food-map/food-map.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [UserSystemComponent, FoodMapComponent, NgIf, NgFor],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectList: projectData[] = [
    { title: "使用者系統", order: 1 },
    { title: "美食地圖", order: 2 }
  ];
  userSystem: boolean = false;
  foodMap: boolean = false;
  userSystemTitle: string = "使用者系統";
  foodMapTitle: string = "美食地圖";

  openProject(order: number): void {
    switch (order) {
      case 1:
        this.userSystem = true;
        this.foodMap = false;
        break;
      case 2:
        this.foodMap = true;
        this.userSystem = false;
        break;
      default:
        break;
    }
  }
}

interface projectData{
  title: string;
  order: number;
}
