import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let uid = firebase.auth().currentUser != null ? firebase.auth().currentUser.uid : undefined;
    if (uid != undefined) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}