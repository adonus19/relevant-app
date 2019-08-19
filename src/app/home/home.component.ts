import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as firebase from 'nativescript-plugin-firebase/app';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    note = '';

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    sendNotification() {
        console.log('message to send: ', this.note);
        const createNotification = firebase.functions().httpsCallable('notification');
        createNotification(this.note)
            .then((message: any) => {
                console.log(message.data);
                // alert(message.data);
            })
            .catch(err => {
                console.error('error in sending message, ', err.error);
            });
    }
}
