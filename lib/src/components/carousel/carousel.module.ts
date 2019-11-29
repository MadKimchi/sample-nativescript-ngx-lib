import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { CarouselComponent } from "./carousel.component";

@NgModule({
    imports: [NativeScriptCommonModule],
    providers: [],
    exports: [CarouselComponent],
    declarations: [CarouselComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SnapCarouselModule {}
