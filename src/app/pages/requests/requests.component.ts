import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorComponent } from '../../core/components/paginator/paginator.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'app-requests',
	imports: [CommonModule, TableModule, InputIconModule,InputTextModule, IconFieldModule, InputIconModule, ButtonModule, PaginatorComponent],
	templateUrl: './requests.component.html'
})
export class RequestsComponent {
	allData: any = {};
	fillData(event: any) {}
}
