import { Injectable } from '@angular/core';
import { Settings } from './settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings;
  defaultSettings: Settings = new Settings("./", "jpg");

  constructor() {
    this.settings = this.defaultSettings.clone();
    // TODO: check for existing settings file, create default if non-existent or load existing file
  }

  getSettings(): Settings {
    return this.settings.clone();
  }

  setSettings(settings: Settings) {
    this.settings = settings.clone();
    // TODO: write new settings to file and notify user through snackbar
  }
}
