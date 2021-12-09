import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numbers : Array<number>;

  constructor() {
    this.numbers = Array(31).fill(0).map((x,i)=>i+1);
   }

  ngOnInit(): void {
  }

}
