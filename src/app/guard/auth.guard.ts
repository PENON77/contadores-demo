import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';


export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      console.log("paso por active");
      
    return true;
  }
  
}
