import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/team-service';
import { pastScoreWithResult } from 'src/app/models/teams.model';
@Component({
  selector: 'app-teamscore',
  templateUrl: './team-score.component.html',
  styleUrls: ['./team-score.component.css']
})
export class TeamScoreComponent implements OnInit {
  selectedTeam:pastScoreWithResult  = {
    team:{id:0},
    past12daysResults:[]
  };
  constructor(private route: ActivatedRoute, private service: TeamService) { 

  }
  ngOnInit() {

    this.route.params.subscribe(params => {
      for (let i = 0; i < this.service.subject?.length; i++) {
        if (this.service.subject[i].team.abbreviation == params['teamScore']) {
          this.selectedTeam = this.service.subject[i]
        }
      }
    });
  }

}