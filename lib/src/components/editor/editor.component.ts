import { Component, OnInit, Input } from '@angular/core';
import {
    WebViewExt,
    LoadEventData,
    ShouldOverrideUrlLoadEventData,
    LoadFinishedEventData,
    WebViewEventData
} from '@nota/nativescript-webview-ext';

@Component({
    selector: 'Editor',
    moduleId: module.id,
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    constructor() {}

    public ngOnInit(): void {}
    public webviewLoaded(args: LoadEventData): void {}
}
