import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestion-notes',
  templateUrl: './gestion-notes.component.html',
  styleUrls: ['./gestion-notes.component.css']
})
export class GestionNotesComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }


  tabApprenant: any;
  tab: any;
  filterValue: any;
  anneeScolaireActu: any;
  adminConnect: any;
  tabProfesseurs: any;
  tabProfsFilter: any;
  tabApprenants: any;
  tabApprenantsFilter: any;
  tabMatieres: any;
  tabMatieresFilter: any;
  tabClasses: any;



   ngOnInit(): void {
    // Récupération de l'annescolaire courent
    this.anneeScolaireActu = JSON.parse(localStorage.getItem("anneeScolaireCourent") || "");

    // On récupère l'admin qui s'est connecté
    this.adminConnect = JSON.parse(localStorage.getItem("adminConnect") || "[]");

    console.log(this.adminConnect.email);

    // On récupère et stocke le tableau des professeurs
    this.tabProfesseurs = JSON.parse(localStorage.getItem("professeurs") || "[]");
    this.tabProfsFilter = this.tabProfesseurs;

    // On récupère et stocke le tableau des apprenants
    this.tabApprenants = JSON.parse(localStorage.getItem("apprenants") || "[]");

    this.tabApprenantsFilter = this.tabApprenants;

    // On récupère et stocke le tableau des matieres
    this.tabMatieres = JSON.parse(localStorage.getItem("matieres") || "[]");

    this.tabMatieresFilter = this.tabMatieres;

    // On récupère et stocke le tableau des classes
    this.tabClasses = JSON.parse(localStorage.getItem("classes") || "[]");

    // -----------------Fin stockage et récupérations des tableaux-----------------//

  }
  // C:\Users\User\Desktop\Fisrt\gestionNoteG5\src\app\prof\gestion-notes\gestion-notes.component.ts


  logout() {
    this.router.navigate(['/auth']);
  }

}
