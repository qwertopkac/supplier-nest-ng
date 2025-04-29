import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

@Component({
	selector: 'paginator',
	imports: [CommonModule, PaginatorModule],
	templateUrl: './paginator.component.html'
})
export class PaginatorComponent {
    readonly allItems = input<any>({});
    @Output() onPageChange=new EventEmitter()
    constructor() {
        console.log(this.allItems());

    }


}
