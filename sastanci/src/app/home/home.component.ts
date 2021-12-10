import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { meeting } from '../models/meeting';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*
    TODO: Instaliraj moment 

    nadji datume za taj mesec
    prikupi podatke o satu i korisniku (posle promeni bekend da sadrzi niz korisnika umesto jednog samo)

    provali kako da prikazes u odgovarajucem polju

  */

  sastanci: meeting[] = [];


  numbers: Array<number>;

  constructor(private http: HttpClient) {
    this.numbers = Array(31).fill(0).map((x, i) => i + 1);
    
  }

  ngOnInit(): void {
    this.http.get<meeting[]>("http://localhost:4000/meetings/getAll").subscribe(
      (res) => {
        this.sastanci = res;
        console.log(this.sastanci);
      }
    );
  }

  sastanakZaDan(dan: number): meeting[] {
    let sastanciZaTajDan: meeting[] = [];

    this.sastanci.forEach((el) => {
      if (el.start_meeting !== undefined) {

        var datum = new Date(el.start_meeting);
        if (datum.getDate() == dan) {
          sastanciZaTajDan.push(el);
        }

      }
    })

    return sastanciZaTajDan;
  }

}
