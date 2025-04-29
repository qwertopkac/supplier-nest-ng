import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/app.floatingconfigurator';
import { GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../core/services/common/auth.service';
import { UserAuthService } from '../../core/services/common/models/user-auth.service';
import { LayoutService } from '../../layout/service/layout.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, SocialLoginModule, GoogleSigninButtonModule],
    templateUrl: './login.html'
})
export class Login {
    valCheck: string[] = ['remember'];
    password!: string;
    checked: boolean;
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

    async login() {
        this.spinner.show();
        await this.userAuthService.login(this.email, this.password, () => {
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
