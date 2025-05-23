import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { notifications as notificationsData } from './data';
import { MockApiService, MockApiUtils } from '../../../@lhacksrt/lib/mock-api';

@Injectable({
    providedIn: 'root'
})
export class NotificationsMockApi
{
    private _notifications: any = notificationsData;

    /**
     * Constructor
     */
    constructor(private _mockApiService: MockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Notifications - GET
        // -----------------------------------------------------------------------------------------------------
        this._mockApiService
            .onGet('api/common/notifications')
            .reply(() => [200, cloneDeep(this._notifications)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Notifications - POST
        // -----------------------------------------------------------------------------------------------------
        this._mockApiService
            .onPost('api/common/notifications')
            .reply(({request}) => {

                // Get the notification
                const newNotification = cloneDeep(request.body.notification);

                // Generate a new GUID
                newNotification.id = MockApiUtils.guid();

                // Unshift the new notification
                this._notifications.unshift(newNotification);

                // Return the response
                return [200, newNotification];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Notifications - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._mockApiService
            .onPatch('api/common/notifications')
            .reply(({request}) => {

                // Get the id and notification
                const id = request.body.id;
                const notification = cloneDeep(request.body.notification);

                // Prepare the updated notification
                let updatedNotification = null;

                // Find the notification and update it
                this._notifications.forEach((item: any, index: number, notifications: any[]) => {

                    if ( item.id === id )
                    {
                        // Update the notification
                        notifications[index] = assign({}, notifications[index], notification);

                        // Store the updated notification
                        updatedNotification = notifications[index];
                    }
                });

                // Return the response
                return [200, updatedNotification];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Notifications - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._mockApiService
            .onDelete('api/common/notifications')
            .reply(({request}) => {

                // Get the id
                const id = request.params.get('id');

                // Prepare the deleted notification
                let deletedNotification = null;

                // Find the notification
                const index = this._notifications.findIndex((item: any) => item.id === id);

                // Store the deleted notification
                deletedNotification = cloneDeep(this._notifications[index]);

                // Delete the notification
                this._notifications.splice(index, 1);

                // Return the response
                return [200, deletedNotification];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Mark all as read - GET
        // -----------------------------------------------------------------------------------------------------
        this._mockApiService
            .onGet('api/common/notifications/mark-all-as-read')
            .reply(() => {

                // Go through all notifications
                this._notifications.forEach((item: any, index: number, notifications: any[]) => {

                    // Mark it as read
                    notifications[index].read = true;
                    notifications[index].seen = true;
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Toggle read status - POST
        // -----------------------------------------------------------------------------------------------------
        this._mockApiService
            .onPost('api/common/notifications/toggle-read-status')
            .reply(({request}) => {

                // Get the notification
                const notification = cloneDeep(request.body.notification);

                // Prepare the updated notification
                let updatedNotification = null;

                // Find the notification and update it
                this._notifications.forEach((item: any, index: number, notifications: any[]) => {

                    if ( item.id === notification.id )
                    {
                        // Update the notification
                        notifications[index].read = notification.read;

                        // Store the updated notification
                        updatedNotification = notifications[index];
                    }
                });

                // Return the response
                return [200, updatedNotification];
            });
    }
}
