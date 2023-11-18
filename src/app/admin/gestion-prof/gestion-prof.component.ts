import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-prof',
  templateUrl: './gestion-prof.component.html',
  styleUrls: ['./gestion-prof.component.css']
})
export class GestionProfComponent implements OnInit {
  // Déclaration des variables 
  filteredElement: any;
  // Varible pour récupérer les profs enregistré dans le localStorage
  tabProfs: any;

  profFound: any;

  // Variables pour les informations du prof 
  nom: string= "";
  prenom: string= "";
  email: string= "";
  adresse: string= "";
  telephone: string= "";
  imageUrl: string= "";
  etat: number = 0;
  matiere: any;
  createAt: any;
  createBy: any;
  updateAt: any;
  updateBy: any;
  tabMatieresProf: any;
  classe: string = "";
  matiereProf: string = "";

  // L'administrateur qui s'est connecté 
  adminConnect: any;

  // Pour les classe:
  tabClasses: any;

  // professeur : Professeur [] = [
  //   {
  //     idProf: 1,
  //     etatProf: 1,
  //     nom: "Diouf",
  //     prenom : "Germaine",
  //     email : "germaine@gmail.com",
  //     password: "passer123&",
  //     telephone : "77788989",
  //     adresse : "Ouakam",
  //     role : "prof",
  //     matieres : [{
  //       idMatiere: 1,
  //       nomMatiere: "SVT",
  //       description: "une matiere vraiment"
  //       evaluation: [{
  //         idEvaluation : 1,
  //         semestre: "semestre 1",
  //         date : new date,
  //         type : "Devoir",
  //         anneeScolaire : "",
  //         etat : "en cours",
  //         classe : {
  //           idClasse: 1,
  //           nomClasse : "5 eme",
  //           apprenants : [
  //             {
  //               idApprenant :1,
  //               nom: "Faye",
  //               prenom: "Helene",
  //               email: "helene@gmail.com",
  //               password: "passer123&",
  //               telephone: "77777777",
  //               adresse: "Fass",
  //               role:"apprenant",
  //               etatApprenant: 1,
  //               niveau: "5 eme"
  //               notes: [12]
  //             }
  //           ]
  //         }
  //       }],
  //     }]
  //   }
  // ]

  // Déclarations des methodes 
  ngOnInit(): void {
    // Récupérations du tableau 
    this.tabProfs = JSON.parse(localStorage.getItem("professeurs") || "[]");
    console.log(this.tabProfs);

    // On récupère l'admin qui s'est connecté
    this.adminConnect = JSON.parse(localStorage.getItem("adminConnect") || "[]");

    // On récupère et stocke le tableau des classes 
    this.tabClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    
  }

  // Méthode pour afficher un sweetalert2 apres vérification 
  verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  // activer un prof 
  activerProf(user:any){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez activer ce contact le contact",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BE3144",
      cancelButtonColor: "#F05941",
      confirmButtonText: "Oui, j'active!"
    }).then((result) => {
      if (result.isConfirmed) {
        user.etatProf = 1;
        user.updateAt = new Date();
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("professeurs", JSON.stringify(this.tabProfs))
        this.verifierChamps("Compte activé!", "", "success");     
      }
    });
  }
  
  // desactiver un prof 
  desactiverProf(user:any){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez desactiver ce contact",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BE3144",
      cancelButtonColor: "#F05941",
      confirmButtonText: "Oui, je désactive!"
    }).then((result) => {
      if (result.isConfirmed) {
        user.etatProf = 0;
        user.updateAt = new Date();
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("professeurs", JSON.stringify(this.tabProfs))
        this.verifierChamps("Compte désactivé!", "", "success");     
      }
    });
    
    // 
    console.log(user);
    console.log(this.tabProfs);
  }

  // ViderChamps
  viderChampsCompte(){
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.adresse = "";
    this.telephone = "";
  }

  // Modifier un prof
  chargerInfosProf(user:any){
    this.profFound = user;
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.email = user.email;
    this.adresse = user.adresse;
    this.telephone = user.telephone;
    this.imageUrl = user.image;
  }

  // Modifier les informations
  modifierProf(){
    if(this.nom!="" && this.prenom!="" && this.email!="" && this.adresse!="" && this.telephone!=""){
      this.profFound.nom = this.nom;
      this.profFound.prenom = this.prenom;
      this.profFound.email = this.email;
      this.profFound.adresse = this.adresse;
      this.profFound.telephone = this.telephone;
      this.profFound.image = this.imageUrl;
      this.profFound.updateAt = new Date();
      this.profFound.updateBy = this.adminConnect.email;


      Swal.fire({
        title: "Etes-vous sur???",
        text: "Vous allez mofier ce contact",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#BE3144",
        cancelButtonColor: "#F05941",
        confirmButtonText: "Oui, je modifie!"
      }).then((result) => {
        if (result.isConfirmed) {
          // On met à jour le tableau qui est stocké dans le localStorage 
          localStorage.setItem("professeurs", JSON.stringify(this.tabProfs))
          this.verifierChamps("Compte modifié!", "", "success");     
        }
      });

    }
  }

  // Détails d'un prof
  // Détails professeur 
  detailProf(user:any){
    this.profFound = user;
    let classeFound = this.tabClasses.find((elemnt:any)=> elemnt.idClasse = user.classe)
    
    this.imageUrl = this.profFound.image;
    this.nom = this.profFound.nom;
    this.prenom = this.profFound.prenom;
    this.email = this.profFound.email;
    this.adresse = this.profFound.adresse;
    this.telephone = this.profFound.telephone;
    this.createAt = this.profFound.createAt;
    this.createBy = this.profFound.createBy;
    this.updateAt = this.profFound.updateAt;
    this.updateBy = this.profFound.updateBy;
    this.etat = this.profFound.etatProf;
    this.tabMatieresProf = this.profFound.matieres;
    this.classe = classeFound.nomClasse;

    console.log(classeFound);
  }

  showdetail: any;
  
  showDetailProf(){
    this.showdetail = !this.showdetail;
  }
  
}
