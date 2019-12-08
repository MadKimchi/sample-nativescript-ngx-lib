import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SnapCarouselModule } from 'sample-lib';
import { ExampleCarouselContentComponent } from '~/app/home/components/example-carousel-content/example-carousel-content.component';

@NgModule({
    imports: [NativeScriptCommonModule, HomeRoutingModule, SnapCarouselModule],
    declarations: [HomeComponent, ExampleCarouselContentComponent],
    entryComponents: [ExampleCarouselContentComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {}
