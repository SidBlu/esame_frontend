import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  titoloRicevuto: string;

  constructor() { }

  ngOnInit(): void {
  }

  riceviTitolo(e: any){
    this.titoloRicevuto = e;
  }


}
