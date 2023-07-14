import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{
  images = [
    {id: 1,
    label: 'Spaghetti al sugo'},
    {id: 2,
    label: 'Tagliata di manzo'},
    {id: 3,
    label: 'Tiramisù classico'}
  ];

  percorso = '../assets/images/carousel-';

  constructor() {

  }

  ngOnInit(): void {
  }
}
