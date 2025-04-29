import { ChangeDetectorRef, Component, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { AppFooter } from './app.footer';
import { LayoutService } from './service/layout.service';

import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { SelectButton } from 'primeng/selectbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
// import { CardsApp } from '../../pages/landingq/samples/cardsapp.component';
// import { ChatApp } from '../../pages/landingq/samples/chatapp.component';
// import { CustomersApp } from '../../pages/landingq/samples/customersapp.component';
// import { InboxApp } from '../../pages/landingq/samples/inboxapp.component';
// import { MoviesApp } from '../../pages/landingq/samples/moviesapp.component';
// import { OverviewApp } from '../../pages/landingq/samples/overviewapp.component';
import { SelectItem, MenuItem } from 'primeng/api';
import { AppConfigService } from '../core/service/appconfigservice';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [
		CommonModule,
		AppTopbar, // AppSidebar,
		RouterModule, // AppFooter,
		DropdownModule,
		CalendarModule,
		ChartModule,
		InputSwitchModule,
		SelectButton,
		ToggleSwitchModule,
		BadgeModule,
		TabMenuModule,
		FormsModule,
		DividerModule,
		AvatarModule,
		TooltipModule,
		// OverviewApp,
		// ChatApp,
		// InboxApp,
		// CardsApp,
		// MoviesApp,
		// CustomersApp,
		DrawerModule,
		OverlayBadgeModule,
		KnobModule,
		ButtonModule,
		AppSidebar,
		NgxSpinnerModule
	],
	templateUrl: './app.layout.html'
})
export class AppLayout {
	selectedSampleOption: any;

	sampleOptions: any;

	value1: number = 24;

	radioValue: string = 'S';

	dateValue!: Date;

	switchValue: boolean = true;

	dashboardSidebarVisible: boolean = false;

	chartData: any;

	chartOptions: any;

	selectButtonValue!: SelectItem;

	selectButtonOptions!: SelectItem[];

	user: any = null;

	users!: any[];

	items!: MenuItem[];

	rangeValues = [20, 80];

	subscription!: Subscription;

	selectedSidebarOption: string = 'Statistics';

	sidebarOptions: string[] = ['Interaction Logs', 'Preferences', 'Statistics', 'Opportunities'];

	churnRisk: number = 24;

	lineChartData: any = {};

	lineChartOptions: any = {};

	customerSatisfaction: number = 56;

	chartData2: any = {};

	chartOptions2: any = {};

	preferences: any;

	opportunities: any;

	callLogs: any;

	emailRecords: any;
	overlayMenuOpenSubscription: Subscription;

	menuOutsideClickListener: any;
	get isDarkMode(): boolean {
		return this.configService.appState().darkTheme;
	}

	@ViewChild(AppSidebar) appSidebar!: AppSidebar;

	@ViewChild(AppTopbar) appTopBar!: AppTopbar;

	constructor(
		public layoutService: LayoutService,
		public renderer: Renderer2,
		public router: Router,
		private configService: AppConfigService,
		@Inject(PLATFORM_ID) private platformId: any,
		private cd: ChangeDetectorRef
	) {
		this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
			if (!this.menuOutsideClickListener) {
				this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
					if (this.isOutsideClicked(event)) {
						this.hideMenu();
					}
				});
			}

			if (this.layoutService.layoutState().staticMenuMobileActive) {
				this.blockBodyScroll();
			}
		});

		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			this.hideMenu();
		});
	}
	returnValue(event: any) {
		console.log(event);
	}
	isOutsideClicked(event: MouseEvent) {
		const sidebarEl = document.querySelector('.layout-sidebar');
		const topbarEl = document.querySelector('.layout-menu-button');
		const eventTarget = event.target as Node;

		return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
	}

	hideMenu() {
		this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
		if (this.menuOutsideClickListener) {
			this.menuOutsideClickListener();
			this.menuOutsideClickListener = null;
		}
		this.unblockBodyScroll();
	}

	blockBodyScroll(): void {
		if (document.body.classList) {
			document.body.classList.add('blocked-scroll');
		} else {
			document.body.className += ' blocked-scroll';
		}
	}

	unblockBodyScroll(): void {
		if (document.body.classList) {
			document.body.classList.remove('blocked-scroll');
		} else {
			document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	get containerClass() {
		return {
			'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
			'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
			'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
			'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
			'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
		};
	}

	ngOnDestroy() {
		if (this.overlayMenuOpenSubscription) {
			this.overlayMenuOpenSubscription.unsubscribe();
		}

		if (this.menuOutsideClickListener) {
			this.menuOutsideClickListener();
		}
	}

	ngOnInit() {
		this.sampleOptions = [
			{
				icon: 'pi pi-home',
				title: 'Overview',
				src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/overview'
			},
			{
				icon: 'pi pi-comment',
				title: 'Chat',
				src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/chat',
				routerLink: '/chat'
			},
			{
				icon: 'pi pi-inbox',
				title: 'Inbox',
				src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/mail'
			},
			{
				icon: 'pi pi-th-large',
				title: 'Cards',
				src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/cards'
			},
			{
				icon: 'pi pi-user',
				title: 'Customers',
				src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/customers'
			},
			{
				icon: 'pi pi-video',
				title: 'Movies',
				src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/movies'
			}
		];
		this.selectedSampleOption = this.sampleOptions[0];

		this.selectButtonValue = { label: 'Styled', value: 1 };

		this.selectButtonOptions = [
			{ label: 'Styled', value: 1 },
			{ label: 'Unstyled', value: 2 }
		];

		this.items = [
			{ label: 'Home', icon: 'pi pi-fw pi-home' },
			{ label: 'Calendar', icon: 'pi pi-fw pi-calendar' }
		];

		this.users = [
			{ name: 'Amy Elsner', image: 'amyelsner.png' },
			{ name: 'Bernardo Dominic', image: 'bernardodominic.png' },
			{ name: 'Onyama Limba', image: 'onyamalimba.png' }
		];

		this.preferences = [
			{
				title: 'Email',
				prefs: [
					{ icon: 'pi pi-bell', title: 'Notification', checked: true },
					{ icon: 'pi pi-inbox', title: 'Newsletter', checked: false },
					{ icon: 'pi pi-sync', title: 'Product Updates', checked: false }
				]
			},
			{
				title: 'Telephone',
				prefs: [
					{ icon: 'pi pi-mobile', title: 'Phone Call', checked: true },
					{ icon: 'pi pi-volume-down', title: 'Voicemail', checked: false },
					{ icon: 'pi pi-comments', title: 'SMS text', checked: false }
				]
			},
			{
				title: 'Social Media',
				prefs: [
					{ icon: 'pi pi-clock', title: 'Automated Post', checked: true },
					{ icon: 'pi pi-user', title: 'Direct Message', checked: false }
				]
			},
			{
				title: 'Data Privacy',
				prefs: [
					{ icon: 'pi pi-box', title: 'Share Data with 3rd Parties', checked: true },
					{ icon: 'pi pi-file', title: 'Cookies', checked: false }
				]
			}
		];

		this.opportunities = [
			{
				title: 'Apollo',
				link: 'https://primevue.org/templates/apollo/',
				image: 'https://primefaces.org/cdn/primevue/images/layouts/apollo-vue.jpg',
				text: 'Keep your application fresh with Apollo, the newest and most modern template available.'
			},
			{
				title: 'Ultima',
				link: 'https://primevue.org/templates/ultima/',
				image: 'https://primefaces.org/cdn/primevue/images/layouts/ultima-vue.jpg',
				text: "Elevate your application's intuitiveness with Ultima's premium Material Design interface."
			},
			{
				title: 'Diamond',
				link: 'https://primevue.org/templates/diamond/',
				image: 'https://primefaces.org/cdn/primevue/images/layouts/diamond-vue.jpg',
				text: "Handle complex operations with elegance with Diamond's robust and powerful premium design."
			},
			{
				title: 'Atlantis',
				link: 'https://primevue.org/templates/atlantis/',
				image: 'https://primefaces.org/cdn/primevue/images/layouts/atlantis-vue.jpg',
				text: "Boost your application's capabilities, customization with the Atlantis template."
			},
			{
				title: 'Verona',
				link: 'https://primevue.org/templates/verona/',
				image: 'https://primefaces.org/cdn/primevue/images/layouts/verona-vue.jpg',
				text: "Achieve sophistication and subtlety with Verona's minimalistic, content-focused design."
			},
			{
				title: 'Freya',
				link: 'https://primevue.org/templates/freya/',
				image: 'https://primefaces.org/cdn/primevue/images/layouts/freya-vue.png',
				text: "Give your application a sleek, updated look with Freya's chic and modern premium template."
			}
		];

		this.callLogs = [
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
				name: 'Brook Simmons',
				time: '02.02.2024 | 45 min'
			},
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
				name: 'Jacob Jones',
				time: '02.02.2024 | 45 min'
			},
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
				name: 'Annette Black',
				time: '02.03.2024 | 13 min'
			},
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
				name: 'Arlene McCoy',
				time: '02.03.2024 | 14 min'
			},
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar10.jpg',
				name: 'Arlene Simmons',
				time: '02.03.2024 | 14 min'
			},
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
				name: 'Michael Brown',
				time: '02.04.2024 | 20 min'
			}
		];

		this.emailRecords = [
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
				name: 'Brook Simmons',
				time: '3:24 PM',
				title: 'Unleash Business Potential',
				text: 'Automate, analyze, and accelerate with our SaaS platform. Unshackle from mundane tasks and focus on scaling your business. Contact us for a demo today!'
			},
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
				name: 'Jacob Jones',
				time: '12.23.2023',
				title: 'Optimized Workflow Revolution  ',
				text: "Experience a workflow revolution with our intuitive SaaS tool. With enhanced features and optimized processes, it's efficiency like never before. Let's get in touch for a brief demo!"
			},
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar8.png',
				name: 'Annette Black',
				time: '12.17.2023',
				title: 'Innovation at Fingertips',
				text: 'With our SaaS solution, innovation is only a click away. Shape your future with pioneering features and minimalist design. Join us for your solution walk-through today!'
			},
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
				name: 'Arlene McCoy',
				time: '06.17.2023',
				title: 'Seamless Integration',
				text: 'Integrate effortlessly with our user-friendly SaaS tools. Streamline your operations and boost productivity. Discover more in our demo session.'
			},
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
				name: 'Arlene Simmons',
				time: '04.17.2023',
				title: 'Transform Your Business',
				text: 'Empower your team with our innovative SaaS solutions. Achieve unparalleled efficiency and drive growth. Book a demo to explore the possibilities.'
			},
			{
				image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
				name: 'Michael Brown',
				time: '01.05.2024',
				title: 'Next-Gen Collaboration',
				text: 'Experience the future of collaboration with our cutting-edge SaaS platform. Enhance teamwork and streamline communication. Contact us for a demo today!'
			}
		];

		if (isPlatformBrowser(this.platformId)) {
			this.chartData2 = this.setChartData();
			this.chartOptions2 = this.setChartOptions();
			this.lineChartData = this.setLineChartData();
			this.lineChartOptions = this.setLineChartOptions();
		}
	}

	setChartData() {
		const documentStyle = getComputedStyle(document.documentElement);
		const borderColor = documentStyle.getPropertyValue('--p-content-border-color');
		const hoverBackgroundColor = documentStyle.getPropertyValue('--p-primary-color');

		return {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [
				{
					type: 'bar',
					label: 'Investment Wallet',
					backgroundColor: borderColor,
					data: [100, 201, 404, 300, 140, 220, 314, 520, 145, 234, 325, 147],
					borderRadius: {
						topLeft: 4,
						topRight: 4
					},
					borderSkipped: true,
					barThickness: 20,
					hoverBackgroundColor: hoverBackgroundColor,
					hoverTransition: '1s ease all'
				}
			]
		};
	}

	setChartOptions() {
		const documentStyle = getComputedStyle(document.documentElement);
		const backgroundColor = documentStyle.getPropertyValue('--p-content-background');
		const textColor = documentStyle.getPropertyValue('--p-text-color');
		const borderColor = documentStyle.getPropertyValue('--p-content-border-color');
		const textMutedColor = documentStyle.getPropertyValue('--p-text-muted-color');

		const getOrCreateTooltip = (chart) => {
			let tooltipEl = chart.canvas.parentNode.querySelector('div.chartjs-tooltip');

			if (!tooltipEl) {
				tooltipEl = document.createElement('div');
				tooltipEl.classList.add('chartjs-tooltip');
				tooltipEl.style.backgroundColor = backgroundColor;
				tooltipEl.style.boxShadow =
					' 0px 33.12px 9.399px 0px rgba(0, 0, 0, 0.00), 0px 21.036px 8.504px 0px rgba(0, 0, 0, 0.01), 0px 12.084px 7.161px 0px rgba(0, 0, 0, 0.05), 0px 5.371px 5.371px 0px rgba(0, 0, 0, 0.09), 0px 1.343px 2.685px 0px rgba(0, 0, 0, 0.10)';
				tooltipEl.style.borderRadius = '7px';
				tooltipEl.style.color = textColor;
				tooltipEl.style.opacity = 1;
				tooltipEl.style.padding = '14.5px';
				tooltipEl.style.pointerEvents = 'none';
				tooltipEl.style.position = 'absolute';
				tooltipEl.style.transform = 'translate(-50%, 0)';
				tooltipEl.style.transition = 'all .2s ease';
				chart.canvas.parentNode.appendChild(tooltipEl);
			}

			return tooltipEl;
		};

		return {
			maintainAspectRatio: false,
			aspectRatio: 0.8,
			plugins: {
				chartAreaBorder: {
					borderColor: 'red',
					borderWidth: 2,
					borderDash: [5, 5],
					borderDashOffset: 2
				},
				tooltip: {
					enabled: false,
					padding: 5,
					position: 'nearest',
					external: function (context) {
						// Tooltip Element
						const { chart, tooltip } = context;
						const tooltipEl = getOrCreateTooltip(chart);

						// Hide if no tooltip
						if (tooltip.opacity === 0) {
							tooltipEl.style.opacity = 0;

							return;
						}

						if (tooltip.body) {
							const bodyLines = tooltip.body.map((b) => {
								const strArr = b.lines[0].split(':');
								const data = {
									text: strArr[0].trim(),
									value: strArr[1].trim()
								};

								return data;
							});

							// Clear old content
							tooltipEl.innerHTML = '';
							bodyLines.forEach((body, i) => {
								const text = document.createElement('div');

								text.appendChild(document.createTextNode('$' + body.value + 'K'));
								text.style.fontWeight = '500';
								text.style.lineHeight = '21px';
								text.style.fontSize = '14px';
								tooltipEl.appendChild(text);
							});
						}

						const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

						// Display, position, and set styles for font
						tooltipEl.style.opacity = 1;
						tooltipEl.style.left = positionX + tooltip.caretX + 'px';
						tooltipEl.style.top = positionY + tooltip.caretY + 'px';
						tooltipEl.style.font = tooltip.options.bodyFont.string;
						tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
					}
				},
				legend: {
					display: false
				}
			},
			scales: {
				x: {
					stacked: true,
					ticks: {
						color: textMutedColor
					},
					grid: {
						color: 'transparent',
						borderColor: 'transparent'
					}
				},
				y: {
					border: {
						display: false
					},
					stacked: true,
					ticks: {
						color: textMutedColor
					},
					grid: {
						color: borderColor,
						borderColor: 'transparent'
					}
				}
			}
		};
	}

	setLineChartData() {
		const { darkTheme } = this.configService.appState();

		return {
			labels: ['31', '1', '2', '3', '4', '5', '6', '7', '8'],
			datasets: [
				{
					label: 'My First Dataset',
					data: [60, 64, 57, 52, 58, 70, 75, 70, 60],
					fill: true,
					borderColor: '#16A34A',
					tension: 0.4,
					borderWidth: 1.5,
					pointBackgroundColor: '#16A34A',
					pointBorderColor: darkTheme ? '#09090B' : '#FFF',
					pointBorderWidth: 3,

					hideInLegendAndTooltip: false,
					pointStyle: function (context) {
						let index = context.dataIndex;

						if (index == 6) {
							return 'circle';
						} else {
							return 'line';
						}
					},
					pointRadius: function (context) {
						let index = context.dataIndex;

						if (index == 6) {
							return 6;
						} else {
							return 0.1;
						}
					},
					backgroundColor: (context) => {
						const bgColor = ['rgba(22,163,74,0.16)', 'rgba(22,163,74,0)'];

						if (!context.chart.chartArea) {
							return;
						}

						const {
							ctx,
							data,
							chartArea: { top, bottom }
						} = context.chart;
						const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
						const colorTranches = 1 / (bgColor.length - 1);

						for (let i = 0; i < bgColor.length; i++) {
							gradientBg.addColorStop(0 + i * colorTranches, bgColor[i]);
						}

						return gradientBg;
					}
				}
			],
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'top'
					},
					title: {
						display: true,
						text: 'Chart.js Line Chart'
					}
				}
			}
		};
	}

	setLineChartOptions() {
		const documentStyle = getComputedStyle(document.documentElement);
		const backgroundColor = documentStyle.getPropertyValue('--p-content-background');
		const textColor = documentStyle.getPropertyValue('--p-text-color');
		const borderColor = documentStyle.getPropertyValue('--p-content-border-color');
		const textMutedColor = documentStyle.getPropertyValue('--p-text-muted-color');

		const getOrCreateTooltip = (chart) => {
			let tooltipEl = chart.canvas.parentNode.querySelector('div.chartjs-tooltip');

			if (!tooltipEl) {
				tooltipEl = document.createElement('div');
				tooltipEl.classList.add('chartjs-tooltip');
				tooltipEl.style.backgroundColor = backgroundColor;
				tooltipEl.style.boxShadow =
					' 0px 33.12px 9.399px 0px rgba(0, 0, 0, 0.00), 0px 21.036px 8.504px 0px rgba(0, 0, 0, 0.01), 0px 12.084px 7.161px 0px rgba(0, 0, 0, 0.05), 0px 5.371px 5.371px 0px rgba(0, 0, 0, 0.09), 0px 1.343px 2.685px 0px rgba(0, 0, 0, 0.10)';
				tooltipEl.style.borderRadius = '7px';
				tooltipEl.style.color = textColor;
				tooltipEl.style.opacity = 1;
				tooltipEl.style.padding = '2px';
				tooltipEl.style.pointerEvents = 'none';
				tooltipEl.style.position = 'absolute';
				tooltipEl.style.transform = 'translate(-50%, 0)';
				tooltipEl.style.transition = 'all .2s ease';
				chart.canvas.parentNode.appendChild(tooltipEl);
			}

			return tooltipEl;
		};

		return {
			maintainAspectRatio: false,
			aspectRatio: 0.8,
			plugins: {
				chartAreaBorder: {
					borderColor: 'red',
					borderWidth: 2,
					borderDash: [5, 5],
					borderDashOffset: 2
				},
				tooltip: {
					enabled: false,
					padding: 8,
					position: 'nearest',
					external: function (context) {
						// Tooltip Element
						const { chart, tooltip } = context;
						const tooltipEl = getOrCreateTooltip(chart);

						// Hide if no tooltip
						if (tooltip.opacity === 0) {
							tooltipEl.style.opacity = 0;

							return;
						}

						if (tooltip.body) {
							const bodyLines = tooltip.body.map((b) => {
								const strArr = b.lines[0].split(':');
								const data = {
									text: strArr[0].trim(),
									value: strArr[1].trim()
								};

								return data;
							});

							// Clear old content
							tooltipEl.innerHTML = '';
							bodyLines.forEach((body, i) => {
								const text = document.createElement('div');

								text.appendChild(document.createTextNode(body.value + '.000'));
								text.style.fontWeight = '500';
								text.style.lineHeight = '21px';
								text.style.fontSize = '14px';
								tooltipEl.appendChild(text);
							});
						}

						const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

						// Display, position, and set styles for font
						tooltipEl.style.opacity = 1;
						tooltipEl.style.left = positionX + tooltip.caretX + 'px';
						tooltipEl.style.top = positionY + tooltip.caretY - 40 + 'px';
						tooltipEl.style.font = tooltip.options.bodyFont.string;
						tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
					}
				},
				legend: {
					display: false
				}
			},
			scales: {
				x: {
					stacked: true,
					ticks: {
						color: textMutedColor
					},
					grid: {
						color: 'transparent',
						borderColor: 'transparent'
					}
				},
				y: {
					display: false,
					grace: 14
				}
			}
		};
	}
}
