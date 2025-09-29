class grilleJeu {
    private grille: string[][];
    private colonne = 7;
    private ligne = 6;

    constructor(){
        this.initialiserGrille();
    }

    private initialiserGrille(): void{
        this.grille = [];
        for (let i = 0; i < this.colonne; i++){
            this.grille[i] = [];
            for (let o = 0; o < this.ligne; o++){
                this.grille[i][o] = ".";
            }
        }
    }

    afficherGrille(): void{
        let lignes: string[] = [];
        lignes.push('');
        let header = '';
        
        for (let i = 0; i < this.colonne; i++) {
            header += i + ' ';
        }
        lignes.push(header);
        lignes.push('-'.repeat(this.colonne * 2 - 1));
        for (let o = 0; o < this.ligne; o++) {
            let row = '';
            for (let i = 0; i < this.colonne; i++) {
                row += this.grille[i][o] + ' ';
            }
            lignes.push(row);
        }
        console.log(lignes.join('\n'));
    }

    jouerCoup(col: number, joueur: string): boolean {
        if (col < 0 || col >= this.colonne)
            return false;
        
        for (let o = this.ligne - 1; o >= 0; o--) {
            if (this.grille[col][o] === ".") {
                this.grille[col][o] = joueur;
                return true;
            }
        }
        return false; 
    }

    verifierVictoire(joueur: string): boolean {
        // Vérification horizontale
        for (let o = 0; o < this.ligne; o++) {
            for (let i = 0; i <= this.colonne - 4; i++) {
                if ( this.grille[i][o] === joueur && this.grille[i+1][o] === joueur && this.grille[i+2][o] === joueur && this.grille[i+3][o] === joueur ) {
                    return true;
                }
            }
        }
        // Vérification verticale
        for (let i = 0; i < this.colonne; i++) {
            for (let o = 0; o <= this.ligne - 4; o++) {
                if ( this.grille[i][o] === joueur && this.grille[i][o+1] === joueur && this.grille[i][o+2] === joueur && this.grille[i][o+3] === joueur ) {
                    return true;
                }
            }
        }
        // Vérification diagonale descendante
        for (let i = 0; i <= this.colonne - 4; i++) {
            for (let o = 0; o <= this.ligne - 4; o++) {
                if ( this.grille[i][o] === joueur && this.grille[i+1][o+1] === joueur && this.grille[i+2][o+2] === joueur && this.grille[i+3][o+3] === joueur ) {
                    return true;
                }
            }
        }
        // Vérification diagonale montante
        for (let i = 0; i <= this.colonne - 4; i++) {
            for (let o = 3; o < this.ligne; o++) {
                if ( this.grille[i][o] === joueur && this.grille[i+1][o-1] === joueur && this.grille[i+2][o-2] === joueur && this.grille[i+3][o-3] === joueur ) {
                    return true;
                }
            }
        }
        return false;
    }

    estGrillePleine(): boolean {
        for (let i = 0; i < this.colonne; i++) {
            for (let o = 0; o < this.ligne; o++) {
                if (this.grille[i][o] === ".") {
                    return false;
                }
            }
        }
        return true;
    }
}

let jeu = new grilleJeu();
let joueurActuel = "X";

function tourDeJeu() {
    jeu.afficherGrille();
    setTimeout(() => {
        let entree = prompt(`Joueur ${joueurActuel}, entrez le numéro de colonne (0-${jeu["colonne"] - 1}) :`);
        if (entree === null) {
            console.log("Partie arrêtée.");
            return;
        }
        let col = parseInt(entree);
        if (isNaN(col)) {
            console.log("Entrée incorrect, entrer un nombre valide.");
            tourDeJeu();
            return;
        }
        if (jeu.jouerCoup(col, joueurActuel)) {
            if (jeu.verifierVictoire(joueurActuel)) {
                jeu.afficherGrille();
                console.log("Le joueur " + joueurActuel + " a gagné !");
                return;
            }
            if (jeu.estGrillePleine()) {
                jeu.afficherGrille();
                console.log("Grille remplie, match nul !");
                return;
            }
            if (joueurActuel === "X") {
                joueurActuel = "O";
            } else {
                joueurActuel = "X";
            }
        } else {
            console.log("Coup impossible, colonne remplis ou nombre trop grand / petit.");
        }
        tourDeJeu();
    }, 1000);
}

tourDeJeu();