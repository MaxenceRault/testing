import { describe, expect, it, vi } from "vitest";
import { Jeu } from "../src/jeu";
import type { Classement } from "../src/classement";

describe("Jeu : le classement du tournoi", () => {
  // Spy : on doit vérifier que Jeu appelle enregistrer, à quel moment et avec quels
  // arguments. Un dummy ou un stub ne garderaient aucune trace des appels, et un fake
  // (un vrai classement en mémoire) serait du code en plus pour la même vérification.
  it("le résultat est enregistré à la fin du match, pas avant", () => {
    const classement: Classement = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classement);

    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    expect(classement.enregistrer).not.toHaveBeenCalled();

    jeu.pointPour("Alice");
    expect(classement.enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });

  // Spy : même raison, on vérifie les arguments reçus par enregistrer.
  it("le vainqueur est enregistré en premier, même quand c'est le joueur 2", () => {
    const classement: Classement = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classement);

    for (let i = 0; i < 4; i++) jeu.pointPour("Bob");

    expect(classement.enregistrer).toHaveBeenCalledWith("Bob", "Alice");
  });
});
