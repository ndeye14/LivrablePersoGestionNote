import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { Router } from '@angular/router';

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

  // Le tableau temporaire qui stocke les utilisateurs du localStorage 
  tabUsersTmp: any;

  // L'utilisateur trouvée dans le localStorage 
  userFound: any;

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
    // Insertion du tableau d'utilisateur dans le localstorage 
    // console.log(this.users);
    if(!localStorage.getItem("utilisateurs")){
      localStorage.setItem("utilisateurs", JSON.stringify(this.users));
    }

    // Renvoie un tableau de valuers ou un tableau vide 
    this.tabUsersTmp = JSON.parse(localStorage.getItem("utilisateurs") || "[]");  
    // console.log(this.idLastUser); 
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

      if(this.userFound){
        if(this.userFound.etat==1){
          // Le compte existe 
          this.viderChampsCon(); 
          this.verifierChamps("Félicitation!", "Authentifié avec succes", "success"); 
  
          // On vérifie le role de l'utilisateur trouvé
          if (this.userFound.role == "admin"){
            this.route.navigate(['admin']);
          }
          
          else if (this.userFound.role == "prof"){ 
            this.route.navigate(['prof']);
          }
          
          else if (this.userFound.role == "apprenant"){ 
            this.route.navigate(['apprenant']);
          }
        }

        else{
          this.verifierChamps("Compte désactivé!", "Veuillez contacter l'administrateur", "error"); 
        }
        
      }

      else{
        this.verifierChamps("Oups!", "Le compte n'exite pas", "error");  
      }
    }
  }
}
