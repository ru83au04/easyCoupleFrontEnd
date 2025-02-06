import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const userSystemGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    const router = new Router();
    router.navigate(['/user-operation']);
    return false;
  } else {
    return true;
  }
};
