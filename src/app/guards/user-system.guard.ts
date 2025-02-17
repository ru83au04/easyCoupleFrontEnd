import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const userSystemGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('easy_couple_token');
  if (token) {
    const router = new Router();
    router.navigate(['/user-operation/user-info']);
    return false;
  } else {
    return true;
  }
};
