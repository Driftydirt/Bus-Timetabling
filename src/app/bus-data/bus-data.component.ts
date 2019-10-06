import { Component, OnInit, Input } from "@angular/core";

import { Config } from "../bus-api.service";

@Component({
  selector: "app-bus-data",
  templateUrl: "./bus-data.component.html",
  styleUrls: ["./bus-data.component.css"]
})
export class BusDataComponent implements OnInit {
  @Input() config?: Config;
  constructor() {}

  ngOnInit() {}
}
