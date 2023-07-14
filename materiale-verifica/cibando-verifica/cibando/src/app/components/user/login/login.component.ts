
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // providers: [MessageService]
})
export class LoginComponent implements OnInit {
  @Output() chiudi = new EventEmitter;
  @Input() esegui: boolean;

  loginError: string = '';
  user: any;

  constructor(
    private authService: AuthService,
     private router: Router,
     private messageService: MessageService,
     private userService: UserService
     ) { }

  ngOnInit(): void {
      if(this.esegui){
        console.log('adesso è true')
      }else {
        console.log('adesso è false')
      }
  }

  onSubmit(credenziali: any){
    if(credenziali.email !== '' && credenziali.password !== ''){
      this.authService.login(credenziali.email, credenziali.password).subscribe({
        next: (res) => {
          this.user = res;
          if(res) {
            this.authService.saveStorage(res);
            this.userService.ruoloUtente.next(res.role);
            this.messageService.add({severity:'success', summary:'Successo', detail:'Login effettuato con successo', life: 3000});
            this.chiudi.emit(true);

            // setTimeout(() => {
            //   this.router.navigate(['home']);
            // }, 3000)

          } else {
            this.loginError = "email o password errati";
            this.messageService.add({severity:'error', summary:'Errore', detail:'Email o password errati'});
          }
        },
        error: (err) => {
          console.log(err);
          this.loginError = "Errore nel server: " + err;
          this.messageService.add({severity:'error', summary:'Errore', detail: "Email o password errati "});
        }
      })
    }
  }

}
