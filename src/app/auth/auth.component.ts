import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Apprenant, Professeur } from '../models/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  // Déclarations des variables 
  // le tableau user qui contient la liste des utilisateurs avec leur role 
  users : User[] = [
    {
      idUser: 1,
      etat: 1,
      nom: "Seck",
      prenom :  "Djiby",
      email :  "djibyseck@gmail.com",
      password: "passer123&",
      telephone :  "777777777",
      adresse :  "Ouakam",
      role :  "admin"
    },
  ]

  professeurs: Professeur[] = [
    // {
    //   idProf:1,
    //   etatProf: 1,
    //   nom: "Diouf",
    //   prenom: "GG",
    //   email: "gg@gmail.com",
    //   password: "passer123&",
    //   telephone: "777777",
    //   role: "prof",
    //   adresse: "Ndiakhirate",
    //   matieres: [],
    //   createAt: "",
    //   createBy: "",
    //   updateAt: "",
    //   updateBy: "",
    // }
  ];

  apprenants: Apprenant[] = [
    // {
    //   idApprenant: 1,
    //   etatApprenant: 1,
    //   nom: "Faye",
    //   prenom: "Marie",
    //   adresse: "Diamalaye",
    //   email: "marie@gmail.com",
    //   password: "passer123&",
    //   telephone: "77888888",
    //   role: "Apprenant",
    //   notes: [],
    //   niveau: "Licence 2",
    //   createAt: "",
    //   createBy: "",
    //   updateAt: "",
    //   updateBy: "",
    // }
  ];

  // Le tableau temporaire qui stocke les utilisateurs du localStorage 
  tabUsersTmp: any;

  tabProfs: any;

  tabApprenants: any;

  // L'utilisateur admin trouvée dans le localStorage 
  userFound: any;

  // L'utilisateur prof trouvée dans le localStorage 
  userProfFound: any;

  // L'utilisateur apprenant trouvée dans le localStorage 
  userApprenantFound: any;

  // Variable pour la connexion 
  emailCon : String = "";
  passwordCon: String = "";

  // Pour vérifier les champs pour la connexion 
  verifEmailCon : String = "";
  verifPasswordCon: String = "";

  // Variables Si les valeurs sont exactes
  exactEmailCon : boolean = false;
  exactPasswordCon : boolean = false; 

  // Le constructeur 
  constructor(private route:Router){}

  // Déclaration des méthodes 
  // Methode ngOnInit
  ngOnInit(): void {
    // Pour les administrateurs
    // Insertion du tableau d'utilisateur dans le localstorage 
    // console.log(this.users);
    if(!localStorage.getItem("utilisateurs")){
      localStorage.setItem("utilisateurs", JSON.stringify(this.users));
    }
    // Renvoie un tableau de pour les administrateurs 
    this.tabUsersTmp = JSON.parse(localStorage.getItem("utilisateurs") || "[]");  
     
    
    // Pour les professeurs 
    if(!localStorage.getItem("professeurs")){
      localStorage.setItem("professeurs", JSON.stringify(this.professeurs));
    }
    // Renvoie un tableau de professeurs 
    this.tabProfs = JSON.parse(localStorage.getItem("professeurs") || "[]");  
    
    // Pour les apprenants 
    if(!localStorage.getItem("apprenants")){
      localStorage.setItem("apprenants", JSON.stringify(this.apprenants));
    }
    // Renvoie un tableau de apprenants 
    this.tabApprenants = JSON.parse(localStorage.getItem("apprenants") || "[]");  
     
  }


  // Fonction de Verification de l'email pour la fonctionnalité connexion
  verifEmailConFonction(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmailCon = false;
    
    if(this.emailCon == ""){
      this.verifEmailCon = "Veuillez renseigner votre email";
    }
    else if (!this.emailCon.match(emailPattern) ){
      this.verifEmailCon = "Veuillez donner un email valide";
    }
    else {
      this.verifEmailCon = "";
      this.exactEmailCon = true;
    }
  }

  // Fonction de Verification de l'email pour la fonctionnalité connexion
  verifPasswordConFonction(){
    this.exactPasswordCon = false;
    if(this.passwordCon == ""){
      this.verifPasswordCon = "Veuillez renseigner votre mot de passe";
    }
    else if (this.passwordCon.length < 5 ){
      this.verifPasswordCon = "Mot de passe doit être supérieur ou égal à 5";
    }
    else{
      this.verifPasswordCon = "";
      this.exactPasswordCon = true;
    }
  }

  // Méthode pour afficher un sweetalert2 apres vérification 
  verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }


  // Methode pour vider les champs de la connexion 
  viderChampsCon(){
    this.emailCon = "";
    this.passwordCon = "";

    this.verifEmailCon = "";
    this.verifPasswordCon = "";

    this.exactEmailCon = false;
    this.exactPasswordCon = false;
  }

  // Methode pour se connecter 
  connexion(){
    if (this.exactEmailCon && this.exactPasswordCon){
      this.userFound = this.tabUsersTmp.find((element:any) => element.email == this.emailCon && element.password == this.passwordCon);
      this.userProfFound = this.tabProfs.find((element:any) => element.email == this.emailCon && element.password == this.passwordCon);
      this.userApprenantFound = this.tabApprenants.find((element:any) => element.email == this.emailCon && element.password == this.passwordCon);

      if(this.userFound){
        this.route.navigate(['admin']);
        localStorage.setItem("adminConnect", JSON.stringify(this.userFound));
        this.viderChampsCon(); 
        this.verifierChamps("Félicitation!", "Authentifié avec succes", "success"); 
        
      }

      else if(this.userProfFound){
        this.route.navigate(['prof', this.userProfFound.idProf]);
        this.viderChampsCon(); 
        this.verifierChamps("Félicitation!", "Authentifié avec succes", "success");  
      }

      else if(this.userApprenantFound){
        this.viderChampsCon(); 
        this.verifierChamps("Félicitation!", "Authentifié avec succes", "success");
        this.route.navigate(['apprenant', this.userApprenantFound.idProf]);
      }

      else{
        alert("N'existe pas")
      }
    }
  }
}
