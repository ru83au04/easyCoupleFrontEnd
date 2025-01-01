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
  // article: string = `
  //   這邊除了記錄成為全端工程式的心路歷程外，
  //   也會分享學習過程中的紀錄，也要向數位游牧夥伴們打聲招呼，
  //   如果你已經找到你的帳篷，恭喜你；
  //   如果還在努力中，你並不孤單，我們都在同一條路上。
  // `

  article: string = `
  成為前端工程師前，我是一位電梯技師，在說不準的命運安排下，幸運的進入軟體產業，永遠感謝願意給我機會的貴人。
  身為電梯技師在第一線的工作經驗中，除非會有無法挽回的結果，否則親身經歷、置身其中的學習，是實務上最有效率的做法。
  轉職到軟體產業，當代迅速發展的 AI可以是阻力，也可以是助力，而我傾向於將它視為後者，AI詠唱師可以是一個職涯方向。     
  "喜歡工作，但不喜歡上班"，在從事軟體工作的期間，聽到這樣的陳述讓我更認識自己，會消滅熱情的不是工作，是上班。
  目前正朝著"數位游牧"的方向努力，如果你也在這條路上，我們可能是同溫層，希望我們都能盡早讓自己放手在世界各角落奔馳。
  而有需要網頁相關的服務，或願意提供合作機會，可以透過下方資訊與我聯絡。我是 Noah~  
  `

  forFrontEnd = this.article.split('\n');

}
