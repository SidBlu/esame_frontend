import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  evidenziato = false;
  nome: string | null | undefined;
  email: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.riceviDatiUtente()
    console.log('nome: ' + this.nome);
  }

  riceviDatiUtente(){
    // recupero i dati dal Subject e li immagazzino nelle localStorage
    this.userService.datiUtente.subscribe((res: any) => {
      // localStorage.setItem('nome', res.nome);
      // localStorage.setItem('email', res.email)
      this.nome = res.nome;
      this.email = res.email;
    });

    // if(localStorage.getItem('nome')){
    //   this.nome = localStorage.getItem('nome');
    //   this.email = localStorage.getItem('email')
    // }
  }

  closeModal(){
    // localStorage.removeItem('nome');
    // localStorage.removeItem('email');
    // localStorage.clear();
    this.nome = '';
    this.email = '';
  }

  onEvidenziazione(){
    this.evidenziato = !this.evidenziato;
  }

  ngOnDestroy(): void {
    console.log('sei uscito dalla home');
  }
}
