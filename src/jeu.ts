import type { Classement } from "./classement";

export class Jeu {
  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {}

  pointPour(joueur: string): void {}

  score(): string {
    return "Zéro-Zéro";
  }
}
