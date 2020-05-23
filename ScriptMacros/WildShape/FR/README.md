# WildShape

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: DocQuantic, Foundry VTT Community
* **Traduction**: MisterHims
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: None

## Description

WildShape est une macro permettant de rapidement changer la forme de votre druide, les statistiques du druide seront ainsi remplacées par celles de la bête et celui-ci verra alors son token remplacé. Cette macro est ainsi particulièrement utile pour les druides souhaitant utiliser leur Forme sauvage.

## Installation

Attention ! La macro ne fonctionnera certainement pas après son installation, il vous faudra alors y faire quelques modification afin de là rendre fonctionnelle et de l'adapter à vos besoins. Mais ne vous découragez pas, c'est bien plus simple que ça en a l'air !

1. Copiez le code ci-dessous ou accédez-y depuis le fichier [WildShape-without-consum.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-without-consum.js) :

   ```javascript

   let changeForm = false;
   let messageContent;
   actor = actor ? actor : game.user.character;
   if (!token && game.user.character) token = actor.getActiveTokens()[0];
   let characterName = actor.data.name;
   let characterToken = actor.data.token;
   let characterId = characterToken.actorId;
   let formActorId;
   let formActor;
   let startScene = canvas.scene.id;
   let x = token._validPosition.x;
   let y = token._validPosition.y;
   let d = new Dialog({
     title: "Forme sauvage",
     content: `
        <form>
        <div class="form-group">
            <label>Choix de la forme :</label>
            <select id="form-type" name="form-type">
            <option value="forme-originale">Forme originale</option>
            <option value="forme-ours">Forme d'Ours</option> 
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
           case "forme-originale":
             formActorId = "vSlsRdK5e1gJcIhg";
             break;
           case "forme-ours":
             formActorId = "k29xejd9bksJF9t2";
             break;
         }
         formActor = game.actors.get(formActorId);
         game.macros.getName("deleteToken")?.execute(startScene, token.id);
         let formToken = formActor.data.token;
         game.macros.getName("createToken")?.execute(startScene, x, y, formToken);
       }
     }
   }).render(true);

   ```

   *[WildShape-without-consum.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape-without-consum.js)*

2. Allez maintenant sur Foundry VTT puis cliquez sur un emplacement libre de la barre de macros afin d'en créer une nouvelle.

3. Sélectionnez le type "Script" puis collez le code à l'intérieur.

4. Donnez-lui le nom de votre choix, par exemple : ``` WildShape ``` et sauvegardez la macro.

## Configuration

Après avoir effectué l'installation de WildShape, vous devez là configurer.

1. Dans un premier temps, vous devez disposer de la fiche du personnage dont vous souhaitez y faire changer de forme. Vérifiez bien que celui-ci dispose de l'aptitude Forme sauvage dans sa fiche. Si ce n'est pas le cas, vous devrez l'ajouter depuis le compendium "Capacités des Classes".

2. Récupérez l'ID alors du personnage en question, pour cela il existe plusieurs méthodes mais je vous propose celle-ci afin de rester sur FoundryVTT :
    * Ouvrez ou créez un nouvel article dans votre journal et passez en mode édition (en cliquant sur l'icône représentant un carré avec un crayon).
    * Ouvrez le menu Personnages puis faites un glisser-déposer de la fiche du personnage à l'intérieur, vous devriez obtenir quelque chose comme cela : ``` @Actor[vSlsRdK5e1gJcIhg]{NomDuPersonnage} ```, l'ID de votre personnage se trouve alors entre les crochets, c'est à dire ``` vSlsRdK5e1gJcIhg ``` dans ce cas présent.
    * Notez cet ID, il vous permettra de pouvoir récupérer votre forme originale.

3. Créez les fiches personnages des différentes formes que vous souhaitez ajouter à la macro. Pour cela, je vous propose de directement utiliser une solution intégrée à FoundryVTT :
    * Faites un glisser-déposer de la bête dont vous souhaitez adopter la forme depuis le compendium "Monstres" vers la fiche du personnage précédemment créée à l'étape 1.
    * Une fenêtre s'ouvre alors, cochez les cases "Conserver l'équipement", "Conserver le bonus de maîtrise", "Conservez les aptitudes",  "Conserver les sorts", "Conservez sa biographie", "Garder la vision" et "Transformer tous les tokens liés". De cette façon, une nouvelle fiche personnage a été créée dans votre liste du menu Personnages, vous pouvez alors là modifier à votre guise.
    * Récupérez alors l'ID de cette nouvelle fiche de personnage de la même manière que vu précédemment et notez-là.

4. Après avoir récupérer les différents IDs nécessaires à vos besoins, vous devrez alors modifier le code de la macro afin d'y ajouter ces IDs. Dans le bout de code suivant, remplacez alors ``` vSlsRdK5e1gJcIhg ``` par l'ID du personnage dont vous souhaitez changer la forme :

   ```javascript

    case "forme-originale":
     formActorId = "vSlsRdK5e1gJcIhg";
     break;

   ```

5. Répétez l'opération avec l'ID utilisée pour la forme d'ours par exemple en remplaçant l'ID à la "case" suivante :

   ```javascript

    case "forme-ours":
     formActorId = "k29xejd9bksJF9t2";
     break;

   ```

Vous êtes ici limités à deux formes (dont la forme originale), si vous souhaitez en ajouter davantage prenez connaissance de la méthode ci-dessous : 

### Ajoutez davantage de formes

Si vous avez besoin d'ajouter une autre forme à la macro, vous pouvez alors vous y prendre de cette façon :

1. Vous trouverez en haut du code contenu dans la macro les options de la fenêtre qui apparaître lors de l'interaction avec la macro, pour rajouter une option supplémentaire, copiez simplement une ligne option comme celle-ci : ``` <option value="forme-ours">Forme d'Ours</option> ``` puis collez là après un retour à la ligne.

2. Modifiez ensuite la valeur de cette option et son nom. Si vous souhaitez ajouter par exemple une forme d'aigle, cette nouvelle ligne devrait alors ressembler à quelque chose comme cela : ``` <option value="forme-aigle">Forme d'Aigle</option> ```

3. Allez ensuite en bas du code contenu dans la macro, vous y trouverez les "cases". De la même manière que précédemment, copiez-coller une nouvelle case après un retour à la ligne :

   * Modifiez-y le nom de la case, par exemple ``` case "forme-ours": ``` en ``` case "forme-aigle": ```

   * Remplacez-y ensuite l'ID par celui de votre feuille de personnage pour la forme d'Aigle en question, par exemple ``` formActorId = "k29xejd9bksJF9t2"; ``` en ``` formActorId = "x82ahds4sazDF2s3"; ```

4. C'est fait, vous avez rajoutez une forme à la macro. Répétez alors l'opération autant de fois que nécessaire.

## Améliorations à venir

* Proposer plusieurs macro-types par nombre de formes souhaitées, afin de rendre plus facile sa configuration.

* Ajouter la possibilité d'y inclure la consommation de ressources.

* Améliorer la macro afin de remplacer le personnage dans la liste de déroulement du combat (Combat Tracker).