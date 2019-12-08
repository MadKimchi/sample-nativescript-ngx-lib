import { Component, OnInit, Input } from '@angular/core';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import {
    PanGestureEventData,
    GestureStateTypes
} from 'tns-core-modules/ui/gestures/gestures';
import { ICarouselContent } from './interfaces';

@Component({
    selector: 'Carousel',
    moduleId: module.id,
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
    @Input() public carouselContent: ICarouselContent[];

    currentDetailType: string = 'profile';
    prevDeltaX: number = 0;
    defaultX: number = 0;
    selectedIndex: number;
    origin: number = 0;

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
                const currentIndex = Math.abs(originX / 360);
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
            const originX = this.getOrigin(-index * 360, container);

            container.animate({
                translate: { x: originX, y: 0 },
                duration: 200
            });

            this.origin = originX;
            this.prevDeltaX = 0;
            this.selectedIndex = index;
        }
    }

    public isSelected(name): boolean {
        return this.currentDetailType === name;
    }

    private getOrigin(deltaX: number, container: StackLayout): number {
        if (deltaX >= 0) {
            return this.origin != 0 ? this.origin + 360 : 0;
        } else {
            const itemLength = container.getChildrenCount();
            const isLastItem = this.origin! < -(360 * (itemLength - 2)); // this actually should calculate the screen width
            return isLastItem ? -(360 * (itemLength - 1)) : this.origin - 360; // this actually should calculate the screen width
        }
    }
}
