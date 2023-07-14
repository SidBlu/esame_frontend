import { NgModule } from '@angular/core';

// aggiungo lui
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DropdownModule} from 'primeng/dropdown';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule} from 'primeng/paginator';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeRoutingModule } from './recipes-routing.module';

import { NuovaRicettaComponent } from './nuova-ricetta/nuova-ricetta.component';
import { DetailComponent } from './detail/detail.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ResultComponent } from './result/result.component';
import { RecipeCardComponent } from 'src/app/shared/recipe-card/recipe-card.component';



@NgModule({
  declarations: [
    DetailComponent,
    RecipesListComponent,
    NuovaRicettaComponent,
    ResultComponent,
    RecipeCardComponent
  ],
  imports: [
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    NgbCollapseModule,
    HttpClientModule,
    PaginatorModule,
    ToastModule,
    CKEditorModule,
    RecipeRoutingModule,
    CommonModule
  ],
  exports: [RecipeCardComponent, NuovaRicettaComponent]
})

export class RecipesModule { }
