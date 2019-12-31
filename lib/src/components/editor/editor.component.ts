/// <reference path="../../../../node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="../../../../node_modules/tns-platform-declarations/android.d.ts" />
import { Component, OnInit } from '@angular/core';
import { ios as iosApp } from 'tns-core-modules/application/application';

@Component({
    selector: 'Editor',
    moduleId: module.id,
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    public editorSrc: string;

    constructor() {}

    public ngOnInit(): void {
        this.editorSrc =
            'sample-lib/src/components/editor/assets/views/index.html';
    }

    if(iosApp) {
        iosApp.addNotificationObserver(
            UIKeyboardWillShowNotification,
            (event: NSNotification) => {
                // console.log(event);
                // this._keyboardHeight = event.userInfo.valueForKey(
                //     UIKeyboardFrameEndUserInfoKey
                // ).CGRectValue.size.height;
                // this._element.set('height', this._keyboardHeight);
                // console.log('WillShow', typeof event.userInfo, event.userInfo.valueForKey(UIKeyboardFrameEndUserInfoKey).CGRectValue.size.height);
                // console.log(this.textView.ios.contentSize);
                // this.contentSizeStartValue = event.userInfo.valueForKey(UIKeyboardFrameEndUserInfoKey).CGRectValue.size.height + 10;
            }
        );

        iosApp.addNotificationObserver(
            UIKeyboardDidShowNotification,
            (event: NSNotification) => {
                // console.log(event);
                // const size = this._element.nativeElement.getActualSize().height;
                // console.log(size);
            }
        );
    }
}
