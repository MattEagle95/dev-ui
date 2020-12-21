import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as Feather from 'feather-icons';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api.service';
import { NotifyService } from 'src/app/shared/notify.service';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-create-simple',
  templateUrl: './create-simple.component.html',
  styleUrls: ['./create-simple.component.css'],
  providers: [ApiService, SocketService, DecimalPipe]
})
export class CreateSimpleComponent implements AfterViewInit {

  ngAfterViewInit() {
    Feather.replace();
  }

  form = this.fb.group({
    script: ['', Validators.required],
    name: [''],
  });

  constructor(private fb: FormBuilder, private apiService: ApiService, public activeModal: NgbActiveModal, private socketService: SocketService, private toastr: ToastrService, private notifyService: NotifyService) { }

  onSubmit() {
    console.log('submit')
    this.socketService.create(this.form.get('script').value)
    this.notifyService.addProcessNotifier(this.form.get('name').value)
  }

}
