import * as Feather from 'feather-icons';
import { AfterViewInit, Component, Type } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Add user</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  <form>
  <div class="form-group row">
    <label for="staticEmail" class="col-sm-6 col-form-label">Name</label>
    <div class="col-sm-6">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Password</label>
    <div class="col-sm-6">
      <input type="password" class="form-control" id="inputPassword">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-6 col-form-label">Repeat password</label>
    <div class="col-sm-6">
      <input type="password" class="form-control" id="inputPassword">
    </div>
  </div>
</form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-primary" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdModalConfirm,
  autofocus: NgbdModalConfirmAutofocus
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;
  loaded = false

  open(name: string) {
    this._modalService.open(MODALS[name]);
  }

  title = 'piwatch-ui';

  ngAfterViewInit() {
    this.loaded = true
    Feather.replace();
  }

  constructor(private authService: AuthService, private _modalService: NgbModal) {

  }

  check() {
    return this.authService.isAuthorized()
  }
}
