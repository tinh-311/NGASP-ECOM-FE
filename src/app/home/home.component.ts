import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getPost()
    .subscribe((data: any) => {
      this.data = data;
      console.log('🌷🌷🌷 ~ this.data: ', this.data)
    });
  }
}
