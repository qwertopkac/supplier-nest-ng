import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CompanyComponent } from './company/company.component';
import { ProductsComponent } from './products/products.component';
import { ManagerComponent } from './products/manager/manager.component';
import { CatalogComponent } from './catalog/catalog.component';
import { RequestsComponent } from './requests/requests.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { ShortlistsComponent } from './shortlists/shortlists.component';
import { SavedComponent } from './saved/saved.component';
import { InfoRequestComponent } from './info-request/info-request.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'suppliers', component: SuppliersComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product-manager', component: ManagerComponent },
    { path: 'requests', component: RequestsComponent },
    { path: 'recent-activity', component: RecentActivityComponent },
    { path: 'shortlists', component: ShortlistsComponent },
    { path: 'saved', component: SavedComponent },
    { path: 'info-request', component: InfoRequestComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'company-profile', component: CompanyComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
