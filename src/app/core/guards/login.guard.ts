import { inject, Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { _isAuthenticated, AuthService } from '../services/common/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {
    // jwtHelper = inject(JwtHelperService);
    router = inject(Router);
    spinner = inject(NgxSpinnerService);
    messageService = inject(MessageService);
    authService = inject(AuthService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.spinner.show();
        // const token: string = localStorage.getItem('accessToken');

        // ////const decodeToken = this.jwtHelper.decodeToken(token);
        // ////const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
        // let expired: boolean;
        // try {
        //     expired = this.jwtHelper.isTokenExpired(token);
        // } catch {
        //     expired = true;
        // }

        if (this.authService.identityCheck()) {
            this.router.navigate([''], {
                queryParams: { returnUrl: state.url },
            });
        }

        this.spinner.hide();

        return true;
    }
}
