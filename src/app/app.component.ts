import { Component } from '@angular/core';
import {ScreenshotService} from "./shared/screenshot.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private screenshotService: ScreenshotService){}
}
