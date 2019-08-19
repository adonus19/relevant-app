import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

import * as firebase from 'nativescript-plugin-firebase';
import { VimeoService } from "./vimeo.service";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions, private vimeo: VimeoService) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        firebase.init({
            showNotifications: true,
            showNotificationsWhenInForeground: true,
            onMessageReceivedCallback: (message) => {
                console.log(`Data: ${message.data}`);
                console.log(`Data: `, message.data);
                console.log(`JSON.stringify(Data): `, JSON.stringify(message.data));
                alert({
                    title: message.title || 'Important!',
                    message: message.data.body,
                    okButtonText: 'Ok'
                });
            }
        }).then(() => {
            console.log(`Connected to firebase`);
            return firebase.subscribeToTopic('relevant');
        })
            .then(() => console.log('Subscribed to Relevant'))
            .catch(err => {
                console.log('error received', err);
            });

        this.vimeo.vimeoAuth();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
