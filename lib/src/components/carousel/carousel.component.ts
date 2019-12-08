import { Component, OnInit, Input } from '@angular/core';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import {
    PanGestureEventData,
    GestureStateTypes
} from 'tns-core-modules/ui/gestures/gestures';
import { screen } from 'tns-core-modules/platform';
import { ICarouselContent } from './interfaces';

@Component({
    selector: 'Carousel',
    moduleId: module.id,
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
    @Input() public carouselContent: ICarouselContent[];
    @Input() public countPerScreen: number = 3;
    @Input() public gutter: number;

    public prevDeltaX: number = 0;
    public defaultX: number = 0;
    public selectedIndex: number;
    public origin: number = 0;
    public screenWidth: number = screen.mainScreen.widthDIPs;
    public carouselWidth: number;

    constructor() {
        this.carouselWidth = this.screenWidth / this.countPerScreen;
    }

    public ngOnInit(): void {
        this.defaultX = 0;
    }

    public onPanEvent(args: PanGestureEventData, container: StackLayout): void {
        const traceX: number =
            container.translateX + args.deltaX - this.prevDeltaX;

        switch (args.state) {
            case GestureStateTypes.changed:
                container.translateX = traceX;
                this.prevDeltaX = args.deltaX;
                break;
            case GestureStateTypes.ended:
                const originX = this.getOrigin(args.deltaX, container);
                const currentIndex = Math.abs(originX / this.carouselWidth);
                container.animate({
                    translate: { x: originX, y: 0 },
                    duration: 200
                });

                this.origin = originX;
                this.prevDeltaX = 0;
                this.selectedIndex = currentIndex;
                break;
            default:
                break;
        }
    }

    public setActiveItem(index: number, container: StackLayout): void {
        // TODO: double tap bug should be fixed
        if (index !== this.selectedIndex) {
            const originX = this.getOrigin(
                -index * this.carouselWidth,
                container
            );
            container.animate({
                translate: { x: originX, y: 0 },
                duration: 200
            });

            this.origin = originX;
            this.prevDeltaX = 0;
            this.selectedIndex = index;
        }
    }

    private getOrigin(deltaX: number, container: StackLayout): number {
        if (deltaX >= 0) {
            return this.origin != 0 ? this.origin + this.carouselWidth : 0;
        } else {
            const itemLength = container.getChildrenCount();
            const isLastItem =
                this.origin! <
                -(
                    this.carouselWidth *
                    (itemLength - (this.countPerScreen + 1))
                );

            console.log(isLastItem);
            return isLastItem
                ? -(this.carouselWidth * (itemLength - this.countPerScreen))
                : this.origin - this.carouselWidth;
        }
    }
}
