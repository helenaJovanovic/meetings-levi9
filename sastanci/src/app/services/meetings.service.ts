import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { meeting } from '../models/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<meeting[]> {
    return this.http.get<meeting[]>("http://localhost:4000/meetings/getAll");
  }

  getById(id: string): Observable<meeting>{
    return this.http.get<meeting>(`http://localhost:4000/meetings/getByMeetingId/${id}`);
  }

  getByDay(day: number): Observable<meeting[]>{
    return this.http.get<meeting[]>(`http://localhost:4000/meetings/getMeetingByDay/${day}`);
  }

  addMeeting(m: meeting): Observable<meeting>{
    return this.http.post<meeting>("http://localhost:4000/meetings/addMeeting", m);
  }

  deleteMeeting(id: string) {
    return this.http.delete(`http://localhost:4000/meetings/removeMeeting/${id}`);
  }
}
