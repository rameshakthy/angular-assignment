import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Payload } from '../models/payload.model';

@Injectable({
  providedIn: 'root',
})
export class PayloadService {
  private payloadUrl: string = 'https://api.spacexdata.com/v3/payloads';

  constructor(private http: HttpClient) {}

  public getAllPayloads(): Observable<Payload[]> {
    return this.http
      .get(this.payloadUrl)
      .pipe(map((items) => new Payload().collectionAdapt(items)));
  }
}
