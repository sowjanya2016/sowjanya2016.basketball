import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-teamscores',
  templateUrl: './team-scores.component.html',
  styleUrls: ['./team-scores.component.css']
})
export class TeamScoresComponent implements OnInit {
  @Input() teamResults: any;
  @Output() removeTeam: EventEmitter<string> = new EventEmitter();
  constructor() { }
  ngOnInit() {
    console.log('resdsferg', JSON.stringify(this.teamResults))
  }
  removeCard(abbreviation: string) {
    this.removeTeam.emit(abbreviation);
  }
}