import { Component } from '@angular/core';

@Component({
    selector: 'ExampleCarouselContent',
    templateUrl: './example-carousel-content.component.html',
    styleUrls: ['./example-carousel-content.component.scss']
})
export class ExampleCarouselContentComponent {
    public onTab(): void {
        console.log('onTapping');
    }
}
