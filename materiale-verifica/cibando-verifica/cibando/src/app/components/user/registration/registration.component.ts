import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../customValidator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.pattern(this.regex), Validators.required]),
    ripetiPassword: new FormControl('', [Validators.required]),
    accetto: new FormControl('', [Validators.requiredTrue])
   },
    [CustomValidators.confrontaPassword('password','ripetiPassword')]
  )

  // get convalidaPassword() {
  //   return (this.form.getError('diversa') && this.form.get('ripetiPassword').touched )
  // }

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {

  }

  // per il T DRIVEN
  // onSubmit(form){
  //   console.log(form);
  // }

  onSubmit(){
    //console.log(this.form.value);
    const utente = {nome: this.form.value.name, email: this.form.value.email};
    this.userService.datiUtente.next(utente);
    this.userService.nuovoUtente(this.form.value).subscribe({
      next: (res) =>{
        console.log(res)},
      error: (err) => console.log(err)
    })
    this.router.navigate(['home']);
  }
}
