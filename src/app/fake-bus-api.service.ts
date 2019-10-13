import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Config, BusApiService, Departures } from "./bus-api.service";

@Injectable()
export class FakeBusApiService extends BusApiService {
  constructor() {
    super();
  }

  getBusData(): Observable<Config> {
    const testRoutes: Departures[] = [
      {
        mode: "bus",
        line: "1--2",
        line_name: "1",
        aimed_departure_time: "23:41",
        expected_departure_time: "23:42",
        best_departure_estimate: "23:42",
        bus_number: "1",
        delay: "1 minute"
      },
      {
        mode: "bus",
        line: "1--2",
        line_name: "1",
        aimed_departure_time: "23:50",
        expected_departure_time: "23:56",
        best_departure_estimate: "23:56",
        bus_number: "1",
        delay: "6 minutes"
      }
    ];
    const testConfig: Config = {
      name: "test",
      departures: { "1": testRoutes }
    };

    return of(testConfig);
  }
}
