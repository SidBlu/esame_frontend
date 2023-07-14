import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() pag: string;
  @Output() messaggio = new EventEmitter();
  @ViewChild('deletemodale') deleteModal: TemplateRef<any>;

  percorsoDifficolta = "../../../../assets/images/difficolta-";
  cliccato = false;
  ricette: Recipe[] = [];
  page = 1;
  ruolo: any;
  ricettePerPagina = 4;
  editRicetta: any;
  nuovaRicetta: any;
  deleteRecipeId: number;
  ricettaDaEliminare: Recipe;
  editMode = false;
  disabledRecipes: number[] = [];

  //rowsPerPageOptions: number;
  //pagingNumber = 0;
  //first: number = 0;

  ricette$: Observable<Recipe[]>;
  totRicette: Recipe[] = [];
  totale: number;
  isCardDisabled = false;

  recupera_ruolo = this.userService.ruoloUtente.subscribe(res => this.ruolo = res);

  editor = ClassicEditor;

  editorConfig = {
    toolbar: {
        items: [
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'codeBlock',
            'undo',
            'redo',
        ]
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    height: 300,
};

  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    difficulty: new FormControl(0),
    published: new FormControl(false)
  });

  constructor(private recipeService: RecipeService, private userService: UserService, private modalService: NgbModal, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    // if(this.pag == 'home') {
    //   this.ricette$ = this.recipeService.getRecipes().pipe(
    //      map(res => res.filter(ricetteFiltrate => ricetteFiltrate.difficulty < 6 )),
    //      map(res => res.slice(0,4 )),
    //      map(res => this.totRicette = res)
    //   )
    // } else {
    //   this.ricette$ = this.recipeService.getRecipes().pipe(
    //     map(res => res.filter(ricetteFiltrate => ricetteFiltrate.difficulty < 6 )),
    //     map(res => this.totRicette = res )
    //   )
    // }


    this.recipeService.getRecipes().subscribe({
      next: (res) => {
        this.ricette = res;
        if(this.pag == 'home'){
          this.ricette = this.ricette.sort((a,b) => b._id - a._id).reverse().slice(0,4);
          this.totRicette = this.ricette;
        } else {
          this.ricette = this.ricette.sort((a,b) => b._id - a._id).reverse();
          this.totRicette = this.ricette;
        }

      },
      error: (e) => {
        console.error(e)
      }
    })

    //this.pagine();
  }

  inviaTitolo(titolo: string){
    if(!this.cliccato){
      this.messaggio.emit(titolo);
      this.cliccato = true;
    } else {
      this.messaggio.emit('');
      this.cliccato = false;
    }
    // oppure con ternario
   // this.cliccato ? (this.messaggio.emit(''), this.cliccato = false) : (this.messaggio.emit(titolo), this.cliccato = true);
  }

    // pagine(){
    //   let tot;
    //   if(this.ricette){
    //     tot = this.ricette.length
    //   }

    //   this.page = 1;
    //   this.pagingNumber = 0;
    //   this.pagingNumber = Math.ceil(this.ricette.length / this.ricettePerPagina / 4);
    // }

  paginate(event) {
    event.page =event.page + 1;
    this.page = event.page;
  }

  deleteRecipe(): void {
    const id = this.deleteRecipeId;
    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        this.ricette = this.ricette.filter(recipe => recipe._id !== id);
        this.totRicette = this.totRicette.filter(recipe => recipe._id !== id);
        this.messageService.add({severity:'success', summary:'Successo', detail:'Eliminato con successo', life: 3000});
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  isRecipeDisabled(ricetta: Recipe): boolean {
    return this.disabledRecipes.includes(ricetta._id);
  }

  toggleCardVisibility(ricetta: Recipe) {
    const ricettaId = ricetta._id;

    this.messageService.add({severity:'success', summary:'Successo', detail:'Visibilità modificata con successo', life: 3000});

    const index = this.ricette.findIndex(recipe => recipe._id === ricettaId);
    if (index !== -1) {
      const existingDisabledIndex = this.disabledRecipes.findIndex(id => id === ricettaId);
      if (existingDisabledIndex !== -1) {
        this.disabledRecipes.splice(existingDisabledIndex, 1);
      } else {
        this.disabledRecipes.push(ricettaId);
      }
    }
  }

  updateRecipe(id: number, form: FormGroup): void {
    const updatedRecipe = form.value;

    this.recipeService.updateRecipe(id, updatedRecipe).subscribe({
      next: (res) => {
        this.ricette = this.ricette.map((recipe) =>
          recipe._id === id ? res : recipe
        );
        this.modalService.dismissAll();
        this.editMode = false;
        this.messageService.add({severity:'success', summary:'Successo', detail:'Modificato con successo', life: 3000});
      },
      error: (err) => console.log(err)
    });
  }

  openUpdate(content: any, form: any, ricetta: Recipe){
    this.editMode = true;
    this.nuovaRicetta = form;
    this.editRicetta = ricetta;

    this.form.patchValue({
      title: ricetta.title,
      description: ricetta.description,
      image: ricetta.image,
      difficulty: ricetta.difficulty,
      published: ricetta.published
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true, scrollable: true} ).result.then((res) => {
      this.router.navigate(['/ricette/recipes'])

    }).catch((res) => {
      console.log('nessuna azione da eseguire')
    })
  }

  openDelete(id: number) {
    this.deleteRecipeId = id;
    this.ricettaDaEliminare = this.ricette.find(recipe => recipe._id === id);
    this.modalService.open(this.deleteModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true, scrollable: true }).result
    .then((res) => {
      if (res === 'delete') {
        this.deleteRecipe();
      }
      this.router.navigate(['/ricette/recipes']);
    }).catch((res) => {
        console.log('No action to be taken');
      });
  }
}
