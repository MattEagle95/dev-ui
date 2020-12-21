import * as Feather from 'feather-icons';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { DecimalPipe } from '@angular/common';
import { TabbarService } from 'src/app/shared/tabbar.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationType, DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
  providers: [UserService, DecimalPipe]
})
export class SystemComponent implements AfterViewInit {

  systeminfo: any

  ngAfterViewInit() {
    Feather.replace();
  }

  constructor(private userService: UserService, private tabbarService: TabbarService, private modalService: NgbModal) {
    this.userService.getSystemInfo().subscribe((systeminfo) => {
      this.systeminfo = systeminfo
    })
  }

  addTab() {
    this.tabbarService.addTab({ name: 'System', route: 'system' })
  }

  resetDatabase() {
    const modalRef = this.modalService.open(DeleteConfirmationModalComponent, { centered: true })
    modalRef.componentInstance.type = ConfirmationType.DANGER;
    modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`)
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`)
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
