import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';
import { SocketService } from 'src/app/shared/socket.service';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ApiService, SocketService, DecimalPipe]
})
export class CreateComponent implements AfterViewInit {

  ngAfterViewInit() {
    Feather.replace();
  }

  form = this.fb.group({
    name: ['', Validators.required],
    script: ['', Validators.required],
    cwd: [''],
    args: [''],
    interpreter: [''],
    interpreter_args: [''],

    instances: [''],
    exec_mode: ['fork'],
    watch: [false],
    ignore_watch: [''],
    max_memory_restart: [''],
    env: [''],
    source_map_support: [true],
    instance_var: [''],
    filter_env: [''],

    log_date_format: [''],
    error_file: [''],
    out_file: [''],
    combine_logs: [''],
    merge_logs: [''],
    pid_file: [''],

    min_uptime: [''],
    listen_timeout: [''],
    kill_timeout: [''],
    shutdown_with_message: [''],
    wait_ready: [''],
    max_restarts: [''],
    restart_delay: [''],
    autorestart: [''],
    cron_restart: [''],
    vizion: [''],
    force: ['']
  });

  constructor(private fb: FormBuilder, private apiService: ApiService, public activeModal: NgbActiveModal, private socketService: SocketService) { }

  onSubmit() {
    console.log('submit')
    this.socketService.create(this.form.get('script').value)
  }

}
