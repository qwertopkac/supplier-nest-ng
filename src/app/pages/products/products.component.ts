import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ItemService } from '../../core/services/common/models/item.service';
import { ProductService } from '../../core/services/common/models/product.service';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorComponent } from "../../core/components/paginator/paginator.component";
import { NgxSpinnerService } from 'ngx-spinner';
import { CardTableTemplate } from '../../core/components/card-html-template/card-table-template';

@Component({
	selector: 'app-products',
	imports: [CommonModule, BreadcrumbModule, CardModule, ButtonModule, TableModule, RatingModule, TagModule, IconFieldModule,
         InputTextModule, InputIconModule, PaginatorModule,  PaginatorComponent,CardTableTemplate

    ],
	templateUrl: './products.component.html',

})
export class ProductsComponent {
	items: MenuItem[] | undefined;
	home: MenuItem | undefined;
	productService = inject(ProductService);
	itemService = inject(ItemService);
	spinnerService = inject(NgxSpinnerService);
	allProducts: any = {};

	async ngOnInit() {
		this.getProducts({ first: 0, rows: 10 });

	}

	async getProducts(event: any) {
        this.spinnerService.show();
		this.allProducts = await this.productService.getAll(
			event.page,
			event.rows,
			() =>
                this.spinnerService.hide(),
			(errorMessage) => alert(errorMessage)
		);
	}


}
