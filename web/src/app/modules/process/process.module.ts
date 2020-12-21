import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CreateComponent } from './create/create.component';
import { ProcessComponent } from './process.component';
import { DeployComponent } from './deploy/deploy.component';
import { ChartModule } from '../charts/number-chart/chart.module';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { ViewComponent } from './view/view.component';
import { AdvancedComponent } from './view/advanced/advanced.component';
import { GeneralComponent } from './view/general/general.component';
import { DateAgoPipe } from 'src/app/shared/date-ago.pipe';
import { PipeModule } from 'src/app/shared/pipe/pipe.module';
import { LogsComponent } from './view/logs/logs.component';
import { CreateSimpleComponent } from './create-simple/create-simple.component';
import { LogNotificationsComponent } from './log-notifications/log-notifications.component';

@NgModule({
  declarations: [
    ProcessComponent,
    CreateComponent,
    ListComponent,
    DeployComponent,
    ViewComponent,
    AdvancedComponent,
    GeneralComponent,
    LogsComponent,
    CreateSimpleComponent,
    LogNotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartModule,
    FeatherModule.pick(allIcons),
    PipeModule
  ],
  exports: [
    ProcessComponent,
    CreateComponent,
    ListComponent
  ],
  providers: [],
  entryComponents: [CreateSimpleComponent, CreateComponent]
})
export class ProcessModule { }
