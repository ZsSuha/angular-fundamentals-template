import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        return !this.authService.isAuthorised ? true : this.router.createUrlTree(['courses']);
    }
}
