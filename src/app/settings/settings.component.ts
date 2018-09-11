import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SettingsComponent>) { }

  ngOnInit() {
  }

  saveSettings(){
    // TODO: Save settings via settings service
    this.dialogRef.close();
  }

}
