import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Member } from "../bus-api.service";

@Component({
  selector: "app-bus-stops",
  templateUrl: "./bus-stops.component.html",
  styleUrls: ["./bus-stops.component.css"]
})
export class BusStopsComponent implements OnInit {
  @Input() busStops?: Member;
  @Output() selectedBusStop = new EventEmitter<String>();
  selected?: String;

  constructor() {}

  ngOnInit() {}

  selectBusStop(code: String) {
    this.selected = code;
    this.selectedBusStop.emit(code);
  }
}
