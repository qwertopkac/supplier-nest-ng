import { CommonModule } from '@angular/common';
import { Component, ElementRef, model, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, RouterModule, TooltipModule, DividerModule, AvatarModule],
	templateUrl: './app.sidebar.html'
})
export class AppSidebar implements OnInit {
	isSlimMenu: boolean = true;
	sampleAppsSidebarNavs: any;
	selectedSampleAppsSidebarNav: any;
	sampleAppsSidebarNavsMore: any;
	dashboardSidebarVisible = model(false);

	constructor(public el: ElementRef) {}
	ngOnInit(): void {
		this.selectedSampleAppsSidebarNav = 'Overview';
		this.sampleAppsSidebarNavsMore = [{ icon: 'pi pi-cog', title: 'Settings' }];
		this.sampleAppsSidebarNavs = [
			{ icon: 'pi pi-home', title: 'Overview', routerLink: '/overview' },
			{ icon: 'pi pi-send', title: 'Talepler', routerLink: '/pages/requests' },
			{ icon: 'pi pi-envelope', title: 'Bilgi Talepleri(RFI) ', routerLink: '/pages/info-request' },
			{ icon: 'pi pi-history', title: 'Son Hareketler', routerLink: '/pages/recent-activity' },
			{ icon: 'pi pi-comments', title: 'Mesaj Kutusu', routerLink: '/chats' },
			{ icon: 'pi pi-list', title: 'Kısa Listeler', routerLink: '/pages/shortlists' },
			{ icon: 'pi pi-bookmark', title: 'Kaydedilenler', routerLink: '/pages/saved' }
			// { icon: 'pi pi-inbox', title: 'Inbox', routerLink: '/inbox' },
			// { icon: 'pi pi-th-large', title: 'Cards', routerLink: '/cards' },
			// { icon: 'pi pi-user', title: 'Customers', routerLink: '/customers' },
			// { icon: 'pi pi-video', title: 'Movies', routerLink: '/movies' }
		];
	}

	setSelectedSampleAppsSidebarNav(title) {
		this.selectedSampleAppsSidebarNav = title;
	}
}
