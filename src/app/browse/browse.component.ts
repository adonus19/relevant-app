import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { registerElement } from "nativescript-angular/element-registry";
import { Video } from 'nativescript-videoplayer';
import { VimeoService } from "../vimeo.service";
registerElement("VideoPlayer", () => Video);

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    htmlIFrame = ``;

    constructor(private vimeo: VimeoService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.vimeo.getVideo().subscribe(res => {
            console.log(res);
            // this.htmlIFrame = res['html'] + `<script src="https://player.vimeo.com/api/player.js"></script>`;
            console.log(this.htmlIFrame);
            this.htmlIFrame = res['html'];
            // this.htmlIFrame = '<iframe src="https://player.vimeo.com/video/353694514?app_id=122963" allow="autoplay; fullscreen" allowfullscreen></iframe>';
        })

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
