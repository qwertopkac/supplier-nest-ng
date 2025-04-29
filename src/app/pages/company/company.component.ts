import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-company',
  imports: [CommonModule,BreadcrumbModule,ButtonModule,TabsModule,Avatar,BadgeModule  ],
  templateUrl: './company.component.html'
})
export class CompanyComponent {
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Electronics' },
            { label: 'Computer' },
            { label: 'Accessories' },
            { label: 'Keyboard' },
            { label: 'Wireless' }
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}
