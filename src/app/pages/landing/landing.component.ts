
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FooterSectionComponent } from './footersection.component';
import { HeroSectionComponent } from './herosection.component';
import { ButtonModule } from 'primeng/button';
import { AppTopbar } from '../../layout/app.topbar';
import { AppConfigService } from '../../core/service/appconfigservice';

@Component({
    selector: 'landing',
    standalone: true,
    templateUrl: './landing.component.html',

    imports: [CommonModule,  AppTopbar, ButtonModule, HeroSectionComponent,  FooterSectionComponent]
})
export class LandingComponent implements OnInit {
    subscription!: Subscription;

    isNewsActive = computed(() => this.configService.newsActive());

    isDarkMode = computed(() => this.configService.appState().darkTheme);

    landingClass = computed(() => {
        return {
            'layout-dark': this.isDarkMode(),
            'layout-light': !this.isDarkMode(),
            'layout-news-active': this.isNewsActive()
        };
    });

    constructor(
        private configService: AppConfigService,
        private metaService: Meta,
        private titleService: Title
    ) {}

    ngOnInit() {
        this.titleService.setTitle('PrimeNG - Angular UI Component Library');
        this.metaService.updateTag({
            name: 'description',
            content: 'The ultimate collection of design-agnostic, flexible and accessible Angular UI Components.'
        });
    }
}
