import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';

import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';

import { HttpErrorHandlerInterceptorService } from './app/core/services/http-error-handler-interceptor.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { MessageService } from 'primeng/api';
import { CustomerService } from './app/core/service/customerservice';
import { NodeService } from './app/core/service/nodeservice';
import { ProductService } from './app/core/service/productservice';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
		provideAnimationsAsync(),
		provideHttpClient(withInterceptors([AuthInterceptor, HttpErrorHandlerInterceptorService])), // Include HttpClientModule as a provider

		providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider('462867339290-7lopj64nmhp09hfhp0p8e2ahn2ng3kcl.apps.googleusercontent.com')
					}
				],
				onError: (err) => console.log(err)
			} as SocialAuthServiceConfig
		},

		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },

		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
		MessageService,
		JwtHelperService,
		NodeService,
		CustomerService,
		ProductService
	]
};
