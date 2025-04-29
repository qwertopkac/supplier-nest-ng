import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PaginatorComponent } from '../../core/components/paginator/paginator.component';

@Component({
  selector: 'app-info-request',
    imports: [CommonModule, TableModule, InputIconModule, InputTextModule, IconFieldModule, InputIconModule, ButtonModule, PaginatorComponent],

  templateUrl: './info-request.component.html',
  styleUrl: './info-request.component.scss'
})
export class InfoRequestComponent {
	allData: any = {};
	fillData(event: any) {}
}
