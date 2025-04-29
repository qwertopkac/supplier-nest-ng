import { JobFunctionService } from './../../core/services/common/models/job-function.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
@Component({
	selector: 'app-user-profile',
	imports: [CommonModule, ButtonModule, CardModule, FormsModule, InputTextModule, FloatLabelModule, SelectModule, AvatarModule],
	templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
	objData: any = {};
	objLists: any = {
        lstJobFunctions:[]

    };
	lstJobLevel: any = [];
	lstDiscipline: any = [];
	lstIndustry: any = [];
	lstCity: any = [];
	spinnerService = inject(NgxSpinnerService);
	jobFunctionService = inject(JobFunctionService);

	ngOnInit(): void {
		this.getJobFunctions();
	}

	async getJobFunctions() {
		this.spinnerService.show();
        const { items = [] }  = await this.jobFunctionService.get(

			() => this.spinnerService.hide(),
			(errorMessage) => alert(errorMessage)
		);
        this.objLists.lstJobFunctions=items;
console.log(this.objLists);


	}
}
