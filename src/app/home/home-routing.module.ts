import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

const routes: Routes = [
    { path: "", component: HomeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes), NativeScriptFormsModule],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
