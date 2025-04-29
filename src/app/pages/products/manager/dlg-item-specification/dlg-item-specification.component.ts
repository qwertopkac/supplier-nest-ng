import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'app-dlg-item-specification',
	imports: [CommonModule, DialogModule, FloatLabel, ButtonModule, FormsModule,InputTextModule],
	templateUrl: './dlg-item-specification.component.html',
	styleUrl: './dlg-item-specification.component.scss'
})
export class DlgItemSpecificationComponent {
	objData: any = {};
	visible :boolean;
}
