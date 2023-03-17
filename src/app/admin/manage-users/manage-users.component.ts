import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/User.model';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { ManageUserAddComponent } from '../manage-user-add/manage-user-add.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {

  dataUser: User[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ){}

  getUsers() {
    this.userService.getAll()
    .subscribe((data: User[]) => {
      this.dataUser = data;
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(ManageUserAddComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  updateUser() {

  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(res => {
    }, (err) => {
      this.getUsers();
      switch(err?.error?.text) {
        case 'deleted': {
          this.toastService.show('Delete successfully', 'err');
          break;
        }
      }
      }
    )
  }
}



