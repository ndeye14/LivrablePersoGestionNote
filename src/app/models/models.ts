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
    niveau: string = "";
    notes: []=[];
    createAt: string = "";
    createBy: string = "";
    updateAt: string = "";
    updateBy: string = "";
}

// Model pour classe 
export class Classe {
    idClasse: number = 0;
    nomClasse: string = "";
    apprenants: Apprenant[] = [];
    effectif: string = "";
    createAt: string = "";
    createBy: string = "";
    updateAt: string = "";
    updateBy: string = "";
}

// Model pour évaluation
export class Evaluation {
    idEvaluation: number = 0;
    semestre: string = "";
    date: Date = new Date();
    type: string = "";
    anneeScolaire: Date = new Date();
    etat: string ="";
    classe: Classe  = {idClasse: 0, nomClasse: "", effectif: "", apprenants:[], createAt:"", createBy:"", updateAt:"", updateBy:""};
}

export class Matiere{
    idMatiere: number = 0;
    nomMatiere: string = "";
    evaluation: Evaluation[] = [];
    createAt: string = "";
    createBy: string = "";
    updateAt: string = "";
    updateBy: string = "";
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
    createAt: string = "";
    createBy: string = "";
    updateAt: string = "";
    updateBy: string = "";
}