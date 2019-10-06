import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { BusApiService, Config, Departures } from "./bus-api.service";

interface Results {
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

  constructor(private busApiService: BusApiService) {}

  showConfig() {
    this.config = this.busApiService.getBusData().pipe(
      map(config => ({
        name: config.name,
        routes: Object.keys(config.departures).map(id => [
          Number(id),
          config.departures[id]
        ])
      }))
    );
  }
}
