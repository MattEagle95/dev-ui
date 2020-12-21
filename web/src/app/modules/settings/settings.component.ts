import * as Feather from 'feather-icons';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {

  ngAfterViewInit() {
    Feather.replace();
  }

  form = this.fb.group({
    name: ['', Validators.required],
    script: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private userService: UserService) { }

}
