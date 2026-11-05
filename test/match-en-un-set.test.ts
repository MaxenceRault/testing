import { describe, expect, it } from "vitest";
import { MatchEnUnSet } from "../src/match-en-un-set";
import type { Classement } from "../src/classement";

// Dummy : le match demande un classement à sa création, mais ces tests vérifient
// le score, pas le classement. Pas besoin d'un stub (enregistrer ne renvoie rien)
// ni d'un spy (on ne regarde pas ses appels).
const classementDummy: Classement = { enregistrer: () => {} };

describe("Match en un set : le score", () => {
  it("un set commence à zéro jeu partout, avec un jeu à Zéro-Zéro", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    expect(match.jeuxGagnes("Alice")).toBe(0);
    expect(match.jeuxGagnes("Bob")).toBe(0);
    expect(match.scoreDuJeuEnCours()).toBe("Zéro-Zéro");
  });

  it("les points marqués font avancer le jeu en cours, avec les règles d'un jeu", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    match.pointPour("Alice");
    match.pointPour("Alice");
    match.pointPour("Bob");

    expect(match.scoreDuJeuEnCours()).toBe("Trente-Quinze");
  });
});
