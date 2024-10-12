import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(private router: Router, private storage: StorageService) {
  }

  canActivate(): boolean {
    let token = this.storage.get('token');
    if (!token) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
