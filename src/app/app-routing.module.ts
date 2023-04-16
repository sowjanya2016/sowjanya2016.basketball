import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamScoreComponent } from './components/teamscore/team-score.component';
import { TrackTeamComponent } from './components/trackteam/track-team.component';

const routes: Routes = [
  {path:'',component:TrackTeamComponent},
  {path:'results/:teamScore',component:TeamScoreComponent},
  {path:'**',component:TrackTeamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
