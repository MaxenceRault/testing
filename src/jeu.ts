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
    if (joueur === this.joueur1) this.pointsJoueur1++;
    else this.pointsJoueur2++;
  }

  score(): string {
    if (this.pointsJoueur1 === this.pointsJoueur2) {
      return this.annonceEgalite(this.pointsJoueur1);
    }
    return `${ANNONCES[this.pointsJoueur1]}-${ANNONCES[this.pointsJoueur2]}`;
  }

  private annonceEgalite(points: number): string {
    if (points === 0) return "Zéro-Zéro";
    if (points === QUARANTE) return "Égalité";
    return `${ANNONCES[points]}-A`;
  }
}
