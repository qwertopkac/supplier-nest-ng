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
export class AuthGuard implements CanActivate {
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

        if (!this.authService.identityCheck()) {
            this.router.navigate(['auth/login'], {
                queryParams: { returnUrl: state.url },
            });

            this.messageService.add({
                severity: 'warning',
                detail: 'Oturum açmanız gerekiyor!',
                summary: 'Yetkisiz Erişim!',
            });
        }

        this.spinner.hide();

        return true;
    }
}
