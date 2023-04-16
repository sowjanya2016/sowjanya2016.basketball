import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TeamService } from './team-service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TeamScoreComponent } from './components/teamscore/team-score.component';
import { TeamScoresComponent } from './components/teamsscores/team-scores.component';
import { TrackTeamComponent } from './components/trackteam/track-team.component';
import { HeaderInterceptor } from './hader.interceptor';

@NgModule({
  declarations: [
    AppComponent,TeamScoreComponent,
    TeamScoresComponent,
    TrackTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TeamService,DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
