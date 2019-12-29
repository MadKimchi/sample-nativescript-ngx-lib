import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { EditorComponent } from './editor.component';

@NgModule({
    imports: [NativeScriptCommonModule],
    providers: [],
    exports: [EditorComponent],
    declarations: [EditorComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class EditorModule {}
