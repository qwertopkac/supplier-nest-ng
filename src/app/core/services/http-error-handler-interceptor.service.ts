import { MessageService } from 'primeng/api';
import { HttpInterceptorFn,  HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of } from 'rxjs';
import { UserAuthService } from './common/models/user-auth.service';
export const HttpErrorHandlerInterceptorService: HttpInterceptorFn = (req, next) => {
    const userAuthService = inject(UserAuthService);
    const router = inject(Router);
    const spinner = inject(NgxSpinnerService);
    const messageService = inject(MessageService);

	return next(req).pipe(
		catchError((error) => {
			switch (error.status) {
				case HttpStatusCode.Unauthorized:
					userAuthService
						.refreshTokenLogin(localStorage.getItem('refreshToken'), (state) => {
							if (!state) {
								const url = router.url;
								messageService.add({
									summary: 'Yetkisiz işlem!',
									detail: 'Bu işlemi yapmaya yetkiniz bulunmamaktadır!'
								});
							}
						})
						.then((data) => {
							messageService.add({
								summary: 'Yetkisiz işlem!',
								detail: 'Bu işlemi yapmaya yetkiniz bulunmamaktadır!'
							});
						});
					break;
				case HttpStatusCode.InternalServerError:
					messageService.add({
						summary: 'Sunucu hatası!',
						detail: 'Sunucuya erişilmiyor!'
					});

					break;
				case HttpStatusCode.BadRequest:
					messageService.add({
						summary: 'Gersiz İstek!'
					});

					break;
				case HttpStatusCode.NotFound:
					messageService.add({
						summary: 'HATA!',
						detail: 'Sayfa bulunamadı!'
					});
					break;
				default:
					messageService.add({
						summary: 'HATA!',
						detail: 'Beklenmeyen bir hata meydana gelmiştir!'
					});

					break;
			}

			spinner.hide();
			return of(error);
		})
	);
};
