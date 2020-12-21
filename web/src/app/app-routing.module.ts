import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { MainComponent } from './modules/layout/main/main.component';
import { ListComponent } from './modules/process/list/list.component';
import { LogNotificationsComponent } from './modules/process/log-notifications/log-notifications.component';
import { ProcessComponent } from './modules/process/process.component';
import { GeneralComponent } from './modules/process/view/general/general.component';
import { LogsComponent } from './modules/process/view/logs/logs.component';
import { ViewComponent } from './modules/process/view/view.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { SystemComponent } from './modules/system/system.component';
import { UserComponent } from './modules/user/user.component';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'process', pathMatch: 'full' },
      {
        path: 'process',
        component: ProcessComponent,
        children: [
          {
            path: '',
            component: ListComponent,
          },
          {
            path: 'log-notifications',
            component: LogNotificationsComponent,
          },
          {
            path: ':id',
            component: ViewComponent,
            children: [
              { path: '', redirectTo: 'general', pathMatch: 'full' },
              {
                path: 'general',
                component: GeneralComponent,
              },
              {
                path: 'logs',
                component: LogsComponent,
              },
            ]
          }
        ]
      },
      { path: 'users', component: UserComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'system', component: SystemComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
