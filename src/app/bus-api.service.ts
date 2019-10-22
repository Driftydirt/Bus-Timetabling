import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map, concatMap } from "rxjs/operators";
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
  delay: DelayInfo;
  ETA: string;
}

export interface DelayInfo {
  text: string;
  milliseconds: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface BusStops {
  member: BusStop[];
}

export interface Member {
  member: BusStop[];
}

export interface BusStop {
  accuracy: number;
  atcocode: String;
  description: String;
  distance: number;
  latitude: number;
  longitude: number;
  name: String;
  type: String;
}

export abstract class BusApiService {
  abstract getBusData(code: String): Observable<Config>;
  abstract getBusStops(location: Location): Observable<Member>;
  abstract getLocation(): Observable<Member>;
}

@Injectable()
export class RealBusApiService extends BusApiService {
  constructor(private http: HttpClient) {
    super();
  }

  getBusData(code: String): Observable<Config> {
    let URL = "https://transportapi.com/v3/uk/bus/stop/" + code + "/live.json";
    let myParams = new HttpParams()
      .set("app_id", "92ccbc9b")
      .set("app_key", "08155b6c5dcad61ad8000612ba8f0a29")
      .set("group", "route")
      .set("nextbuses", "yes");
    return this.http.get(URL, { params: myParams }).pipe(
      map(
        (json: any): Config => ({
          // tslint:disable: no-string-literal
          name: json["name"],
          departures: mapValues(json["departures"], departures =>
            departures.map(
              (d: any): Departures => ({
                ...d,
                delay: this.getDelay(d),
                ETA: this.getETA(d)
              })
            )
          )
        })
      )
    );
  }

  getLocation(): Observable<Member> {
    let location = new Promise<Location>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        err => {
          reject(err);
        }
      );
    });

    return from(location).pipe(concatMap(l => this.getBusStops(l)));
  }

  getBusStops(location: Location): Observable<Member> {
    let url = "https://transportapi.com/v3/uk/places.json";
    let myParams = new HttpParams()
      .set("app_id", "92ccbc9b")
      .set("app_key", "08155b6c5dcad61ad8000612ba8f0a29")
      .set("lat", location.lat.toString())
      .set("lon", location.lng.toString())
      .set("type", "bus_stop");

    return this.http.get(url, { params: myParams }).pipe(
      map(
        (json: any): Member => ({
          // tslint:disable: no-string-literal
          member: json["member"]
        })
      )
    );
  }

  getDelay(route: Departures): DelayInfo {
    const aimTime = this.timeStringToMoment(route.aimed_departure_time);
    const bestTime = this.timeStringToMoment(route.best_departure_estimate);

    if (aimTime.isSame(bestTime)) {
      return { text: "on time", milliseconds: 0 };
    }

    return {
      text: bestTime.from(aimTime, true),
      milliseconds: bestTime.diff(aimTime)
    };
  }

  private timeStringToMoment(timeStr: string) {
    const parts = timeStr.split(":").map(Number);
    return moment()
      .hour(parts[0])
      .minute(parts[1])
      .second(0)
      .millisecond(0);
  }
  getETA(route: Departures): string {
    const bestTime = this.timeStringToMoment(route.best_departure_estimate);

    return bestTime.from(Date.now(), true);
  }
}
