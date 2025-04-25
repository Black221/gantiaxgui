import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { IconsModule } from './icons/icons.module';
import { TranslocoCoreModule } from './transloco/transloco.module';
import { OAuthModule } from 'angular-oauth2-oidc';


@NgModule({
    imports: [
        OAuthModule.forRoot(),
        AuthModule,
        IconsModule,
        TranslocoCoreModule
    ],
    providers: [
    ]
})
export class CoreModule {

    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    ) {
        // Do not allow multiple injections
        if ( parentModule ) {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
