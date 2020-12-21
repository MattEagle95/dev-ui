import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as Feather from 'feather-icons';

export enum ConfirmationType {
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger'
}

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent implements OnInit, AfterViewInit {

  @Input() type: ConfirmationType;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    Feather.replace();
  }

}
