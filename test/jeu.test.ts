import { describe, expect, it } from "vitest";
import { Jeu } from "../src/jeu";
import type { Classement } from "../src/classement";

// Dummy : le constructeur de Jeu demande un classement, mais ces tests ne vérifient
// rien dessus. Pas besoin d'un stub (enregistrer ne renvoie rien) ni d'un spy
// (on ne regarde pas ses appels) : un objet qui ne fait rien suffit.
const classementDummy: Classement = { enregistrer: () => {} };

function jeuA(pointsAlice: number, pointsBob: number): Jeu {
  const jeu = new Jeu("Alice", "Bob", classementDummy);
  for (let i = 0; i < pointsAlice; i++) jeu.pointPour("Alice");
  for (let i = 0; i < pointsBob; i++) jeu.pointPour("Bob");
  return jeu;
}

describe("Jeu : les points", () => {
  it("un jeu commence à Zéro-Zéro", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    expect(jeu.score()).toBe("Zéro-Zéro");
  });

  it.each([
    [1, 0, "Quinze-Zéro"],
    [0, 1, "Zéro-Quinze"],
    [2, 1, "Trente-Quinze"],
    [3, 2, "Quarante-Trente"],
  ])("les points s'annoncent Zéro, Quinze, Trente, Quarante, joueur 1 en premier (%i-%i → %s)", (alice, bob, attendu) => {
    expect(jeuA(alice, bob).score()).toBe(attendu);
  });

  it.each([
    [1, 1, "Quinze-A"],
    [2, 2, "Trente-A"],
  ])("à égalité de points (hors Zéro et Quarante), le score s'annonce « A » (%i-%i → %s)", (alice, bob, attendu) => {
    expect(jeuA(alice, bob).score()).toBe(attendu);
  });
});

describe("Jeu : le point décisif", () => {
  it("à Quarante-Quarante, le score est Égalité", () => {
    expect(jeuA(3, 3).score()).toBe("Égalité");
  });
});
