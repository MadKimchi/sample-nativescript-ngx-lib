import { Component, OnInit, Injector } from '@angular/core';
import { ICarouselContent } from 'sample-lib';
import { ExampleCarouselContentComponent } from '~/app/home/components/example-carousel-content/example-carousel-content.component';

@Component({
    selector: 'Home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public perScreen: number = 4;
    public carouselContentItems: Array<ICarouselContent> = [
        {
            component: ExampleCarouselContentComponent
        },
        {
            component: ExampleCarouselContentComponent
        },
        {
            component: ExampleCarouselContentComponent
        },
        {
            component: ExampleCarouselContentComponent
        },
        {
            component: ExampleCarouselContentComponent
        },
        {
            component: ExampleCarouselContentComponent
        },
        {
            component: ExampleCarouselContentComponent
        }
    ];

    constructor(public injector: Injector) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
