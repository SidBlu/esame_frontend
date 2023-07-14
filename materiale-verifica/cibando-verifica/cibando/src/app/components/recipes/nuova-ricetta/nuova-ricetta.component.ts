import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-nuova-ricetta',
  templateUrl: './nuova-ricetta.component.html',
  styleUrls: ['./nuova-ricetta.component.scss']
})
export class NuovaRicettaComponent implements OnInit {

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
  })

  nuovaRicetta: any;
  percorsoDifficolta = "../../../../assets/images/difficolta-";

  constructor(private recipeService: RecipeService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    // this.form.patchValue({
    //   title: 'scrivi il nome della ricetta',
    //   image: " qui metti l'URL"
    // })
  }

  onSubmit(){
    console.log(this.form.value);
    this.recipeService.insertRecipe(this.form.getRawValue()).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => console.log(err)
    })
  }



  open(content: any, form: any){
    this.nuovaRicetta = form;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true, scrollable: true} ).result.then((res) => {
      this.router.navigate(['/ricette/recipes'])

    }).catch((res) => {
      console.log('nessuna azione da eseguire')
    })
  }

}
