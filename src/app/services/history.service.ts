import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { HistoryModel } from '../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private historyUrl: string = 'https://api.spacexdata.com/v3/history';

  constructor(private http: HttpClient) {}

  public getAllHistories(): Observable<HistoryModel[]> {
    return this.http
      .get(this.historyUrl)
      .pipe(map((items) => new HistoryModel().collectionAdapt(items)));
  }
}
