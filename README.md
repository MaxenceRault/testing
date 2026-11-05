# Tennis : tenir le score en TDD

Calcul du score d'un match de tennis simplifié (un match = un jeu), écrit en TypeScript avec Vitest, en suivant le cycle **red → green → refactor**.

## Lancer le projet

```bash
npm install
npm test              # lance tous les tests une fois
npm run test:watch    # relance les tests à chaque modification
```

## Organisation

```
src/
  classement.ts        interface Classement (imposée)
  jeu.ts               classe Jeu : un match en un jeu (étapes 1 à 4)
  match-en-un-set.ts   classe MatchEnUnSet : un match en un set (bonus)
test/
  jeu.test.ts              points, égalité, victoire
  classement.test.ts       envoi du résultat au classement
  match-en-un-set.test.ts  bonus
```

## Règles couvertes

- **Les points** : `Zéro`, `Quinze`, `Trente`, `Quarante`, joueur 1 en premier ; à égalité, `Quinze-A` et `Trente-A`.
- **Le point décisif** : à 40-40, `Égalité`, et le point suivant gagne (pas d'avantage).
- **La victoire** : `Victoire Alice` ou `Victoire Bob`.
- **Le classement** : le résultat est enregistré une seule fois, à la fin du match, vainqueur en premier.
- **Bonus, le match en un set** : le premier à 4 jeux gagne (4-3 suffit), score final `Victoire Alice 4-2`, et seul le résultat du match est envoyé au classement.

## Choix de conception

- **Points après la victoire** : ils sont ignorés. Le score reste `Victoire …` et le classement n'est pas rappelé, ce qui garantit l'enregistrement unique.
- **Réutilisation de `Jeu` dans le set** : `MatchEnUnSet` crée un `Jeu` pour chaque jeu et lui passe un classement interne, qui le prévient quand le jeu est gagné. `Jeu` n'a pas été modifié pour le bonus.
- **Score pendant un set** : `scoreDuJeuEnCours()` donne le score du jeu (`Quinze-Zéro`), `jeuxGagnes(joueur)` le nombre de jeux, et `score()` les deux ensemble (`1-0, Quinze-Zéro`).

## Doubles de test

Chaque double est justifié en commentaire dans les fichiers de test.

- **Dummy** (`{ enregistrer: () => {} }`) pour les tests de score : le constructeur demande un classement, mais ces tests ne vérifient rien dessus.
- **Spy** (`vi.fn()`) pour les tests du classement : il faut vérifier si `enregistrer` est appelé, quand, avec quels arguments et combien de fois.

## Démarche

L'historique git suit le cycle TDD : un commit `red:` pour chaque test qui échoue, puis `green:` pour le code qui le fait passer, et `refactor:` quand il y a quelque chose à nettoyer. Le test est toujours commité avant le code.
