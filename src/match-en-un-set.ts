import type { Classement } from "./classement";

export class MatchEnUnSet {
  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {}

  pointPour(joueur: string): void {}

  jeuxGagnes(joueur: string): number {
    return 0;
  }

  scoreDuJeuEnCours(): string {
    return "Zéro-Zéro";
  }
}
