// Model pour apprenant 
export class Apprenant {
    idApprenant: number = 0;
    etatApprenant: number = 0;
    nom: string = "";
    prenom : string = "";
    email : string = "";
    password: string = "";
    telephone : string = "";
    adresse : string = "";
    role : String= "";
    notes: []=[];
}

// Model pour classe 
export class Classe {
    idClasse: number = 0;
    nomClasse: string = "";
    apprenants: Apprenant[] = [];
}

// Model pour évaluation
export class Evaluation {
    idEvaluation: number = 0;
    semestre: string = "";
    date: string = "";
    type: string = "";
    anneeScolaire: string = "";
    etat: string ="";
    classe: Classe  = {idClasse: 0, nomClasse: "", apprenants:[]};
}

export class Matiere{
    idMatiere: number = 0;
    nomMatiere: string = "";
    evaluation: Evaluation[] = [];
}

export class Professeur {
    idProf: number = 0;
    etatProf: number = 0;
    nom: string = "";
    prenom : string = "";
    email : string = "";
    password: string = "";
    telephone : string = "";
    adresse : string = "";
    role : String= "";
    matieres: Matiere[]=[];
}