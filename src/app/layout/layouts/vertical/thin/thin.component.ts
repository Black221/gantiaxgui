import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AppNavigationService, Navigation } from '../../../../../@lhacksrt/components';
import { MediaWatcherService } from '../../../../../@lhacksrt/services/media-watcher/media-watcher.service';
import { VerticalNavigationComponent } from '../../../../../@lhacksrt/components/navigation/vertical/vertical.component';
import { LayoutService } from '../../../../../@lhacksrt/services/layout/layout.service';

@Component({
    selector     : 'thin-layout',
    templateUrl  : './thin.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ThinLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall!: boolean;
    navigation!: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _layoutService: LayoutService,
        private _mediaWatcherService: MediaWatcherService,
        private _appNavigationService: AppNavigationService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation data
        this._layoutService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._mediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._appNavigationService.getComponent<VerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
