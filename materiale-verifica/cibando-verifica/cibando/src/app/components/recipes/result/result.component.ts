import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  testo: string;

  ricette: Recipe[];
  page = 1;
  ricettePerPag = 4;
  pagingNumber = 0;

  user: any;
  titleRicetta: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.onGetRecipe();
  }

  onGetRecipe(): void {
    this.recipeService.cerca.subscribe(
      (res: any) => {
         this.testo = res
         this.recipeService.searchRecipes(this.testo).subscribe({
          next: (res) => {
              this.ricette = res;
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
  )


  }
}
