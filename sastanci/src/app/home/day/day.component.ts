import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() broj = 0;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener("dblclick") onClick(){
    console.log("User Click using Host Listener")
  }

}
