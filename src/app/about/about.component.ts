import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  version: string;

  constructor() { }

  ngOnInit() {
    this.version = process.env.npm_package_version;
  }

}
