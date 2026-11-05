import type { Classement } from "./classement";
import { Jeu } from "./jeu";

const JEUX_POUR_GAGNER = 4;

export class MatchEnUnSet {
  private jeuxJoueur1 = 0;
  private jeuxJoueur2 = 0;
  private jeuEnCours: Jeu;

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {
    this.jeuEnCours = this.nouveauJeu();
  }

  pointPour(joueur: string): void {
    if (this.vainqueur()) return;
    this.jeuEnCours.pointPour(joueur);
  }

  jeuxGagnes(joueur: string): number {
    return joueur === this.joueur1 ? this.jeuxJoueur1 : this.jeuxJoueur2;
  }

  scoreDuJeuEnCours(): string {
    return this.jeuEnCours.score();
  }

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      const perdant = this.adversaire(vainqueur);
      return `Victoire ${vainqueur} ${this.jeuxGagnes(vainqueur)}-${this.jeuxGagnes(perdant)}`;
    }
    return `${this.jeuxJoueur1}-${this.jeuxJoueur2}, ${this.scoreDuJeuEnCours()}`;
  }

  // Chaque jeu reçoit un "classement" qui prévient le set quand le jeu est gagné.
  private nouveauJeu(): Jeu {
    return new Jeu(this.joueur1, this.joueur2, {
      enregistrer: (vainqueurDuJeu) => this.jeuGagnePar(vainqueurDuJeu),
    });
  }

  private jeuGagnePar(joueur: string): void {
    if (joueur === this.joueur1) this.jeuxJoueur1++;
    else this.jeuxJoueur2++;

    const vainqueur = this.vainqueur();
    if (vainqueur) this.classement.enregistrer(vainqueur, this.adversaire(vainqueur));
    else this.jeuEnCours = this.nouveauJeu();
  }

  private vainqueur(): string | null {
    if (this.jeuxJoueur1 === JEUX_POUR_GAGNER) return this.joueur1;
    if (this.jeuxJoueur2 === JEUX_POUR_GAGNER) return this.joueur2;
    return null;
  }

  private adversaire(joueur: string): string {
    return joueur === this.joueur1 ? this.joueur2 : this.joueur1;
  }
}
