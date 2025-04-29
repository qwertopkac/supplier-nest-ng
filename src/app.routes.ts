import { HomeComponent } from './app/pages/home/home.component';
import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/app.layout';
import { Documentation } from './app/pages/documentation/documentation';
import { Notfound } from './app/pages/notfound/notfound';
import { LandingComponent } from './app/pages/landing/landing.component';
import { CardsApp } from './app/pages/landing/samples/cardsapp.component';
import { ChatApp } from './app/pages/landing/samples/chatapp.component';
import { CustomersApp } from './app/pages/landing/samples/customersapp.component';
import { InboxApp } from './app/pages/landing/samples/inboxapp.component';
import { MoviesApp } from './app/pages/landing/samples/moviesapp.component';
import { OverviewApp } from './app/pages/landing/samples/overviewapp.component';
import { AuthGuard } from './app/core/guards/auth.guard';
import { Dashboard } from './app/pages/dashboard/dashboard';

export const appRoutes: Routes = [

	{
		path: '',
		component: AppLayout,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: Dashboard},
			{ path: 'overview', component: OverviewApp },
			{ path: 'chats', component: ChatApp },
			{ path: 'inbox', component: InboxApp },
			{ path: 'cards', component: CardsApp },
			{ path: 'customers', component: CustomersApp },
			{ path: 'movies', component: MoviesApp },
			{ path: 'documentation', component: Documentation },
			{ path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
			{ path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }

		]
	},

	{ path: 'landing', component: LandingComponent },
	{ path: 'notfound', component: Notfound },
	{ path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
	{ path: '**', redirectTo: '/notfound' }
];
