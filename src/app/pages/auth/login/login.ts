import {
    SocialLoginModule,
    GoogleSigninButtonModule,
    SocialAuthService,
    SocialUser,
} from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LayoutService } from '../../../layout/service/layout.service';
import { UserAuthService } from '../../../core/services/common/models/user-auth.service';
import { AuthService } from '../../../core/services/common/auth.service';

@Component({
    standalone: true,
    imports: [
        SocialLoginModule,
        GoogleSigninButtonModule,
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
    ],
    selector: 'app-login',
    templateUrl: './login.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class Login {
    valCheck: string[] = ['remember'];
    password!: string;
    email!: string;
    layoutService = inject(LayoutService);
    userAuthService = inject(UserAuthService);
    spinner = inject(NgxSpinnerService);
    authService = inject(AuthService);
    activatedRoute = inject(ActivatedRoute);
    router = inject(Router);
    socialAuthService = inject(SocialAuthService);
    user: any = {};
    constructor() {
        this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
            console.log(user);
            this.spinner.show();
            switch (user.provider) {
                case 'GOOGLE':
                    await this.userAuthService.googleLogin(user, () => {
                        this.authService.identityCheck();
                        this.routeReturnUrl();
                        this.spinner.hide();
                    });
                    break;
            }
        });
    }

    async login(usernameOrEmail: string, password: string) {
        this.spinner.show();
        await this.userAuthService.login(usernameOrEmail, password, () => {
            this.authService.identityCheck();
            this.routeReturnUrl();
            this.spinner.hide();
        });
    }


    routeReturnUrl() {
        this.activatedRoute.queryParams.subscribe((params) => {
            // const returnUrl: string = params['returnUrl'];
            // alert(returnUrl)
            // if (!returnUrl.includes('/login')) this.router.navigate([returnUrl]);
            // else {
            this.router.navigate(['']);
            // }
        });
    }
}
