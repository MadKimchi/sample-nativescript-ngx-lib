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
    @Input() public countPerScreen: number = 2;
    @Input() public gutter: number = 10;
    @Input() public offset: number = 10;

    public prevDeltaX: number = 0;
    public defaultX: number = 0;
    public selectedIndex: number = 0;
    public origin: number = 0;
    public screenWidth: number = screen.mainScreen.widthDIPs;
    public carouselWidth: number;

    public get halfGutter(): number {
        return this.gutter / 2;
    }

    constructor() {}

    public ngOnInit(): void {
        this.carouselWidth =
            this.screenWidth / this.countPerScreen -
            this.gutter -
            this.offset / 2;
        this.defaultX = this.gutter;
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
                container.animate({
                    translate: { x: originX + this.offset, y: 0 },
                    duration: 200
                });

                this.origin = originX;
                this.prevDeltaX = 0;
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
        const lastIndex = container.getChildrenCount() - 1;
        return deltaX >= 0 ? this.onPanLeft() : this.onPanRight(lastIndex);
    }

    private onPanLeft(): number {
        if (this.selectedIndex > 0) {
            this.selectedIndex -= 1;
            const newCarouselX = this.selectedIndex * this.carouselWidth;
            return -newCarouselX;
        }

        return 0;
    }

    // TODO: Refactor this better for the
    private onPanRight(lastIndex: number): number {
        if (this.countPerScreen === 1) {
            if (this.selectedIndex >= lastIndex - 1) {
                const newCarouselX = lastIndex * this.carouselWidth;

                if (this.selectedIndex <= lastIndex - 1) {
                    this.selectedIndex += 1;
                }
                return -newCarouselX;
            }
        } else if (this.countPerScreen === 2) {
            if (this.selectedIndex >= lastIndex - 2) {
                const newCarouselX =
                    (lastIndex - 1) * this.carouselWidth -
                    this.gutter -
                    this.halfGutter;

                if (this.selectedIndex <= lastIndex - 2) {
                    this.selectedIndex += 1;
                }
                return -newCarouselX;
            }
        } else if (this.countPerScreen === 3) {
            if (this.selectedIndex >= lastIndex - 3) {
                const newCarouselX =
                    (lastIndex - 2) * this.carouselWidth - this.gutter * 3;

                if (this.selectedIndex <= lastIndex - 3) {
                    this.selectedIndex += 1;
                }
                return -newCarouselX;
            }
        }

        this.selectedIndex += 1;
        const newCarouselX = this.selectedIndex * this.carouselWidth;
        return -newCarouselX;
    }
}
