import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evaluation, Matiere } from 'src/app/models/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil-prof',
  templateUrl: './accueil-prof.component.html',
  styleUrls: ['./accueil-prof.component.css']
})
export class AccueilProfComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) { }

  isDetails: boolean = true;
  isNote: boolean = true;
  evaluationsFiltered: any;
  tabApprenants:any;


  // declarations des variables
  semestreInput: string = "";
  dateInput = new Date();
  typeInput: string = "";
  anneeInput:string="";
  etatInput: string = "";
  createAt: any;
  createBy: any;
  updateAt: any;
  updateBy: any;

  //
  matiereInput: string = "";
  classeInput: string = "";
  matiere: string = "";
  // numeroMatiere: number = 0;
  matiereProf: string = "";

  // permet stocker la matiere trouver
    matiereFound: any;

  // evaluation trouve
  evaFound: any;

  // La classe choisi lors de l'ajout
  classeFound: any;

  // identifiant du dernier evaluation
  idLastEvaluation: number = 0;

  // identifiant du dernier clase
  idLastClasse: number = 0;

  // identifiant du dernier apprenant
  idLastApprenant: number = 0;

  // listeApprenantsEvalues:any;

  // prof trouvé
  // profFound: any;

  // le tableau evaluation qui contient la liste des evaluatins avec leur role
  evaluations: Evaluation[] = []
  evaluationFound:any;

  // Le tableau temporaire qui stocke les evaluations du localStorage
  tabEvaTmp: any;

  // tableau pour pour la classe
  tabClasse: any;

  //valeur du filter qui correspond a celui du champs recherche
  filterValue = '';


  //les element trouver
  filteredElement: any;

  // tableau  contenant les professeurs
  tabProfs: any;
  profConnect: any;

  tabMatieresTmp: any;

  // Pour les classe:
  tabClasses: any;
  // pour matieres
  tabMatieres: any;
  // matiere:string="";
  tabMatieresProf: any;

  // Attribut qui permet de rÃ©cupÃ©rer l'identifiant de celui qui s'est connectÃ©
  idProfConnect = this.route.snapshot.params['id'];


   ngOnInit(): void {

    // On récupère le tableau d'objets dans le localstorage
    this.tabProfs = JSON.parse(localStorage.getItem("professeurs") || "[]");

    // On récupère l'objet(le prof) qui s'est connecter
    this.profConnect = this.tabProfs.find((element: any) => element.idProf == this.idProfConnect);
     console.log(this.profConnect);

     //  matiere du prof dans professeurs
     this.tabMatieresProf = this.profConnect.matieres;
     console.log(this.tabMatieresProf);

      // On récupère et stocke le tableau des matieres
     this.tabMatieres = JSON.parse(localStorage.getItem("matieres") || "[]");
     console.log(this.tabMatieres)

       // On récupère et stocke le tableau des classes
     this.tabClasses = JSON.parse(localStorage.getItem("classes") || "[]");




    // // on effectue une copie valeur par reference de tabEvaTmp dans filteredElement


      this.classeFound = this.tabClasses.find((elemnt: any) => elemnt.idClasse == this.profConnect.idClasse)
       this.classeInput = this.classeFound.nomClasse
      console.log(this.classeInput);
     console.log(this.profConnect.idClasse);

     //  Les étudiants de la classe du prof
     this.tabApprenants = this.classeFound.apprenants
    //  console.log(this.tabApprenants);


  }

  // Chosir entre détails et liste des matiere
  showDetails(){
    this.isNote = true;
    this.isDetails = !this.isDetails;
  }

  // Methode pour voir les détails de la matiere
  detailsMatiere(matiere:any){
    this.matiereFound = matiere;

    this.evaluationFound = matiere.evaluation;
    console.log(this.evaluationFound);
    this.evaluationsFiltered = this.matiereFound.evaluation
  }


// methode pour recuperer matiere et evalautions
  openModal(selectedMatiere: Matiere) {
  // Utilisez la matière sélectionnée (tabMatieresProf) plutôt que l'ensemble du tableau
    this.matiereFound = selectedMatiere;
    console.log('Matiere Found:', this.matiereFound);

    this.evaFound = this.matiereFound.evaluation;
    console.log('Evaluations Found:', this.evaFound);


}
// Methode pour vhoir entre voir note ou pas
  showNotes(){
    this.isDetails = true;
    this.isNote = !this.isNote;
  }

  // Methode pour valider une nore
  noter(evaluation:any){
    this.evaluationFound = evaluation;
  }
   // Méthode pour enregistrer les notes pour les apprenants
  validerNote(){
    console.log(this.evaluationFound)
    this.tabApprenants.forEach((element:any) => {
      if (parseInt(element.note)>20 || parseInt(element.note) <0){
        this.verifierChamp("Impossible", "La note est comprise entre 0 et 20", "error");
      }
      else{

        let objetNote = {
          note: element.note,
          idEvaluation: this.evaluationFound.idEvaluation,
          idMatiere: this.matiereFound.idMatiere,
          idProf: this.profConnect.idProf
        }

        console.log(objetNote);
        element.notes.push(objetNote);
        console.log("element"+element.note);
      }
      // console.log(this.tabClasses);
      // On modifie l'attribue isNoted de l'evaluation
      this.evaluationFound.isNoted = "oui";
      this.evaluationFound.etat = "faite";

      // On met à jour le localStorage pour classes
      localStorage.setItem("classes", JSON.stringify(this.tabClasses));

      // On met à jour le localStorage pour professeurs
      localStorage.setItem("professeurs", JSON.stringify(this.tabProfs));
      // console.log(this.tabProfs.matieres);


      this.verifierChamp("Felicitation!", "Notes attribué avec success", "success");
    });
  }

  showNote: boolean = true;
  noteApprenant: any;
  idAppFound: any


  // Méthode qui permet de récuperer l'évaluation cliquée
  showDetailsEvalution(evaluation:any){
    this.numEvaluation = evaluation.idEvaluation;
    // console.log(this.numEvaluation);
  }

  noteApprenantFound(apprenant:any){
    // On récopère le tableau des notes de l'utilisateur
    let notes = apprenant.notes
    console.log(notes);

    // On récupère l'identifiant de l'apprenant
    this.idAppFound = apprenant.idApprenant;
    // On récupère l'objet note de l'utilisateur
    let noteFound = notes.find((element:any) => element.idEvaluation == this.numEvaluation);
    console.log(noteFound);

    // On récupère juste la note dans l'objet
    this.noteApprenant = noteFound.note;
    console.log("note "+this.noteApprenant);
  }

   // Methode pour voir ou cacher la note
  showNoteApprenant(){
    this.showNote = !this.showNote;
  }




  // Méthode pour afficher un sweetalert2 apres vérification
  verifierChamp(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }
  // Methode pour vider les champs
  viderChamps() {
    // On vide les valeurs des champs input
    this.semestreInput = "";
    this.dateInput = new Date();
    this.typeInput = "";
    this.anneeInput = "";
    this.etatInput = "";
    // this.matiereInput = "";
    // this.classeInput = "";
  }



  ajouterEvaluation() {
    // On vÃ©rifie si le tableau n'est pas vide
    if (this.evaFound.length) {
      this.idLastEvaluation = this.evaFound[this.evaFound.length - 1].idEvaluation;
    }
    if (this.semestreInput == "" ||  this.typeInput == "" || this.anneeInput == "" || this.etatInput == "") {
      this.verifierChamp("Erreur", "Veillez remplir tous les champs", "error")
    }
    else {
      // creation de l'object evaluation
      let evaluation = {
        idEvaluation: this.idLastEvaluation + 1,
        semestre: this.semestreInput,
        date: this.dateInput,
        type: this.typeInput,
        anneeScolaire: this.anneeInput,
        etat: this.etatInput,
        // createAt:this.profConnect.emailInput,
        // createBy: new Date(),
      }
      // ajout de l'objet evaluation dans le localStorage
      this.evaFound.push(evaluation);
      // Ferme le popup si on click sur Ok
      Swal.fire({
        title: "Felicitation!",
        text: "evaluation créé avec succes",
        icon: "success",
      });
      // on met notre  tableau a jour qui est dans le localStorage
      localStorage.setItem("professeurs", JSON.stringify(this.tabProfs));
      // console.log("vrai"+this.evaFound)

      this.viderChamps();


    }

  }

   // Variable qui stockera le contact cliqué
  currentEvaluation: any;
  // Methode pour charger les informations à modifier
  chargerInfosEvaluation(paramEvaluation:any){
    this.currentEvaluation = paramEvaluation;
    this.semestreInput = paramEvaluation.semestre;
    this.dateInput = paramEvaluation.date;
    this.typeInput = paramEvaluation.type;
    this.anneeInput = paramEvaluation.anneeScolaire;
    this.etatInput = paramEvaluation.etat;
    console.log(paramEvaluation)
  }


  // Methode pour modifier l' Evaluation
  modifierEvaluation() {
  // Assurez-vous que currentEvaluation est défini
  if (this.currentEvaluation) {
    // Mettez à jour les propriétés de currentEvaluation avec les valeurs des champs d'entrée
    this.currentEvaluation.semestreEvaluation = this.semestreInput;
    console.log(this.currentEvaluation.semestreEvaluation )
    this.currentEvaluation.date = this.dateInput;
    this.currentEvaluation.type = this.typeInput;
    this.currentEvaluation.anneeScolaire = this.anneeInput;
    this.currentEvaluation.etat = this.etatInput;

    // Mettez à jour la date de dernière modification
    this.currentEvaluation.updateAt = new Date();

    // Mettez à jour la personne qui a modifié l'évaluation (si besoin)
    // this.currentEvaluation.updateBy = this.profConnect.email;

    // Mettez à jour le tableau dans le localStorage (si besoin)
    // Note : Assurez-vous que currentEvaluation est une référence à l'objet dans le tableau
    // pour que les modifications soient reflétées dans le tableau d'origine.
    // localStorage.setItem("professeurs", JSON.stringify(this.tabProfs));

    // Videz les champs après la modification
    this.viderChamps();
  } else {
    console.error("currentEvaluation n'est pas défini.");
  }
}

  // methode pour annuler soit ajout soit modification
  annulerAjoutEvaluation() {
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez annuler votre ajout d'evaluation",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, j'annule!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.verifierChamp("Ajout evaluation  annulÃ©e!", "", "success");
        this.viderChamps();
      }
    });
  }



  // Methode de recherche automatique
  onSearch() {
    // Recherche se fait selon le nom ou le prenom

    this.filteredElement = this.evaFound.filter(
      (elt: any) => (elt?.semestreEvaluation.toLowerCase().includes(this.filterValue.toLowerCase())) || elt?.dateEvaluation.toLowerCase().includes(this.filterValue.toLowerCase()) || elt?.etatEvaluation.toLowerCase().includes(this.filterValue.toLowerCase())

    );

  }

  // // Créez un objet pour stocker l'état de la couleur pour chaque bouton
couleurChangeeStates: { [key: string]: boolean } = {};
changerCouleur(item: any) {
    // Utilisez l'ID ou un autre identifiant unique comme clé dans l'objet
    const key = item.nomMatiere; // Vous pouvez utiliser un identifiant unique ici
    this.couleurChangeeStates[key] = !this.couleurChangeeStates[key];
}



  logout(){
    //supprimer le currentuser dans notre local staorage
    // localStorage.removeItem('currentUser')
    //redirection vers login
    this.router.navigate(['/auth']);
  }


  // Pour les evaluations:
  nbreEvaluation: number = 0;
  tabEvaluations: any;
  semestre: any;
  anneeScolaire: any;
  typeEvaluation: any;
  etatEvaluation: any;
  numEvaluation: any;
  // classeEvalue: any;
// Détails évaluation
  detailsEvaluation(evaluation: any) {
    this.numEvaluation = evaluation.idEvaluation;
    this.semestre = evaluation.semestre;
    this.anneeScolaire = evaluation.anneeScolaire;
    this.typeEvaluation = evaluation.type;
    this.etatEvaluation = evaluation.etat;
    this.createBy = this.profConnect.email;
    this.createAt = new Date();


}





}
