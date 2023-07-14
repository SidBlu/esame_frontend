import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, Observable, of} from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-esempio',
  templateUrl: './esempio.component.html',
  styleUrls: ['./esempio.component.scss']
})
export class EsempioComponent implements OnInit {
  nomi1 = [{ name: 'Alessio' }, { name: 'Danilo' }, { name: 'Marta' }];
  nomi2 = [{ name: 'Carlo' }, { name: 'Flavia' }];

  public primoGruppo$: Observable<any[]> | any;
  private secondoGruppo$: Observable<any[]> | any;
  private terzoGruppo$: Observable<string[]>;

  gruppiCombi$: Observable<any>;
  gruppi: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.primoGruppo$ = of(this.nomi1).pipe(
      delay(3000),
      tap((valore) => console.log('primo gruppo ', valore))
    );

    this.secondoGruppo$ = of(this.nomi2).pipe(
      delay(1000),
      tap((valore) => console.log('secondo gruppo ', valore))
    );

    this.terzoGruppo$ = of(['Marco', 'Katia']).pipe(
      delay(0),
      tap((valore) => console.log('terzo gruppo ' + valore))
    );

    this.gruppiCombi$ = forkJoin(
      this.primoGruppo$, this.secondoGruppo$, this.terzoGruppo$
    ).pipe(
      map(([primaChiamata, secondaChiamata, terzaChiamata]) => {
        return [] .concat(primaChiamata).concat(secondaChiamata).concat(terzaChiamata)
      }),
      tap((val) => console.log('gruppiCombinati ' + JSON.stringify(val)))
    )


    forkJoin(this.primoGruppo$, this.secondoGruppo$, this.terzoGruppo$)
    .subscribe(res => this.gruppi = res);

    this.gruppiCombi$ = forkJoin(this.primoGruppo$, this.secondoGruppo$, this.terzoGruppo$).pipe(
      map((res) => {
        this.gruppi = res
        console.log(res)})
    );

  }

}


