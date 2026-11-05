import type { Classement } from "./classement";
import { Jeu } from "./jeu";

export class MatchEnUnSet {
  private jeuEnCours: Jeu;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {
    this.jeuEnCours = new Jeu(joueur1, joueur2, { enregistrer: () => {} });
  }

  pointPour(joueur: string): void {
    this.jeuEnCours.pointPour(joueur);
  }

  jeuxGagnes(joueur: string): number {
    return 0;
  }

  scoreDuJeuEnCours(): string {
    return this.jeuEnCours.score();
  }
}
