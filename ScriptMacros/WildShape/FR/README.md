# WildShape

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.7.8-informational)

* **Author**: MisterHims
* **Traduction**: MisterHims
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.7.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [The Furnace](https://github.com/kakaroto/fvtt-module-furnace), [DAE](https://gitlab.com/tposney/dae),[Token Magic FX](https://github.com/Feu-Secret/Tokenmagic), [Midi-QOL](https://gitlab.com/tposney/midi-qol)
* **Macro Requirement(s)**: [WildShape] Transfer DAE Effects, Remove WildShape Effect

## Description

WildShape est une macro permettant de polymorphe son personnage puis de revenir sous sa forme originale, le tout possible avec les animations disponibles de Token Magic FX. Les statistiques du druide seront ainsi remplacées par celles de la forme souhaitée et celui-ci verra alors son token remplacé.

Les différents effets de DAE et les animations de Token Magic FX déjà présentes sur votre personnage seront conservés.

![WildShape-Demonstration-01](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/images/dem_01.gif)

## Informations

* Par défaut, vous transférerez les aptitudes suivantes de votre forme originale à votre nouvelle forme :
  * Scores d'ablités mentales (Sagesse, Intelligence, Charisme)

  * Maitrîse des jets de sauvegarde

  * Compétences

  * Biographie

  * Capacités de la classe

Vous pouvez-vous choisir les aptitudes à enlever ou à ajouter depuis la macro.

## Installation

A noter :

* Le polymorph de Foundry VTT requiert que les joueurs soient autorisés à le faire. Vous devrez pour cela les autoriser à "Créer de nouveaux personnages" et "Créer de nouveaux tokens" depuis la Configuration des options.

* Vous devrez également ajouter les droits de possession au personnage qui servira de base à votre polymorph.

Important. Suivez exactement les étapes ci-dessous. Vous serez ensuite libre de configurer la macro à vos besoins après son installation.

1. Premièrement, vous avez besoin de récupérer l'activable Forme Sauvage depuis le compendium SRD par exemple.

2. Créez ensuite un effet DAE nommé "WildShape Effect" sur la Forme Sauvage puis paramétrez-le en mode "Suspended" et "Enabled when equiped". Ajoutez-y une nouvelle clé d'attribut avec ces valeurs macro.execute // CUSTOM // "WildShape Macro" // 20

3. Ajoutez une durée, soit depuis l'activable Forme Sauvage, soit directement depuis son effet (mettez au moins 2 heures). Vérifiez également si la cible est bien reglée sur 'Soi-même'.

4. Placez ensuite l'activable Forme Sauvage dans la fiche personnage de votre forme de départ (forme originale) et dans votre forme d'arrivée (nouvelle forme).

5. Créez ensuite les deux nouvelles macros externes dont vous aurez besoin ([WildShape.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/WildShape.js))

## Configuration

Après avoir effectué l'installation de WildShape, vous devez la configurer.

1. Dans un premier temps vous devez disposer du personnage dont vous souhaitez faire changer de forme. Vérifiez bien que celui-ci dispose de l'aptitude Forme sauvage dans sa fiche. Si ce n'est pas le cas, vous devrez l'ajouter depuis le compendium "Capacités des Classes". Par la suite, vous devrez ajouter un nouveau slot de ressource à celui-ci :

   ![WildShape-New-Slot](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/images/new-slot.jpg)

2. Créez les fiches personnages des différentes formes que vous souhaitez ajouter à la macro. Pour cela, je vous propose de directement utiliser une solution intégrée à FoundryVTT :
    * Faites un glisser-déposer de la bête dont vous souhaitez adopter la forme (par exemple un Loup) depuis le compendium "Monstres" vers la fiche du personnage précédemment créée à l'étape 1.

    * Une fenêtre s'ouvre alors, cochez les cases "Conserver l'équipement", "Conserver le bonus de maîtrise", "Conservez les aptitudes",  "Conserver les sorts", "Conservez sa biographie", "Garder la vision" et "Transformer tous les tokens liés".

    * De cette façon, une nouvelle fiche personnage sera temporairement créée dans votre liste du menu Personnages, vous pouvez alors là modifier à votre guise. Faites-en une copie puis renommez-là afin de la sauvegarder. Vous pouvez alors supprimer la première fiche personnage temporaire.

    * Répétez l'opération pour toutes les formes que vous souhaitez ajouter, par exemple le Crocodile et l'Aigle.

      ![WildShape-Polymorph](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/images/dem_polymorph.gif)

3. Récupérez l'ID des différentes fiches personnages des formes en question, pour cela il existe plusieurs méthodes mais je vous propose celle-ci afin de rester sur FoundryVTT :
    * Ouvrez ou créez un nouvel article dans le menu Articles et passez en mode édition (en cliquant sur l'icône représentant un carré avec un crayon).

    * Ouvrez le menu Personnages puis faites un glisser-déposer de la fiche du personnage de la forme, vous devriez obtenir quelque chose comme cela : ``` @Actor[5K4RGyiivnSg1jFe]{Erendil le Loup} ```, l'ID se trouve alors entre les crochets, c'est à dire ``` 5K4RGyiivnSg1jFe ``` dans ce cas présent.

    * Notez alors cet ID quelque part, il vous permettra d'ajouter cette forme à la macro.

      ![WildShape-RécupérerIDs](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/images/dem_id.gif)

4. Après avoir récupérer les différents IDs nécessaires à vos besoins des différentes fiches personnages (par exemple : Erendil le Loup, Erendil le Crocodile et Erendil l'Aigle), vous devrez alors modifier le code de la macro afin d'y ajouter ces IDs. Dans le bout de code suivant, remplacez alors ``` ID_du_personnage ``` par l'ID du personnage dont vous souhaitez changer la forme :

   ```javascript

    case "loup":
     formActorId = "ID_du_personnage";
     break;

   ```

   Deviendrait alors :

   ```javascript

    case "loup":
     formActorId = "5K4RGyiivnSg1jFe";
     break;

   ```

5. Répétez alors l'opération avec les IDs utilisés pour les formes de Crocodile et d'Aigle :

   ```javascript

    case "loup":
     formActorId = "5K4RGyiivnSg1jFe";
     break;
    case "crocodile":
     formActorId = "I2CjA2taEWxY03aR";
     break;
    case "aigle":
     formActorId = "Y0d0Hy8FcBNYC79u";
     break;

   ```

C'est terminé ! Vous voilà avec une macro fonctionnelle pour changer la forme de votre personnage sous 3 différentes formes !

### Ajoutez davantage de formes

Vous êtes ici limités à trois formes, si vous souhaitez en ajouter davantage prenez connaissance de la méthode proposée ci-dessous, sinon choisissez plutôt l'une des macros suivantes déjà pré-configurées :

* 1 forme : *[WildShape-1-shape.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/WildShape-1-shape.js)*
* 2 formes : *[WildShape-2-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/WildShape-2-shapes.js)*
* 3 formes : *[WildShape-3-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/WildShape-3-shapes.js)*
* 4 formes : *[WildShape-4-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/WildShape-4-shapes.js)*
* 5 formes : *[WildShape-5-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/WildShape-5-shapes.js)*
* 6 formes : *[WildShape-6-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/WildShape-6-shapes.js)*
* 7 formes : *[WildShape-7-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/WildShape-7-shapes.js)*
* 8 formes : *[WildShape-8-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/WildShape-8-shapes.js)*
* 9 formes : *[WildShape-9-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/WildShape-9-shapes.js)*

---

Si vous avez besoin d'ajouter encore une autre forme à la macro, vous pouvez alors vous y prendre de cette façon :

1. Vous trouverez en haut du code contenu dans la macro les options de la fenêtre qui apparaître lors de l'interaction avec la macro, pour rajouter une option supplémentaire, copiez simplement une ligne option comme celle-ci : ``` <option value="loup">Forme de Loup</option> ``` puis collez là après un retour à la ligne.

2. Modifiez ensuite la valeur de cette option et son nom. Si vous souhaitez ajouter par exemple une forme d'ours, cette nouvelle ligne devrait alors ressembler à quelque chose comme cela : ``` <option value="ours">Forme d'Ours</option> ```

3. Allez ensuite en bas du code contenu dans la macro, vous y trouverez les "cases". De la même manière que précédemment, copiez-coller une nouvelle case après un retour à la ligne :

   * Modifiez-y le nom de la case, par exemple ``` case "loup": ``` en ``` case "ours": ```

   * Remplacez-y ensuite l'ID par celui de votre feuille de personnage pour la forme d'Ours en question, par exemple ``` formActorId = "5K4RGyiivnSg1jFe"; ``` en ``` formActorId = "x82ahds4sazDF2s3"; ```

4. C'est fait, vous avez rajoutez une forme à la macro. Répétez alors l'opération autant de fois que nécessaire.

### Choisir de garder son équipement lors du changement de forme

Pour celà, rien de plus simple. Il vous suffit de changer la ligne suivante :

```javascript
actor.transformInto(formActor, {keepMental: true, mergeSaves: true, mergeSkills: true, keepBio: true});
```

par cette nouvelle ligne :

```javascript
actor.transformInto(formActor, {keepMental: true, mergeSaves: true, mergeSkills: true, keepItems: true, keepBio: true})
```
