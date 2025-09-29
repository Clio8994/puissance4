class grilleJeu {
    private grille ;
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

}
let jeu = new grilleJeu();
jeu.afficherGrille();