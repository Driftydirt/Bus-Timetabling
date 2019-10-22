import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
  Config,
  BusApiService,
  Departures,
  Member,
  BusStop
} from "./bus-api.service";

@Injectable()
export class FakeBusApiService extends BusApiService {
  constructor() {
    super();
  }

  getBusStops(): Observable<Member> {
    const testStops: BusStop[] = [
      {
        accuracy: 20,
        atcocode: "69696",
        description: "String",
        distance: 20,
        latitude: 20,
        longitude: 20,
        name: "String",
        type: "String"
      },
      {
        accuracy: 20,
        atcocode: "6996",
        description: "String",
        distance: 20,
        latitude: 20,
        longitude: 20,
        name: "String2",
        type: "String"
      }
    ];
    const testMember: Member = {
      member: testStops
    };
    console.log(testMember);
    return of(testMember);
  }

  getLocation(): Observable<Member> {
    return this.getBusStops();
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
        delay: { text: "1 minute", milliseconds: 60000 },
        ETA: "6 minutes"
      },
      {
        mode: "bus",
        line: "1--2",
        line_name: "1",
        aimed_departure_time: "23:50",
        expected_departure_time: "23:56",
        best_departure_estimate: "23:56",
        bus_number: "1",
        delay: { text: "6 minutes", milliseconds: 360000 },
        ETA: "9 minutes"
      },
      {
        mode: "bus",
        line: "1--2",
        line_name: "1",
        aimed_departure_time: "23:41",
        expected_departure_time: "23:42",
        best_departure_estimate: "23:42",
        bus_number: "1",
        delay: { text: "16 minutes", milliseconds: 960000 },
        ETA: "6 minutes"
      }
    ];
    const testConfig: Config = {
      name: "test",
      departures: { "1": testRoutes }
    };

    return of(testConfig);
  }
}
