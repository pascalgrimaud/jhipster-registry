import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    JHipsterRegistrySharedLibsModule,
    JHipsterRegistrySharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AuthSessionServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    LoginOAuth2Service,
    JhiLoginModalComponent,
    JhiRoutesService,
    JhiRefreshService,
    Principal,
    HasAnyAuthorityDirective,
} from './';

@NgModule({
    imports: [
        JHipsterRegistrySharedLibsModule,
        JHipsterRegistrySharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        JhiRoutesService,
        JhiRefreshService,
        AuthServerProvider,
        AuthSessionServerProvider,
        LoginService,
        LoginModalService,
        LoginOAuth2Service,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        JHipsterRegistrySharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class JHipsterRegistrySharedModule {}
