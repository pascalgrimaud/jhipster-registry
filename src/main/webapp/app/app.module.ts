import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { JHipsterRegistrySharedModule, UserRouteAccessService } from './shared';
import { JHipsterRegistryAppRoutingModule} from './app-routing.module';
import { JHipsterRegistryHomeModule } from './home/home.module';
import { JHipsterRegistryAdminModule } from './admin/admin.module';
import { JHipsterRegistryModule } from './registry/registry.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        JHipsterRegistryAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        JHipsterRegistrySharedModule,
        JHipsterRegistryHomeModule,
        JHipsterRegistryAdminModule,
        JHipsterRegistryModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class JHipsterRegistryAppModule {}
