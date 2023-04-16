import { Component, OnInit } from '@angular/core';
import { PastResult } from 'src/app/models/past-scores.model';
import { Team, pastScoreWithResult } from 'src/app/models/teams.model';
import { TeamService } from 'src/app/team-service';
@Component({
  selector: 'app-trackteam',
  templateUrl: './track-team.component.html',
  styleUrls: ['./track-team.component.css']
})
export class TrackTeamComponent implements OnInit {
  public title: string = 'NBA Score Tracking App';
  public teamsList: Team[] = [];
  public selectedProperty: Team = { id: 0 };
  public pastResult: PastResult[] = [];
  public selectedTeams: pastScoreWithResult[] = [];
  constructor(public teamService: TeamService) { } 

  ngOnInit(): void {
    if (this.teamService.teamslist.length != 0) {
      this.teamsList = this.teamService.teamslist;
      this.selectedProperty = this.teamService.teamslist[0];
    } else {
      this.teamService.getTeams().subscribe(response => {
        this.teamsList = response?.data;
        this.teamService.teamslist = response.data;
        this.selectedProperty = this.teamService.teamslist[0];
      },error => {  // error response
        console.log('oops', error)
      });
    }
    if (this.teamService.subject) {
      this.selectedTeams = this.teamService.subject;
    }
  }

  trackTeam() {
    this.teamService.getPastResults(this.selectedProperty.id).subscribe(res => {
      console.log('df', JSON.stringify(res))
      this.pastResult = res.data;
      let avgptsScored = 0;
      let avgptsConceded = 0;
      for (let i = 0; i < this.pastResult.length; i++) {
        if (this.pastResult[i].home_team.id == this.selectedProperty?.id) {
          if (this.pastResult[i].home_team_score > this.pastResult[i].visitor_team_score) {
            this.pastResult[i].gameResult = 'W';
          } else {
            this.pastResult[i].gameResult = 'L';
          }
          avgptsScored = avgptsScored + this.pastResult[i].home_team_score;
          avgptsConceded = avgptsConceded + this.pastResult[i].visitor_team_score
        }
        else {
          if (this.pastResult[i].home_team_score > this.pastResult[i].visitor_team_score) {
            this.pastResult[i].gameResult = 'L';
          } else {
            this.pastResult[i].gameResult = 'W';
          }
          avgptsScored = avgptsScored + this.pastResult[i].visitor_team_score;
          avgptsConceded = avgptsConceded + this.pastResult[i].home_team_score
        }
      }
      this.selectedProperty.avgPtsScored = this.avgCalculation(avgptsScored, this.pastResult.length)
      this.selectedProperty.avgPtsConceded = this.avgCalculation(avgptsConceded, this.pastResult.length)
      this.selectedProperty.logoUrl = this.teamService.getTeamImage(this.selectedProperty.abbreviation);
      let past12daysRes: pastScoreWithResult = {
        "team": this.selectedProperty,
        "past12daysResults": this.pastResult
      }
      this.selectedTeams.push(past12daysRes);
      console.log('this.sele', this.selectedTeams)
      this.teamService.subject = (this.selectedTeams);
    },error => {  // error response
      console.log('oops', error)
    });
  }

  removeTeamCard(teamCode: string) {
    for (let i = 0; i < this.selectedTeams.length; i++) {
      if ((teamCode) == this.selectedTeams[i]?.team.abbreviation) {
        this.selectedTeams.splice(i, 1)
      }
    }
  }

  avgCalculation(totalPoints: number, noOfMatches: number): number {
    return Math.round(totalPoints / noOfMatches)
  }
}