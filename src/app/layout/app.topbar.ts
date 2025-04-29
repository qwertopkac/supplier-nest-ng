import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from './service/layout.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AppConfigurator } from './app.configurator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CategoryService } from '../core/services/common/models/category.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-topbar',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		CommonModule,
		StyleClassModule,
		AppConfigurator,
		InputTextModule,
		InputGroupModule,
		InputGroupAddonModule,
		SelectModule,
		IconFieldModule,
		InputIconModule,
		DialogModule,
		ButtonModule,
		AutoCompleteModule,
		BreadcrumbModule
	],
	templateUrl: './app.topbar.html'
})
export class AppTopbar {
	visibleSearchDialog: boolean = false;
	value3!: string;
	searchTypes: any[] = [];
	selectedType: any = {};
	allData: any = {};
	searchTerm: string = '';
	items: MenuItem[] | undefined;
	home: MenuItem | undefined;

	categoryService = inject(CategoryService);
	spinnerService = inject(NgxSpinnerService);
	layoutService = inject(LayoutService);
	router = inject(Router);

	loading: boolean = false;
	selectedSearchItem: any = {};
	ngOnInit() {
		this.searchTypes = [
			{ id: 1, label: 'Tedarikçi' },
			{ id: 2, label: 'Ürün' }
		];
		this.selectedType = { id: 1, label: 'Tedarikçi' };
		this.home = { icon: 'pi pi-home', routerLink: '/' };
		this.items = [{ label: 'Electronics' }, { label: 'Computer' }, { label: 'Accessories' }, { label: 'Keyboard' }, { label: 'Wireless' }];
	}

	toggleDarkMode() {
		this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
	}

	async searchData(event: any) {
		this.spinnerService.show();
		this.allData = await this.categoryService.getAll(
			0,
			99999,
			event.query,
			() => {
				this.spinnerService.hide();
			},

			(errorMessage) => alert(errorMessage)
		);
	}

	route() {
        this.visibleSearchDialog=false;
		this.router.navigate(['/pages/catalog']);
	}
}
