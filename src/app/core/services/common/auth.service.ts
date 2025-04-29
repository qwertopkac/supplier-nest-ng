import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    jwtHelper = inject(JwtHelperService);

    identityCheck():boolean {
        const token: string = localStorage.getItem('accessToken');
        const expirationDate: Date = new Date(
            localStorage.getItem('expirationDate')
        );

        //const decodeToken = this.jwtHelper.decodeToken(token);
        //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
        let expired: boolean;
        // try {
        //     expired = this.jwtHelper.isTokenExpired(token);
        // } catch {
        //     expired = true;
        // }

        if (expirationDate.getTime() < new Date().getTime()) {
            expired = false;
        } else {
            expired = true;
        }

      return  _isAuthenticated = token != null && expired;


    }

    // get isAuthenticated(): boolean {
    //     return _isAuthenticated;
    // }
}

export let _isAuthenticated: boolean;
