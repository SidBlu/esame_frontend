import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  dataRegistrazione: any;
  dataAggiornamento: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('user')) != null){
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.userService.getUser(this.user.email).subscribe({
      next: (res) => {
        this.user = res;

        this.dataRegistrazione = moment(this.user.createdAt).locale('it').format('dddd DD MMMM YYYY');
        this.dataAggiornamento = moment(this.user.updatedAt).locale('it').format('dddd DD MMMM YYYY');


      },
      error: (err) => console.log(err)
    })
  }



}
