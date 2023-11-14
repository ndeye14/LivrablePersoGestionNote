import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbord-admin',
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.css']
})
export class DashbordAdminComponent {

  // Déclaration des variables 
  nom: string = "";
  prenom: string  = "";
  email: string = "";
  password: string = "passer123&";
  telephone: string = "";
  adresse: string = "";
  role: string= "";

  // Déclaration des méthodes 
  creerCompte(){
    console.log(this.nom);
    console.log(this.prenom);
    console.log(this.email);
    console.log(this.password);
    console.log(this.telephone);
    console.log(this.adresse);
    console.log(this.role);
  }
}
