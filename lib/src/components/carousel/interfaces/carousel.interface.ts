import { Type, ReflectiveInjector } from '@angular/core';

export interface ICarouselContent {
    component: Type<any>;
    dataProvider?: ReflectiveInjector;
}

export interface ICarouselData<T> {
    data: T;
    pageIndex: number;
}
