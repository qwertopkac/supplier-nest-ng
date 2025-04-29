import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
	const token: string = localStorage.getItem('accessToken');
	// Eğer token varsa, istek başlığına ekliyoruz
	if (token) {
		const cloned = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});
		return next(cloned);
	}

	// Token yoksa, isteği olduğu gibi gönderebiliriz
	return next(req);
};


