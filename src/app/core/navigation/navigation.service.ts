import { Injectable } from '@angular/core';
import { filter, Observable, of, ReplaySubject, Subject, take, takeUntil, tap } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { Navigation } from './navigation.types';
import { compactNavigation, defaultNavigation} from './data';
import { LayoutService } from '../../../@lhacksrt/services/layout/layout.service';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private destroy$ = new Subject<void>();

    private preAdminItems: Navigation = {} as Navigation;

    private items: Navigation = {
        compact: compactNavigation,
        default: defaultNavigation,
    } as Navigation;

    
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    constructor(
        private _layoutService: LayoutService,
        private _router: Router,
    ) {
        this._router.events
        .pipe(
            filter((event) => event instanceof NavigationEnd),
            takeUntil(this.destroy$)
        ).subscribe(() => {
            const mainRoute: ActivatedRouteSnapshot | null = this._router.routerState.snapshot.root.firstChild?.firstChild || null
            const aside = mainRoute?.data["aside"] || 'default';
            this.switchLayoutNavigation(aside);
        });
    }

    private getCurrentRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot | null {
        if (route.firstChild) {
          return this.getCurrentRoute(route.firstChild);
        }
        return route;
    }


    private fillChildren(navigation: Navigation): Navigation {
        navigation.compact.forEach((compactNavItem) => {
            navigation.default.forEach((defaultNavItem) => {
                if (defaultNavItem.id === compactNavItem.id) {
                    compactNavItem.children = cloneDeep(defaultNavItem.children);
                }
            });
        });

        return navigation;
    }



    

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    get(): Observable<Navigation> {
        return of(this.items).pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }

    getPreAdmin(): Observable<Navigation> {
        return of(this.preAdminItems).pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }


    switchLayoutNavigation(nav: "default" | "preAdmin") {
        if (nav === 'default') {
            this._layoutService.setNavigation(this.fillChildren(this.items));
        } else {
            this._layoutService.setNavigation(this.fillChildren(this.preAdminItems));
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
