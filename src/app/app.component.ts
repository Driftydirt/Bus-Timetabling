import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import {
  BusApiService,
  Departures,
  Member,
  BusStop,
  BusStops
} from "./bus-api.service";

export interface Results {
  name: string;
  routes: [number, Departures[]][];
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "bus-timetable";
  busTimetable?: JSON;
  config?: Observable<Results>;
  busStops?: Observable<Member>;
  public testData2?: Member;
  public testStops?: BusStop[];
  public testData1?: BusStops;

  constructor(private busApiService: BusApiService) {}

  getConfig(code: String) {
    this.config = this.busApiService.getBusData(code).pipe(
      map(config => ({
        name: config.name,
        routes: Object.keys(config.departures).map(id => [
          Number(id),
          config.departures[id]
        ])
      }))
    );
  }

  getBusStops() {
    this.busStops = this.busApiService.getLocation();
    this.busStops.subscribe(l => {
      l.member;
    });
  }
}
