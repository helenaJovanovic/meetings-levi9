import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { meeting } from '../models/meeting';
import { User } from '../models/user';
import { MeetingsService } from '../services/meetings.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sastanci',
  templateUrl: './sastanci.component.html',
  styleUrls: ['./sastanci.component.css']
})
export class SastanciComponent implements OnInit {

  id: string | null;

  tajSastanak: meeting;

  subscriptions: Subscription[];

  start_time_local: Date;

  end_time_local: Date;

  users: User[];

  constructor(private route: ActivatedRoute, private http: HttpClient, private usersService: UsersService, private meetingsService: MeetingsService) {
    this.id = '';
    this.tajSastanak = new meeting();
    this.subscriptions = [];
    this.start_time_local = new Date();
    this.end_time_local = new Date();
    this.users = [];
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
        this.getMeetingInfo();
      }
      );
  }

  getMeetingInfo() {

    if (this.id !== null) {

      this.subscriptions.push(this.meetingsService.getById(this.id).subscribe(
        (res) => {
          this.tajSastanak = res;
          if (this.tajSastanak.start_meeting !== undefined) {
            this.start_time_local = new Date(this.tajSastanak.start_meeting);
          }

          if (this.tajSastanak.end_meeting !== undefined) {
            this.start_time_local = new Date(this.tajSastanak.end_meeting);
          }

          this.getUsersInMeeting()
        }
      ))
    }
  }

  getUsersInMeeting() {
    if (this.tajSastanak.user_ids !== undefined) {
      this.tajSastanak.user_ids.forEach(element => {

        this.subscriptions.push(

          this.usersService.getUser(element).subscribe(
            (res) => {
              if (res !== undefined && res !== null) {
                this.users.push(res);
              }
            }
          )
        )
      });
    }
  }

  deleteMeeting() {
    if (this.id != null) {
      this.subscriptions.push(this.meetingsService.deleteMeeting(this.id).subscribe((res) => {
        window.close();
      }));
    } 
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
