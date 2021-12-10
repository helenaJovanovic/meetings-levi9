import { Component, OnInit, Input, HostListener } from '@angular/core';
import { meeting } from 'src/app/models/meeting';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() broj = 0;

  @Input() sastanci: meeting[] = [];


  constructor() { }

  ngOnInit(): void {
    
  }

  @HostListener("dblclick") onClick(){
    console.log("User Click using Host Listener")
  }

  uSate(begin: Date | undefined, end:Date | undefined)
  {
    if(begin === undefined || end === undefined){
      return "undefined time";
    }
    begin = new Date(begin);
    end = new Date(end);
    return `${begin.toTimeString().substring(0,5)} - ${end.toTimeString().substring(0,5)}`;
  }

}
