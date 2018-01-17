import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ArrayDataSource } from 'app/table/ArrayDataSource';
import { RankedEntity } from 'app/models/ranked-entity';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit {

  displayedColumns = ['rank', 'name', 'rating'];
  playerDataSource: ArrayDataSource<RankedEntity> | null;
  teamDataSource: ArrayDataSource<RankedEntity> | null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.playerDataSource = new ArrayDataSource();
    this.teamDataSource = new ArrayDataSource();
    this.http.get('api/rank/player').subscribe(
      (result: RankedEntity[]) => {
        if (result) {
          this.playerDataSource.setData(result);
        }
      });
    this.http.get('api/rank/team').subscribe(
      (result: RankedEntity[]) => {
        if (result) {
          this.teamDataSource.setData(result);
        }
      });
  }

}
