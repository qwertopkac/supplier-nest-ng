import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { DlgItemSpecificationComponent } from './dlg-item-specification/dlg-item-specification.component';
import { EditorModule } from 'primeng/editor';
@Component({
	selector: 'app-manager',
	imports: [CommonModule, FormsModule,EditorModule, InputTextModule, FloatLabel, SelectModule, InputNumberModule, ButtonModule, MultiSelectModule, DividerModule, TableModule, DialogModule, DlgItemSpecificationComponent],
	templateUrl: './manager.component.html',
	styleUrl: './manager.component.scss'
})
export class ManagerComponent {
	@ViewChild(DlgItemSpecificationComponent) dlgItemSpecification!: DlgItemSpecificationComponent;
	objData: any = {};
	lstCategories: any[] = [];
	selectedCategory: any = {};
	lstUoms: any[] = [];
	selectedUoms: any[];
	lstItemSpecification: any[] = [];


    ShowDlgItemSpecification(){
        this.dlgItemSpecification.visible=true;
    }
}
