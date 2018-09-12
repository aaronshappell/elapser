import { Component, OnInit } from '@angular/core';
import { remote } from 'electron';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  version: string;

  constructor() { }

  ngOnInit() {
    this.version = remote.app.getVersion();
  }

}
