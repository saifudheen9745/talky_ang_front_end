import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports:[RouterOutlet]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
