import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as moment from "moment";
import { mapValues } from "lodash";

export interface Config {
  name: string;
  departures: { [key: string]: Departures[] };
}

export interface Departures {
  mode: "bus";
  line: string;
  line_name: string;
  aimed_departure_time: string;
  expected_departure_time: string;
  best_departure_estimate: string;
  bus_number: string;
  delay: string;
}

// tslint:disable-next-line: max-line-length
const URL =
  "https://transportapi.com/v3/uk/bus/stop/40004407177A/live.json?app_id=92ccbc9b&app_key=08155b6c5dcad61ad8000612ba8f0a29&group=route&nextbuses=yes";

export abstract class BusApiService {
  abstract getBusData(): Observable<Config>;
}

@Injectable()
export class RealBusApiService extends BusApiService {
  constructor(private http: HttpClient) {
    super();
  }

  getBusData(): Observable<Config> {
    return this.http.get(URL).pipe(
      map(
        (json: any): Config => ({
          // tslint:disable: no-string-literal
          name: json["name"],
          departures: mapValues(json["departures"], departures =>
            departures.map(
              (d: any): Departures => ({
                ...d,
                delay: this.getDelay(d)
              })
            )
          )
        })
      )
    );
  }

  getDelay(route: Departures): string {
    const aimTime = this.timeStringToMoment(route.aimed_departure_time);
    const bestTime = this.timeStringToMoment(route.best_departure_estimate);

    if (aimTime.isSame(bestTime)) {
      return "on time";
    }

    return bestTime.from(aimTime, true);
  }

  private timeStringToMoment(timeStr: string) {
    const parts = timeStr.split(":").map(Number);
    return moment()
      .hour(parts[0])
      .minute(parts[1])
      .second(0)
      .millisecond(0);
  }
}
