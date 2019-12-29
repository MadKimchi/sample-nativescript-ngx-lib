import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
// import { WebViewInterface } from 'nativescript-webview-interface';
// import {LoadEventData, WebView} from 'tns-core-modules/ui/web-view';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as fs from 'tns-core-modules/file-system';
import { ModalDialogParams } from 'nativescript-angular';
import {
    WebViewExt,
    LoadEventData,
    ShouldOverrideUrlLoadEventData,
    LoadFinishedEventData,
    WebViewEventData
} from '@nota/nativescript-webview-ext';
// import { Toolbar } from '../toolbar/keyboard-toolbar';
import { WebView } from 'tns-core-modules/ui/web-view/web-view';
import { ios as iosApp } from 'tns-core-modules/application/application';
// import { ListViewGridLayout } from 'nativescript-ui-listview';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';

@Component({
    selector: 'Editor',
    moduleId: module.id,
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    @ViewChild('webView', { static: false })
    webView: ElementRef;
    // @ViewChild('toolBarRef', { static: false })
    // toolbarRef: Toolbar;
    public webview: WebViewExt;
    public gotMessageData: any = null;
    public email: string;
    public editorSrc: string;
    public viewLoaded: boolean;
    language: string;

    selectedLanguage: string;

    lstLanguages: string[] = ['English', 'Sanskrit', 'French'];
    public gridView: GridLayout;
    // private oLangWebViewInterface: WebViewInterface;
    @ViewChild('container', { static: false })
    private _element: GridLayout;
    private _keyboardHeight: number = 0;
    private _elementHeight: number = 0;
    private _observerIDs: Array<object> = new Array();

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private params: ModalDialogParams
    ) {}

    public ngOnInit(): void {
        // this.editorSrc = encodeURI(`${fs.knownFolders.currentApp().path}/www/views/editor/index.html`);
        // console.log(this.editorSrc);
        this.editorSrc = '~/www/index.html';
        // iOS keyboard events
        if (iosApp) {
            iosApp.addNotificationObserver(
                UIKeyboardWillShowNotification,
                (event: NSNotification) => {
                    // console.log(event);
                    this._keyboardHeight = event.userInfo.valueForKey(
                        UIKeyboardFrameEndUserInfoKey
                    ).CGRectValue.size.height;
                    this._element.set('height', this._keyboardHeight);
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

    // Stop events to avoid a memory leak
    ngOnDestroy(): void {
        if (iosApp) {
            // let index: number = 0;
            // for (index; index < this._observerIDs.length; index++) {
            //     let observerId: number = this._observerIDs[index]['id'],
            //         eventName:  string = this._observerIDs[index]['event'];
            //     iosApp.removeNotificationObserver(observerId, eventName);
            // }
        }
    }

    public getSize(args): void {
        console.log(args);
    }

    public webviewLoaded(args: LoadEventData): void {
        this.webview = args.object;
        // this.toolbarRef.;
        console.log('webview loaded!!!!!!', args.url);
        // this.webview.registerLocalResource("index.html", "~/assets/test-data/html/javascript-calls.html");

        // if (isAndroid) {
        //     webview.src = "http://10.0.2.2:8080";
        // } else {
        //     this.webview.src = "http://localhost:8080";
        // }
        this.webview.src = '~/www/index.html';
        this.webview.on(
            WebViewExt.shouldOverrideUrlLoadingEvent,
            (args: ShouldOverrideUrlLoadEventData) => {
                console.log(args.url);
                console.log(args.httpMethod);

                // if (args.url.indexOf("google.com") !== -1) {
                //     args.cancel = true;
                // }
            }
        );

        this.webview.on(
            WebViewExt.loadFinishedEvent,
            (args: LoadFinishedEventData) => {
                console.log(`WebViewExt.loadFinishedEvent: ${args.url}`);
                var height = args.url.split('#')[1];
                console.log(height);
                if (height) {
                    this._elementHeight = parseInt(height);
                    // (<WebView>args.object).height = Number(height);
                }
                // this.webview.loadStyleSheetFile("local-stylesheet.css", "~/assets/test-data/css/local-stylesheet.css", false);
            }
        );

        this.webview.on('gotMessage', msg => {
            // this.gotMessageData = msg.data;

            console.log(
                `webview.gotMessage: ${JSON.stringify(
                    msg.data
                )} (${typeof msg})`
            );
        });

        this.webview.on('log', msg => {
            console.log(msg);
        });

        this.webview.on('onHasVariableTrigger', (msg: WebViewEventData) => {
            console.log(
                `webview.gotMessage: ${JSON.stringify(
                    msg.data
                )} (${typeof msg})`
            );
        });
    }

    public ngAfterViewInit(): void {
        this.viewLoaded = true;

        // const webview = <WebView>this.webView.nativeElement;
        // webview.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
        //     console.log(args.url);
        // });
    }

    public close(): void {
        this.params.closeCallback();
    }

    public communicate(): void {
        this.executeJavaScriptTest('getNumber()', 42).then(() => {
            console.log('done!!');
        });
        this.params.closeCallback();
    }

    public executeJavaScriptTest<T>(js: string, expected?: T): Promise<T> {
        return this.webview
            .executeJavaScript<T>(js)
            .then((res: T) => {
                console.log(
                    `executeJavaScript '${js}' => ${JSON.stringify(
                        res
                    )} (${typeof res})`
                );
                const jsonRes = JSON.stringify(res);
                const expectedJson = JSON.stringify(expected);
                // if (expected !== undefined && !_.isEqual(expected, res)) {
                //     return Promise.reject(new Error(`Expected: ${expectedJson}. Got: ${jsonRes}`));
                // }
                return Promise.resolve(res);
            })
            .catch(err => {
                console.log(`executeJavaScript '${js}' => ERROR: ${err}`);
                throw err;
            });
    }
}
