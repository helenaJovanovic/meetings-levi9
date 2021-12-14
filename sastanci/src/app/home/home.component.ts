import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { meeting } from '../models/meeting';
import { MeetingsService } from '../services/meetings.service';
import { Subscription, interval } from 'rxjs';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    numbers: Array<number>;

    constructor(private meetingsService: MeetingsService) {
        this.numbers = Array(31).fill(0).map((x, i) => i + 1);
    }

    ngOnInit(): void {

    }

    ngOnDestroy() {
    }

}
