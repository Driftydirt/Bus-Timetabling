import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Config {
  name: string;
  departures: {[key: string]: Departures[]};
}

export interface Departures {
  mode: 'bus';
  line: string;
  line_name: string;
  aimed_departure_time: string;
  expected_departure_time: string;
  best_departure_estimate: string;
  bus_number: string;
}

const URL = 'https://transportapi.com/v3/uk/bus/stop/40004407177A/live.json?app_id=92ccbc9b&app_key=08155b6c5dcad61ad8000612ba8f0a29&group=route&nextbuses=yes';

@Injectable({
  providedIn: 'root'
})
export class BusApiService {

  constructor(private http: HttpClient) { }

  getBusData(): Observable<Config> {
    return this.http.get(URL)
      .pipe(map((json: any) => ({
        name: json['name'],
        departures: json['departures']
      })));
  }
}
