import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAgoPipe } from '../date-ago.pipe';



@NgModule({
  declarations: [DateAgoPipe],
  exports: [DateAgoPipe],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
