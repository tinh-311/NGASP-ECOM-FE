import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User.model';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

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
    private toastService: ToastService
  ){}

  getUsers() {
    this.userService.getAll()
    .subscribe((data: User[]) => {
      this.dataUser = data;
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



