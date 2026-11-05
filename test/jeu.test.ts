import { describe, expect, it } from "vitest";
import { Jeu } from "../src/jeu";
import type { Classement } from "../src/classement";

// Dummy : le constructeur de Jeu demande un classement, mais ces tests ne vérifient
// rien dessus. Pas besoin d'un stub (enregistrer ne renvoie rien) ni d'un spy
// (on ne regarde pas ses appels) : un objet qui ne fait rien suffit.
const classementDummy: Classement = { enregistrer: () => {} };

describe("Jeu : les points", () => {
  it("un jeu commence à Zéro-Zéro", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    expect(jeu.score()).toBe("Zéro-Zéro");
  });
});
