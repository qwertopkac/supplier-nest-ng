import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PaginatorComponent } from '../../core/components/paginator/paginator.component';
import { CompanyCategoryService } from '../../core/services/common/models/company-category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CardTableTemplate } from '../../core/components/card-html-template/card-table-template';

@Component({
	selector: 'app-catalog',
	imports: [CommonModule, BreadcrumbModule, CardModule, ButtonModule, TableModule, RatingModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, PaginatorModule, PaginatorComponent,CardTableTemplate],
	templateUrl: './catalog.component.html'
})
export class CatalogComponent {
	items: MenuItem[] | undefined;
	home: MenuItem | undefined;
	companyCategoryService = inject(CompanyCategoryService);
	spinnerService = inject(NgxSpinnerService);
	allData: any = {};
	loading: boolean = false;
	async ngOnInit() {
		this.fillData({ first: 0, rows: 10 });
		this.items = [{ label: 'Electronics' }, { label: 'Computer' }, { label: 'Accessories' }, { label: 'Keyboard' }, { label: 'Wireless' }];
		this.home = { icon: 'pi pi-home', routerLink: '/' };
	}

	async fillData(event: any) {
		this.spinnerService.show();
		this.allData = await this.companyCategoryService.getAll(
			event.page,
			event.rows,
			() => this.spinnerService.hide(),
			(errorMessage) => alert(errorMessage)
		);
	}
}
