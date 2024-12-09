import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-external',
  standalone: true,
  imports: [],
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.css']
})
export class ExternalComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // 獲取路由中的 path
    const path = this.route.snapshot.paramMap.get('path');
    console.log("pathPath", path);
    if (path) {
      // 組裝完整的外部 URL
      const externalUrl = `https:/easy-couple-life.onrender.com/${path}`;
      window.location.href = externalUrl; // 跳轉到外部路徑
    } else {
      // 如果 path 無效，跳回首頁
      this.router.navigate(['/']);
    }
  }
}
