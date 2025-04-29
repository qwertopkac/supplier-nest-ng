import { inject, Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { MessageService } from 'primeng/api';
import { TokenResponse } from '../../../models/token/tokenResponse';

@Injectable({
    providedIn: 'root',
})
export class UserAuthService {
    httpClientService = inject(HttpClientService);
    messageService = inject(MessageService);

    async login(
        userNameOrEmail: string,
        password: string,
        callBackFunction?: () => void
    ): Promise<any> {
        const observable: Observable<any | TokenResponse> =
            this.httpClientService.post<any | TokenResponse>(
                {
                    controller: 'Auth',
                    action: 'Login',
                },
                { Email: userNameOrEmail, Password: password }
            );

        const tokenResponse = await firstValueFrom(observable);

        if (tokenResponse) {
            localStorage.setItem(
                'accessToken',
                tokenResponse.accessToken.token
            );

            localStorage.setItem(
                'expirationDate',
                tokenResponse.accessToken.expirationDate
            );
            /// Şuan Refresh token dönmüyor
            // localStorage.setItem(
            //     'refreshToken',
            //     tokenResponse.token.refreshToken
            // );

            this.messageService.add({
                severity: 'success',
                summary: 'Giriş Başarılı',
                detail: 'Kullanıcı girişi başarıyla sağlanmıştır.',
            });
        }

        callBackFunction();
    }

    async refreshTokenLogin(
        refreshToken: string,
        callBackFunction?: (state) => void
    ): Promise<any> {
        const observable: Observable<any | TokenResponse> =
            this.httpClientService.post(
                {
                    action: 'refreshtokenlogin',
                    controller: 'auth',
                },
                { refreshToken: refreshToken }
            );

        try {
            const tokenResponse: any = (await firstValueFrom(
                observable
            )) as any;

            if (tokenResponse) {
                localStorage.setItem(
                    'accessToken',
                    tokenResponse.accessToken.token
                );
                localStorage.setItem(
                    'refreshToken',
                    tokenResponse.accessToken.refreshToken
                );
            }

            callBackFunction(tokenResponse ? true : false);
        } catch {
            callBackFunction(false);
        }
    }

    async googleLogin(
        user: SocialUser,
        callBackFunction?: () => void
    ): Promise<any> {
        const observable: Observable<SocialUser | TokenResponse> =
            this.httpClientService.post<SocialUser | TokenResponse>(
                {
                    action: 'GoogleLogin',
                    controller: 'auth',
                },
                user
            );

        const tokenResponse: any = (await firstValueFrom(observable)) as any;

        if (tokenResponse) {
            localStorage.setItem(
                'accessToken',
                tokenResponse.accessToken.token
            );
            localStorage.setItem(
                'expirationDate',
                tokenResponse.accessToken.expirationDate
            );
            // localStorage.setItem(
            //     'refreshToken',
            //     tokenResponse.token.refreshToken
            // );

            this.messageService.add({
                severity: 'success',
                summary: 'Giriş Başarılı',
                detail: 'Google üzerinden giriş başarıyla sağlanmıştır.',
            });
        }

        callBackFunction();
    }

    async passwordReset(email: string, callBackFunction?: () => void) {
        const observable: Observable<any> = this.httpClientService.post(
            {
                controller: 'auth',
                action: 'password-reset',
            },
            { email: email }
        );

        await firstValueFrom(observable);
        callBackFunction();
    }

    async verifyResetToken(
        resetToken: string,
        userId: string,
        callBackFunction?: () => void
    ): Promise<boolean> {
        const observable: Observable<any> = this.httpClientService.post(
            {
                controller: 'auth',
                action: 'verify-reset-token',
            },
            {
                resetToken: resetToken,
                userId: userId,
            }
        );

        const state: boolean = await firstValueFrom(observable);
        callBackFunction();
        return state;
    }
}
