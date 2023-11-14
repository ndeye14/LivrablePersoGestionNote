import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordAdminComponent } from './admin/dashbord-admin/dashbord-admin.component';
import { AccueilProfComponent } from './prof/accueil-prof/accueil-prof.component';
import { ListeNotesComponent } from './apprenant/liste-notes/liste-notes.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  // On définit la route par défaut 
  {path: '', redirectTo: 'auth', pathMatch: 'full'},

  // La page qui s'affiche par défaut
  {path: 'auth', component: AuthComponent},

  // On définit les routes pour l'administrateur
  {path: 'admin', component: DashbordAdminComponent},

  // Route pour interface professeur
  {path: 'prof', component:AccueilProfComponent},

  // Route pour interface apprenant 
  {path: 'apprenant', component: ListeNotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
