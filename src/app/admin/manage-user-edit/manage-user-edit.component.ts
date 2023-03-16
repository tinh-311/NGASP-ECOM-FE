import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-manage-user-edit',
  templateUrl: './manage-user-edit.component.html',
  styleUrls: ['./manage-user-edit.component.scss']
})
export class ManageUserEditComponent implements OnInit {

  id: number =0;

  userFormEdit: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    mobile: new FormControl(),
    password: new FormControl(),
    role: new FormControl()
  });

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];

    this.getUserByID(this.id);
  }



  getUserByID(id: any) {
    this.userService.userByID(this.id).subscribe(data => {
      this.userFormEdit = new FormGroup({
        firstName: new FormControl(data.firstName),
        lastName: new FormControl(data.lastName),
        email: new FormControl(data.email),
        address: new FormControl(data.address),
        mobile: new FormControl(data.mobile),
        password: new FormControl(data.password),
        role: new FormControl(data.role),
      })
      // console.log("🚀 ~ file 44:", data)
    })
  }

  constructor(
    private userService: UserService,
    private router: ActivatedRoute
    ) {}

  onEdit() {
    const user: any = this.userFormEdit.value;
    user.id= this.id;
    // console.log("🚀 ~ file 54:", this.userFormEdit.value)
    this.userService.editUser(this.userFormEdit.value).subscribe();
  }
}
