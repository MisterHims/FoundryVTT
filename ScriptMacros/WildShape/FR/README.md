# WildShape

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: DocQuantic, Foundry VTT Community
* **Traduction**: MisterHims
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [The Furnace](https://github.com/kakaroto/fvtt-module-furnace)

## Description

WildShape est une macro permettant de rapidement changer la forme du personnage sélectionné puis de revenir sous sa forme originale. Si le personnage n'est pas sélectionné, une notification apparaîtra le cas échéant. Les statistiques du druide seront ainsi remplacées par celles de la bête et celui-ci verra alors son token remplacé. De plus, la macro prend en compte le coût en ressource de l'action Forme sauvage. C'est une macro particulièrement utile pour les druides souhaitant utiliser leur Forme sauvage.

![WildShape-Demonstration-01](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/images/dem_01.gif)

## Installation

Attention ! La macro ne fonctionnera certainement pas après son installation, il vous faudra alors y faire quelques modifications afin de là rendre fonctionnelle et de l'adapter à vos besoins. Mais ne vous découragez pas, c'est bien plus simple que ça en a l'air.

1. Copiez le code ci-dessous ou accédez-y depuis le fichier [WildShape.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape.js) :

   ```javascript

   if (!actor) {
       ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
       return;
   }
   let changeForm = false;
   actor = actor ? actor : game.user.character;
   let formActorId;
   let formActor;
   let cost = 1;
   if (actor.isPolymorphed) {
       actor.revertOriginalForm();
       return;
   }
   let remainingShapes = actor.data.data.resources.primary.value;
   if (remainingShapes < 1) return;
   let d = new Dialog({
       title: "Forme sauvage",
       content: `
        <form>
        <div class="form-group">
            <label>Choix de la forme sauvage :</label>
            <select id="form-type" name="form-type">
            <option value="loup">Forme de Loup</option>
            <option value="crocodile">Forme de Crocodile</option>
            <option value="aigle">Forme d'Aigle</option>
            </select>
        </div>
        </form>
        `,
       buttons: {
           yes: {
               icon: '<i class="fas fa-check"></i>',
               label: "Lancer",
               callback: () => changeForm = true
           },
           no: {
               icon: '<i class="fas fa-times"></i>',
               label: "Annuler"
           }
       },
       default: "yes",
       close: html => {
           if (changeForm) {
               let formType = html.find('[name="form-type"]')[0].value || "none";
               switch (formType) {
                   case "loup":
                       formActorId = "ID_du_personnage";
                       break;
                   case "crocodile":
                       formActorId = "ID_du_personnage";
                       break;
                   case "aigle":
                       formActorId = "ID_du_personnage";
                       break;
               }
               formActor = game.actors.get(formActorId);
               actor.data.data.resources.primary.value = remainingShapes - cost;
               actor.transformInto(formActor, { keepMental: true, mergeSaves: true, mergeSkills: true, keepBio: true });
           }
       }
   }).render(true);

   ```

   *[WildShape.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape.js)*

2. Allez maintenant sur Foundry VTT puis cliquez sur un emplacement libre de la barre de macros afin d'en créer une nouvelle.

3. Sélectionnez le type "Script" puis collez le code à l'intérieur.

4. Donnez-lui le nom de votre choix, par exemple : ``` Wild Shape ``` et sauvegardez la macro.

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

    * Ouvrez le menu Personnages puis faites un glisser-déposer de la fiche du personnage de la forme, vous devriez obtenir quelque chose comme cela : ``` @Actor[vSlsRdK5e1gJcIhg]{Erendil le Loup} ```, l'ID se trouve alors entre les crochets, c'est à dire ``` vSlsRdK5e1gJcIhg ``` dans ce cas présent.

    * Notez alors cet ID quelque part, il vous permettra d'ajouter cette forme à la macro.

      ![WildShape-RécupérerIDs](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/images/dem_id.gif)

4. Après avoir récupérer les différents IDs nécessaires à vos besoins des différentes fiches personnages (par exemple : Erendil le Loup, Erendil le Crocodile et Erendil l'Aigle), vous devrez alors modifier le code de la macro afin d'y ajouter ces IDs. Dans le bout de code suivant, remplacez alors ``` ID_du_personnage ``` par l'ID du personnage dont vous souhaitez changer la forme :

   ```javascript

    case "loup":
     formActorId = "ID_du_loup";
     break;

   ```

5. Vous devriez obtenir quelque chose comme ça :

   ```javascript

    case "loup":
     formActorId = "5K4RGyiivnSg1jFe";
     break;

   ```

6. Répétez l'opération avec l'ID utilisé pour les formes de Crocodile et d'Aigle, vous devriez obtenir quelque chose comme ça :

   ```javascript

    case "crocodile":
     formActorId = "I2CjA2taEWxY03aR";
     break;
    case "aigle":
     formActorId = "Y0d0Hy8FcBNYC79u";
     break;

   ```

Vous êtes ici limités à trois formes, si vous souhaitez en ajouter davantage, prenez connaissance de la méthode proposée dans la section "Ajouter davantage de formes" ou choisissez plutôt l'une des macros suivantes :

* 1 forme : *[WildShape-1-shape.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-1-shape.js)*
* 2 formes : *[WildShape-2-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-2-shapes.js)*
* 3 formes : *[WildShape-3-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-3-shapes.js)*
* 4 formes : *[WildShape-4-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-4-shapes.js)*
* 5 formes : *[WildShape-5-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-5-shapes.js)*
* 6 formes : *[WildShape-6-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-6-shapes.js)*
* 7 formes : *[WildShape-7-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-7-shapes.js)*
* 8 formes : *[WildShape-8-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-8-shapes.js)*
* 9 formes : *[WildShape-9-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-9-shapes.js)*

### Ajoutez davantage de formes

Si vous avez besoin d'ajouter une autre forme à la macro, vous pouvez alors vous y prendre de cette façon :

1. Vous trouverez en haut du code contenu dans la macro les options de la fenêtre qui apparaître lors de l'interaction avec la macro, pour rajouter une option supplémentaire, copiez simplement une ligne option comme celle-ci : ``` <option value="forme-ours">Forme d'Ours</option> ``` puis collez là après un retour à la ligne.

2. Modifiez ensuite la valeur de cette option et son nom. Si vous souhaitez ajouter par exemple une forme d'aigle, cette nouvelle ligne devrait alors ressembler à quelque chose comme cela : ``` <option value="forme-aigle">Forme d'Aigle</option> ```

3. Allez ensuite en bas du code contenu dans la macro, vous y trouverez les "cases". De la même manière que précédemment, copiez-coller une nouvelle case après un retour à la ligne :

   * Modifiez-y le nom de la case, par exemple ``` case "forme-ours": ``` en ``` case "forme-aigle": ```

   * Remplacez-y ensuite l'ID par celui de votre feuille de personnage pour la forme d'Aigle en question, par exemple ``` formActorId = "k29xejd9bksJF9t2"; ``` en ``` formActorId = "x82ahds4sazDF2s3"; ```

4. C'est fait, vous avez rajoutez une forme à la macro. Répétez alors l'opération autant de fois que nécessaire.
