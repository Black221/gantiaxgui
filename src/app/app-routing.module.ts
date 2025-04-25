import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { InitialDataResolver } from './app.resolver';
import { PermissionsGuard } from './core/permissions/permissions.guard';

const routerConfig: ExtraOptions = {
  preloadingStrategy       : PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};


const routes: Routes = [
    {path: '', pathMatch : 'full', redirectTo: 'office'},
    
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard'},

    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },

    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadComponent: () => import('./modules/auth/sign-out/sign-out.component').then(m => m.AuthSignOutComponent)},
            {path: 'reset-password', loadComponent: () => import('./modules/auth/reset-password/reset-password.component').then(m => m.AuthResetPasswordComponent)},
        ]
    },
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {
                path: "dashboard",
                loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
            },
            
            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule), data: {layout: "empty"}},
            {path: '**', redirectTo: '404-not-found'},
        ]
    },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
