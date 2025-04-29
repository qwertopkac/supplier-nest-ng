import { Component } from '@angular/core';

@Component({
	selector: 'app-card-table-template',
	imports: [],
	template: `<div class="card">
		<div class="h-[84vh]">
			<ng-content></ng-content>
		</div>
	</div> `,
	//   host: {
	//     class: 'flex-1 h-full overflow-y-auto overflow-x-clip overflow-hidden flex border border-surface rounded-2xl'
	// },
})
export class CardTableTemplate {}
