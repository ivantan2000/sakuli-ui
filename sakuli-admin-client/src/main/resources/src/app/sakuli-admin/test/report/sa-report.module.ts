import {NgModule} from '@angular/core';

import {SaReportComponent} from './sa-report.component';
import {SaActionComponent} from "./sa-action.component";
import {SaReportContentComponent} from "./sa-report-content.component";
import {SaReportNavigationComponent} from "./sa-report-navigation.component";
import {SaReportStepsTimingComponent} from "./sa-report-steps-timing.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SweetestComponentsModule} from "../../../sweetest-components/index";
import {CommonModule} from "@angular/common";
import {SaReportStepsComponent} from "./sa-report-steps.component";

@NgModule({
  imports: [
    CommonModule,
    SweetestComponentsModule,
    NgbModule,
  ],
  exports: [],
  declarations: [
    SaReportComponent,
    SaActionComponent,
    SaReportContentComponent,
    SaReportNavigationComponent,
    SaReportStepsTimingComponent,
    SaReportStepsComponent
  ],
  providers: [],
})
export class SaReportModule {
}