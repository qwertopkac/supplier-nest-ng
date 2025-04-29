import { Component, inject, OnInit } from '@angular/core';
import { SupplierFilterComponent } from './supplier-filter/supplier-filter.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorComponent } from '../../core/components/paginator/paginator.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from '../../core/services/common/models/company.service';
import { CommonModule } from '@angular/common';
@Component({
	selector: 'app-suppliers',
	standalone: true,
	imports: [CommonModule, SupplierFilterComponent, CardModule, ButtonModule, PaginatorComponent],
	templateUrl: './suppliers.component.html'
})
export class SuppliersComponent implements OnInit {
	companyCategoryService = inject(CompanyService);
	spinnerService = inject(NgxSpinnerService);
	allData: any = {};

	async ngOnInit() {
		this.fillData({ first: 0, rows: 10 });
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
