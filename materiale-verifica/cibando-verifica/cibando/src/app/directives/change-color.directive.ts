import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {
  @HostBinding('style.background-color') background: string;
  @HostBinding('style.color') color: string;
  @HostBinding('placeholder') place = '';

  coloriSfondo = ['red', 'orange', 'darkred', 'violet'];
  coloriTesto = ['white', 'black', 'grey'];


  @HostListener('keydown') cambiaColore() {
    const coloreSfondo = Math.floor(Math.random() * this.coloriSfondo.length);
    const coloreTesto = Math.floor(Math.random() * this.coloriTesto.length);

    this.background = this.coloriSfondo[coloreSfondo];
    this.color = this.coloriTesto[coloreTesto];
  }

  @HostListener('mouseover') mostraPlace() {
    this.place = 'sei sopra al campo'
  }
  @HostListener('mouseout') nascondiPlace() {
    this.place = ''
  }
  constructor() { }

}
