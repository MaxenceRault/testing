import { describe, expect, it, vi } from "vitest";
import { MatchEnUnSet } from "../src/match-en-un-set";
import type { Classement } from "../src/classement";

// Dummy : le match demande un classement à sa création, mais ces tests vérifient
// le score, pas le classement. Pas besoin d'un stub (enregistrer ne renvoie rien)
// ni d'un spy (on ne regarde pas ses appels).
const classementDummy: Classement = { enregistrer: () => {} };

function gagnerJeux(match: MatchEnUnSet, joueur: string, nombre: number): void {
  for (let i = 0; i < nombre * 4; i++) match.pointPour(joueur);
}

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

  it("gagner un jeu ajoute un jeu au gagnant et un nouveau jeu commence à Zéro-Zéro", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerJeux(match, "Alice", 1);

    expect(match.jeuxGagnes("Alice")).toBe(1);
    expect(match.jeuxGagnes("Bob")).toBe(0);
    expect(match.scoreDuJeuEnCours()).toBe("Zéro-Zéro");
  });

  it("pendant le match, le score donne les jeux de chacun puis le jeu en cours", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerJeux(match, "Alice", 1);
    match.pointPour("Alice");

    expect(match.score()).toBe("1-0, Quinze-Zéro");
  });
});

describe("Match en un set : la victoire", () => {
  it("le premier à 4 jeux gagne le match, 4-3 suffit sans 2 jeux d'écart", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerJeux(match, "Alice", 3);
    gagnerJeux(match, "Bob", 3);
    gagnerJeux(match, "Alice", 1);

    expect(match.score()).toBe("Victoire Alice 4-3");
  });

  it("le score de victoire donne les jeux du vainqueur en premier", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerJeux(match, "Alice", 1);
    gagnerJeux(match, "Bob", 4);

    expect(match.score()).toBe("Victoire Bob 4-1");
  });
});

describe("Match en un set : le classement du tournoi", () => {
  // Spy : on vérifie que le classement est appelé pour le match et non pour chaque jeu,
  // avec quels arguments et combien de fois. Un dummy ou un stub ne gardent aucune
  // trace des appels, et un fake serait du code en plus pour la même vérification.
  it("le classement enregistre le résultat du match, pas celui de chaque jeu", () => {
    const classement: Classement = { enregistrer: vi.fn() };
    const match = new MatchEnUnSet("Alice", "Bob", classement);

    gagnerJeux(match, "Alice", 3);
    expect(classement.enregistrer).not.toHaveBeenCalled();

    gagnerJeux(match, "Alice", 1);
    expect(classement.enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });

  // Spy : on compte les appels à enregistrer.
  it("le résultat du match n'est enregistré qu'une fois, même si des points sont marqués après", () => {
    const classement: Classement = { enregistrer: vi.fn() };
    const match = new MatchEnUnSet("Alice", "Bob", classement);

    gagnerJeux(match, "Bob", 4);
    gagnerJeux(match, "Alice", 2);

    expect(classement.enregistrer).toHaveBeenCalledTimes(1);
    expect(classement.enregistrer).toHaveBeenCalledWith("Bob", "Alice");
    expect(match.score()).toBe("Victoire Bob 4-0");
  });
});
