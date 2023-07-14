import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  ricetta: Recipe;
  percorsoDifficolta = "../../../../assets/images/difficolta-";

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.onGetRecipe2();
  }

  onGetRecipe(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('_id');

    this.recipeService.getRecipe(id).subscribe({
      next: (res) => {
        this.ricetta = res;
        console.log(this.ricetta)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onGetRecipe2(): void {
    this.activatedRoute.params.subscribe((urlParams) => {
      const id = urlParams['_id'];

      //const idN = Number(id);
      if (id) {
        this.recipeService.getRecipe(id).subscribe(res => this.ricetta = res)
      }
    })
  }

}
