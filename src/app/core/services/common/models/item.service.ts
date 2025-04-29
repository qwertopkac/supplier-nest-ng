import { inject, Injectable, resource, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { ApiResponse } from '../../../models/api-response';

@Injectable({
	providedIn: 'root'
})
export class ItemService {
	httpCLientService = inject(HttpClientService);
	controller: string = 'items';

	async getAll(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ApiResponse> {
		const observable: Observable<any> = this.httpCLientService.get({
			controller: this.controller,
			queryString: `page=${page}&size=${size}`
		});

		const promiseData = firstValueFrom(observable);
		promiseData.then((value) => successCallBack()).catch((error) => errorCallBack(error));

		return await promiseData;
	}
	async create(order: any): Promise<void> {
		const observable: Observable<ApiResponse> = this.httpCLientService.post(
			{
				controller: this.controller
			},
			order
		);

		await firstValueFrom(observable);
	}

	async update(data: any): Promise<void> {
		const observable: Observable<any> = this.httpCLientService.put(
			{
				controller: this.controller
			},
			data
		);

		await firstValueFrom(observable);
	}

	async getById(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
		const observable: Observable<any> = this.httpCLientService.get<any>(
			{
				controller: this.controller
			},
			id
		);

		const promiseData = firstValueFrom(observable);
		promiseData.then((value) => successCallBack()).catch((error) => errorCallBack(error));

		return await promiseData;
	}
}
