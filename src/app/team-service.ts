import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { GamesResponse, Team } from './models/teams.model';
import { ApiEndPoints } from './constants';

@Injectable()
export class TeamService {
  public subject: any;
  public teamslist: Team[] = [];
  public pastTwelveDaysres = this.lastTwelveDaysformat(
    new Date().setDate(new Date().getDate() - 12), new Date()
  );

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getTeams(): Observable<GamesResponse> {
    return this.http.get<GamesResponse>(ApiEndPoints.teams);
  }

  getPastResults(id: number): Observable<GamesResponse> {
    let httpParams: HttpParams = new HttpParams();
    this.pastTwelveDaysres.forEach((date) => {
      httpParams = httpParams.append('dates[]', date);
    });
    httpParams = httpParams.append('team_ids[]', id);
    return this.http.get<GamesResponse>(ApiEndPoints.games, {
      params: httpParams,
    });
  }

  getTeamImage(teamCode: string | undefined) {
    return 'https://interstate21.com/nba-logos/' + teamCode + '.png';
  }

  lastTwelveDaysformat(pastdate: string | number | Date, today: string | number | Date) {
    for (var datesArray = [], d = new Date(pastdate); d <= new Date(today); d.setDate(d.getDate() + 1)
    ) {
      datesArray.push(new Date(d).toISOString().slice(0, 10));
    }
    return datesArray;
  }
}