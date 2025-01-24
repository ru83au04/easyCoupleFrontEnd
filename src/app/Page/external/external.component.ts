import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-external',
  standalone: true,
  imports: [],
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.css']
})
export class ExternalComponent {
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    // 獲取路由中的 path
    const encodePath = this.route.snapshot.paramMap.get('path');
    if(encodePath){
      let path = decodeURIComponent(encodePath);

      if (path) {
        // 組裝完整的外部 URL
        const externalUrl = `${environment.rootURL}/${path}`;
        window.location.href = externalUrl; // 跳轉到外部路徑
      } else {
        // 如果 path 無效，跳回首頁
        this.router.navigate(['/']);
      }
    }
  }
}
