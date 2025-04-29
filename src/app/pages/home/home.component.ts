import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
	selector: 'app-home',
	imports: [CommonModule, FormsModule, InputTextModule, InputGroupModule, InputGroupAddonModule],
	templateUrl: './home.component.html'
})
export class HomeComponent {
	text1: string = '';
}
