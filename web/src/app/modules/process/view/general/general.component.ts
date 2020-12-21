import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: [ApiService, SocketService, DecimalPipe]
})
export class GeneralComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    script: ['', Validators.required],
    args: [''],
    interpreterArgs: [''],
    cwd: [''],
    output: [''],
    error: [''],
    logDateFormat: [''],
    pid: [''],
    minUptime: [''],
    maxRestarts: [''],
    maxMemoryRestart: [''],
    killTimeout: [''],
    restartDelay: [''],
    interpreter: [''],
    execMode: [''],
    instances: [''],
    mergeLogs: [''],
    watch: [''],
    force: [''],
    autorestart: [''],
  });

  constructor(private fb: FormBuilder, private apiService: ApiService, private socketService: SocketService) { }

  onSubmit() {
    console.log('submit')
    this.socketService.create(this.form.get('script').value)
  }

}
