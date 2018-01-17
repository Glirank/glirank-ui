import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { GamingSession, Team, Game } from 'app/models';
import { FormArray } from '@angular/forms/src/model';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      team1player1: ['', Validators.required],
      team1player2: ['', Validators.required],
      team2player1: ['', Validators.required],
      team2player2: ['', Validators.required],
      games: this.fb.array([this.createGameFormGroup(), this.createGameFormGroup()])
    })
  }

  private createGameFormGroup(): FormGroup {
    return this.fb.group({
      scoreTeam1: ['', Validators.required],
      scoreTeam2: ['', Validators.required]
    });
  }

  getGamesForm(): FormArray {
    return <FormArray>this.formGroup.get('games');
  }

  addNewGame(): void {
    (<FormArray>this.formGroup.get('games')).push(this.createGameFormGroup());
  }

  removeGame(index: number): void {
    (<FormArray>this.formGroup.get('games')).removeAt(index);
  }

  save() {
    if (this.formGroup.valid) {
      this.http.post('/api/gamingsession', this.buildResult()).subscribe(
        _ => {
          this.buildForm();
        },

      )
    } else {
      this.formGroup.markAsDirty();
      this.formGroup.markAsTouched();
    }
  }

  buildResult(): GamingSession {
    const result = new GamingSession();
    result.team1 = new Team(this.formGroup.get('team1player1').value, this.formGroup.get('team1player2').value);
    result.team2 = new Team(this.formGroup.get('team2player1').value, this.formGroup.get('team2player2').value);
    result.scores = [];
    for (const game of (<FormArray>this.formGroup.get('games')).controls) {
      const score = new Game();
      score.scoreTeam1 = game.get('scoreTeam1').value;
      score.scoreTeam2 = game.get('scoreTeam2').value;
      result.scores.push(score);
    }
    return result;
  }
}
