import { Component, HostListener, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})
export class DeployComponent {

  @Input() progress;
  
  private file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }

  // form = this.fb.group({
  //   file: [null, Validators.required, requiredFileType],
  // });

  constructor(private fb: FormBuilder, private apiService: ApiService, public activeModal: NgbActiveModal) { }

  // onSubmit() {
  //   this.apiService.start(thjis.form.get('name').value, this.form.get('script').value)
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

}
