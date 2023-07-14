import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RECIPES } from '../mocks/recipes.mock';
import {Observable, of, ReplaySubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ripple } from 'primeng/ripple';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  apiBaseUrl = "api/recipes"
  cerca = new ReplaySubject();

  id: number;

  constructor(private http: HttpClient) { }

  // // prendo tutte le ricette
  // getRecipes(): Observable<Recipe[]> {
  //   // return of (RECIPES);
  // return this.http.get<Recipe[]>(`${this.apiBaseUrl}/`)
  // }


    // prendo tutte le ricette tramite pipe Async
    getRecipes(){
      return this.http.get<Recipe[]>(`${this.apiBaseUrl}/`)
    }

  // getRecipe(id:number): Observable<Recipe>{
  //   const recipe = RECIPES.find(recipe => recipe._id == id);
  //   return of (recipe)
  // }

  getRecipe(id: string): Observable<Recipe>{
    return this.http.get<Recipe>(`${this.apiBaseUrl}/${id}`)
  }

  insertRecipe(ricetta: Recipe): Observable<Recipe>{
    return this.http.post<Recipe>(`${this.apiBaseUrl}/creaRicetta`, ricetta)
  }

  searchRecipes(text: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiBaseUrl}/cerca/${text}`)
  }

  deleteRecipe(id: number): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.apiBaseUrl}/${id}`);
  }

  updateRecipe(id: number, updateRecipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiBaseUrl}/${id}`, updateRecipe);
  }
}
