import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";

import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BusDataComponent } from "./bus-data/bus-data.component";
import { FakeBusApiService } from "./fake-bus-api.service";
import { RealBusApiService, BusApiService } from "./bus-api.service";

@NgModule({
  declarations: [AppComponent, BusDataComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [
    {
      provide: BusApiService,
      useClass:
        environment.busServiceType === "fake"
          ? FakeBusApiService
          : RealBusApiService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
