import { Component, OnInit, Input, isDevMode } from "@angular/core";

import { Results } from "../app.component";
import { Departures } from "../bus-api.service";

@Component({
  selector: "app-bus-data",
  templateUrl: "./bus-data.component.html",
  styleUrls: ["./bus-data.component.css"]
})
export class BusDataComponent implements OnInit {
  testRoutes?: Departures[];
  testData?: Results;

  @Input() config?: Results;
  constructor() {
    this.testRoutes = [
      {
        mode: "bus",
        line: "1--2",
        line_name: "1",
        aimed_departure_time: "23:41",
        expected_departure_time: "23:42",
        best_departure_estimate: "23:42",
        bus_number: "1",
        delay: ""
      },
      {
        mode: "bus",
        line: "1--2",
        line_name: "1",
        aimed_departure_time: "23:50",
        expected_departure_time: "23:56",
        best_departure_estimate: "23:56",
        bus_number: "1",
        delay: ""
      }
    ];
    this.testData = {
      name: "test",
      routes: [[1, this.testRoutes]]
    };
  }

  ngOnInit() {
    if (this.testRoutes) {
      this.testRoutes.map(x => {
        x.delay = this.getDelay(x);
      });
    }
    if (this.config) {
      this.config.routes.map(x => {
        x[1].map(x => {
          x.delay = this.getDelay(x);
        });
      });
    }
  }

  getDelay(route: Departures): string {
    let delay =
      Number(route.best_departure_estimate.replace(":", "")) -
      Number(route.aimed_departure_time.replace(":", ""));
    let hours = Math.floor(delay / 60);
    let minutes = delay % 60;
    if (minutes === 0) {
      return String(hours) + ":" + "00";
    } else if (minutes.toString().length < 2) {
      return String(hours) + ":0" + String(minutes);
    } else {
      return String(hours) + ":" + String(minutes);
    }
  }
}
