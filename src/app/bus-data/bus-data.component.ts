import { Component, Input } from "@angular/core";

import { Results } from "../app.component";

const REFRESH_DELAY_MS = 5_000;

@Component({
  selector: "app-bus-data",
  templateUrl: "./bus-data.component.html",
  styleUrls: ["./bus-data.component.css"]
})
export class BusDataComponent {
  now?: number;

  @Input() config?: Results;
  constructor() {
    setInterval(() => {
      this.now = Date.now();
    }, REFRESH_DELAY_MS);
  }
}
