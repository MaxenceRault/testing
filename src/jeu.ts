import type { Classement } from "./classement";

const ANNONCES = ["Zéro", "Quinze", "Trente", "Quarante"];
const QUARANTE = 3;

export class Jeu {
  private pointsJoueur1 = 0;
  private pointsJoueur2 = 0;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {}

  pointPour(joueur: string): void {
    if (this.vainqueur()) return;

    if (joueur === this.joueur1) this.pointsJoueur1++;
    else this.pointsJoueur2++;

    const vainqueur = this.vainqueur();
    if (vainqueur) this.classement.enregistrer(vainqueur, this.adversaire(vainqueur));
  }

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur) return `Victoire ${vainqueur}`;

    if (this.pointsJoueur1 === this.pointsJoueur2) {
      return this.annonceEgalite(this.pointsJoueur1);
    }
    return `${ANNONCES[this.pointsJoueur1]}-${ANNONCES[this.pointsJoueur2]}`;
  }

  private vainqueur(): string | null {
    if (this.pointsJoueur1 > QUARANTE) return this.joueur1;
    if (this.pointsJoueur2 > QUARANTE) return this.joueur2;
    return null;
  }

  private adversaire(joueur: string): string {
    return joueur === this.joueur1 ? this.joueur2 : this.joueur1;
  }

  private annonceEgalite(points: number): string {
    if (points === 0) return "Zéro-Zéro";
    if (points === QUARANTE) return "Égalité";
    return `${ANNONCES[points]}-A`;
  }
}
