import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './logged-in.guard';

import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { EsempioComponent } from './components/esempio/esempio.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { VideoComponent } from './components/video/video.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'registrazione', component: RegistrationComponent},
  { path: 'esempio', component: EsempioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profilo', component: ProfileComponent, canActivate: [LoggedInGuard]},
  { path: 'video', component: VideoComponent, canActivate: [LoggedInGuard]},
  // { path: 'ricette', component: RecipesComponent, children: [
  //   { path: 'recipes', component: RecipesListComponent},
  //   { path: 'dettaglio/:title/:_id', component: DetailComponent},
  //   { path: 'nuova-ricetta', component: NuovaRicettaComponent, canActivate: [LoggedInGuard]},
  //   { path: 'result', component: ResultComponent},
  //   { path: '', pathMatch: 'full', component: RecipesListComponent}
  // ]},
  {
    path: 'ricette',
      loadChildren: () =>
        import("./components/recipes/recipes.module").then(modulo => modulo.RecipesModule)
  },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
