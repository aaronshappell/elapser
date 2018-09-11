import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SettingsService } from '../shared/settings.service';
import { Settings } from '../shared/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  imageTypes: Array<string> = ["jpg", "png"];

  constructor(public dialogRef: MatDialogRef<SettingsComponent>, private settingsService: SettingsService) { }

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
    // TODO open electron browse dialog window and set save location
  }

}
