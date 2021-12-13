import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, HostListener, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { meeting } from 'src/app/models/meeting';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() broj = 0;

  @Input() sastanci: meeting[] = [];

  lokalni_sastanci: meeting[] = [];

  subscriptions: Subscription[];

  users: User[];

  meetingForm = this.fb.group({
    Name: [''],
    Description: [''],
    Start: [''],
    End: [''],
    Usernames: ['']
  })

  constructor(private userService: UsersService, private fb: FormBuilder, private http: HttpClient, private changeDetection: ChangeDetectorRef) {
    this.users = [];
    this.subscriptions = [];

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.sastanci.length != 0) {
      this.lokalni_sastanci = this.sastanci;
    }
  }

  ngOnInit(): void {
    if (this.userService.korisnici === undefined) {
      this.userService.getUsers().subscribe((res) => {
        if (res !== undefined) {
          this.userService.korisnici = res;
          this.users = this.userService.getFetchedUsers();
        }
      })
    }
  }


  calcAttrId() {
    return `#idModala${this.broj}`;
  }

  calcAttr() {
    return `idModala${this.broj}`;
  }

  @HostListener("dblclick") onClick() {
    console.log("User Click using Host Listener")
  }

  uSate(begin: Date | undefined, end: Date | undefined) {
    if (begin === undefined || end === undefined) {
      return "undefined time";
    }
    begin = new Date(begin);
    end = new Date(end);
    return `${begin.toTimeString().substring(0, 5)} - ${end.toTimeString().substring(0, 5)}`;
  }

  onSubmit() {

    var meeting_var: meeting = new meeting();
    meeting_var.name = this.meetingForm.get("Name")?.value;
    meeting_var.description = this.meetingForm.get("Description")?.value;
    meeting_var.user_ids = this.meetingForm.get("Usernames")?.value;
    meeting_var.start_meeting = this.hourStringToDate(this.meetingForm.get("Start")?.value);
    meeting_var.end_meeting = this.hourStringToDate(this.meetingForm.get("End")?.value);



    this.subscriptions.push(this.http.post<meeting>("http://localhost:4000/meetings/addMeeting", meeting_var).subscribe(
      (res) => {

        this.lokalni_sastanci.push(res);
        //force reload of component
        this.lokalni_sastanci = this.lokalni_sastanci;
       
        this.changeDetection.detectChanges();
        this.ngOnInit(); 
      }
    ));
  }


  hourStringToDate(str: string) {
    var date = new Date();

    date.setFullYear(2022);
    date.setMonth(0);
    date.setDate(this.broj);
    date.setHours(Number(str.substring(0, 2)));
    date.setMinutes(Number(str.substring(3, 5)));
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
