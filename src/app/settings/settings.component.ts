import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SettingsService } from '../shared/settings.service';
import { Settings } from '../shared/settings.model';
const { dialog } = require('electron').remote;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  imageTypes: Array<string> = ["jpg", "png"];

  constructor(public dialogRef: MatDialogRef<SettingsComponent>, private changeDetector: ChangeDetectorRef, private settingsService: SettingsService) { }

  ngOnInit() {
    // Initialize dialog with current settings
    this.settings = this.settingsService.getSettings();
  }

  saveSettings(){
    // Save settings via settings service and close dialog
    this.settingsService.setSettings(this.settings);
    this.dialogRef.close();
  }

  browseSaveLocation(){
    dialog.showOpenDialog({properties: ["openDirectory", "createDirectory"]}, (filePaths: String[]) => {
      if(filePaths){
        this.settings.saveLocation = filePaths[0].toString();
        this.changeDetector.detectChanges();
      }
    });
  }

}
