import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';
import { MatDialog } from '@angular/material';

import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  framelessControls: boolean;
  updateAvailable: boolean = false;
  title = 'Elapser';

  constructor(public dialog: MatDialog){
    this.framelessControls = process.platform !== "darwin";
    ipcRenderer.on("updateAvailable", () => {
      this.updateAvailable = true;
    });
  }

  update(){
    ipcRenderer.send("downloadUpdate");
  }

  openSettings(){
    this.dialog.open(SettingsComponent);
  }

  openAbout(){
    this.dialog.open(AboutComponent);
  }

  minimize(){
		ipcRenderer.send("minimize")
	}

	maximize(){
		ipcRenderer.send("maximize");
	}

	close(){
		ipcRenderer.send("close");
  }
}
