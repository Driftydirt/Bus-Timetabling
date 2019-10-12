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
        bus_number: "1"
      },
      {
        mode: "bus",
        line: "1--2",
        line_name: "1",
        aimed_departure_time: "23:50",
        expected_departure_time: "23:56",
        best_departure_estimate: "23:56",
        bus_number: "1"
      }
    ];
    this.testData = {
      name: "test",
      routes: [[1, this.testRoutes]]
    };
  }

  ngOnInit() {}
}
