# WildShape

![Foundry Badge](https://img.shields.io/badge/Foundry-0.7.6-informational)

* **Author**: MisterHims
* **Remerciements**: tposney, Ikabodo, Archer, Crymic, Kandashi et plein d'autres :)
* **Version**: 1.0.0 Alpha
* **Foundry VTT Compatibility**: 0.7.65+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [The Furnace](https://github.com/kakaroto/fvtt-module-furnace), [DAE](https://gitlab.com/tposney/dae), [Token Magic FX](https://github.com/Feu-Secret/Tokenmagic), [Midi-QOL](https://gitlab.com/tposney/midi-qol)
* **Macro Requirement(s)**: [WildShape] Transfer DAE Effects, Remove WildShape Effect

## Description

WildShape est une macro permettant de polymorphe son personnage puis de revenir sous sa forme originale, le tout possible avec les animations disponibles de Token Magic FX. Les statistiques du personnage seront ainsi remplacées par celles de la forme souhaitée et celui-ci verra alors son token remplacé.

Les différents effets de DAE et les animations de Token Magic FX déjà présentes sur votre personnage seront conservés.

![WildShape-Demonstration-01](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/images/dem_01.gif)

## Informations

* Par défaut, vous transférerez les aptitudes suivantes de votre forme originale à votre nouvelle forme :
  * Scores d'ablités mentales (Sagesse, Intelligence, Charisme)

  * Maitrîse des jets de sauvegarde

  * Compétences

  * Biographie

  * Capacités de la classe

Vous pouvez vous-même choisir les aptitudes à enlever ou à ajouter depuis la macro. Plus d'informations à ce sujet en bas de page.

## Installation

[![Rapide vidéo sur Comment installer la macro](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/images/how-to-install-the-wildshape-macro.jpg)](https://www.youtube.com/watch?v=_2EZ79JbtFQ)

*A noter* :

* Le polymorph de Foundry VTT requiert que les joueurs soient autorisés à le faire. Vous devrez pour cela les autoriser à "Créer de nouveaux personnages" et "Créer de nouveaux tokens" depuis la Configuration des options.

* Vous devrez également ajouter les droits de possession du personnage dont vous souhaitez faire adopter la forme à vos joueurs.

**IMPORTANT** | Suivez exactement les étapes ci-dessous, vous serez ensuite libre de configurer la macro à vos besoins après son installation.

1. Premièrement, vous devez importer dans Foundry VTT les deux macros externes nécessaires, sauvegardez-les avec leurs noms respéctifs. Répetez l'opération avec la macro principale "WildShape Macro", vous-y effectuerez les modifications nécessaires par la suite.

    **[[WildShape] Transfer DAE Effects](<https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/%5BWildShape%5D%20Transfer%20DAE%20Effects.js>)**

    ```javascript
    if (actor.data.flags.dnd5e?.isPolymorphed) {
        let originalActor = game.actors.get(actor.data.flags.dnd5e.originalActor);
        // Put your effects to exclude below between the brackets
        let effectsData = originalActor.effects.filter(ef =>
            ![args[0]].includes(ef.data.label)
        ).map(ef => ef.data);
        actor.createEmbeddedEntity("ActiveEffect", effectsData)
    }
    ```

    **[Remove WildShape Effect](<https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/Collection/Remove%20WildShape%20Effect.js>)**

    ```javascript
    setTimeout(function () {
        let WildShapeEffect = game.actors.getName(args[0]);
        let removeWildShapeEffect = WildShapeEffect.effects.find(i => i.data.label === args[1]);
        removeWildShapeEffect.delete();
    }, 3500);
    ```

2. Par la suite, vous pouvez aller vérifier dans les configurations de Midi-QOL si la case "Auto apply item effects to target" à bien été cochée.

3. Récupérez la compétence Forme Sauvage depuis le Compendium SRD et importez-là a votre liste d'objets.

4. Créez ensuite un effet DAE nommé "WildShape Effect" sur la Forme Sauvage puis paramétrez cet effet de la façon suivante :
    * Cochez le mode "Suspended"
    * Allez dans l'onglet "Durée" puis ajoutez-y une durée, par exemple 3600 secondes 
    * Ajoutez une nouvelle clé d'attribut avec ces valeurs : macro.execute // CUSTOM // "WildShape Macro" // 20.
    * Après validation, n'oubliez pas de cocher également "Enabled when equiped".

        *Vous pouvez directement ajouter la durée de l'effet depuis l'onglet Détails de l'objet si vous disposez du module About Time*

5. Vérifiez si la cible de la Forme Sauvage est bien reglée sur "soi-même" puis placez-là dans la fiche personnage de votre forme de départ (forme originale) et de votre forme d'arrivée (nouvelle forme).

6. Reprenons ensuite la "WildShape Macro" précedemment ajoutée à Foundry VT, également accessible depuis la collection [WildShape.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/WildShape.js)) :

   ```javascript

    // Name of your original actor form
    let actorOriginalFormName = "Name of your original form";

    // Name of your WildShape Effect
    let wildShapeEffectName = "WildShape Effect";

    // Get the Actor name from the original form
    let getOriginalActorForm = game.actors.getName(actorOriginalFormName);
    // Get Actor ID from the original form
    let actorOriginalFormId = game.actors.get("JmJGW3LivaKbKZYm");
    // Get Image's Token associated with the original actor form
    let actorOriginalFormImagePath = actorOriginalFormId.data.token.img;

    // Get Actor ID from the new form
    let actorNewFormId = game.actors.get("6tag3KViMYOHciFe");
    // Get Image's Token associated with the new actor form
    let actorNewFormImagePath = actorNewFormId.data.token.img;

    let target = canvas.tokens.controlled[0];

    // Declare my polymorph function
    let actorPolymorphism = async function () {
        // For actorNewFormID, the ratio's Token should be at the same scale of the original form
        actor.transformInto(actorNewFormId, {
            keepMental: true,
            mergeSaves: true,
            mergeSkills: true,
            keepBio: true,
            keepClass: true,
        });
    }

    let removeWildShapeEffect = game.macros.getName("Remove WildShape Effect");

    // If actor is not already polymorphed, remove its effect and launch polymorph
    if (!actor.data.flags.dnd5e?.isPolymorphed) {
        removeWildShapeEffect.execute(actorOriginalFormName, wildShapeEffectName);
        token.TMFXhasFilterId("polymorphToNewForm");
        let paramsStart = [{
            filterType: "polymorph",
            filterId: "polymorphToNewForm",
            type: 6,
            padding: 70,
            magnify: 1,
            imagePath: actorNewFormImagePath,
            animated:
            {
                progress:
                {
                    active: true,
                    animType: "halfCosOscillation",
                    val1: 0,
                    val2: 100,
                    loops: 1,
                    loopDuration: 1000
                }
            },
            autoDisable: false,
            autoDestroy: false
        }];
        //TokenMagic.addFiltersOnSelected(paramsStart, true);
        TokenMagic.addUpdateFilters(target, paramsStart);
        setTimeout(function () { token.TMFXdeleteFilters("polymorphToNewForm") }, 1800);

        // Polymorph into the new form with delay for the start animation
        setTimeout(function () { actorPolymorphism(); }, 1500);

        // Transfer all effects from original actor to new actor (except the WildShape effect)
        let transferDAEeffectsWithoutWildShape = game.macros.getName("[WildShape] Transfer DAE Effects");
        // With delay for the animation time
        setTimeout(function () { transferDAEeffectsWithoutWildShape.execute(wildShapeEffectName); }, 3000);
        // Choose the token size of the new form
        // target.update({ "width": 1, "height": 1, });


        // If actor is already polymorphed, remove the WildShape effect from the original actor to launch the return animation
    } else if (args[0] === "off") {
        removeWildShapeEffect.execute(actorOriginalFormName, wildShapeEffectName);

        // Starts the return animation if the actor is polymorphed
    } else if (actor.data.flags.dnd5e?.isPolymorphed) {
        token.TMFXhasFilterId("polymorphToOriginalForm");
            let paramsBack =
                [{
                    filterType: "polymorph",
                    filterId: "polymorphToOriginalForm",
                    type: 6,
                    padding: 70,
                    magnify: 1,
                    imagePath: actorOriginalFormImagePath,
                    animated:
                    {
                        progress:
                        {
                            active: true,
                            animType: "halfCosOscillation",
                            val1: 0,
                            val2: 100,
                            loops: 1,
                            loopDuration: 1000
                        }
                    }
                }];
            token.TMFXaddUpdateFilters(paramsBack);
            setTimeout(function () { token.TMFXdeleteFilters("polymorphToOriginalForm") }, 1800);
            // Revert to original form with delay for the return animation
            setTimeout(function () { actor.revertOriginalForm(); }, 1500);
            // Adjusts them back the original size.
            // target.update({"width": 1, "height": 1,});

        }

   ```

7. Remplacez "Name of your original form" au début par le nom du personnage principal (de la forme originale).

8. Remplacez l'ID de la ligne 10 par l'ID du personnage principale

9. Remplacez l'ID de la ligne 15 par l'ID du personnage dont vous souhaitez faire adopter la forme

    *Une astuce simple pour connaitre l'ID d'un personnage consiste à ouvrir un article depuis l'onglet Journal, de le passer en mode édition, puis de faire un glisser-déposer des personnages depuis l'onglet Personnages à l'intérieur.*

Une fois ces changements effectués, cela devrai fonctionner. Si ce n'est pas le cas, vous trouverez davantage d'informations en bas de page.

## Conseils

Vous êtes libre de configurer la Forme Sauvage à vos besoins, vous pouvez par exemple ajouter la consommation de ressources à l'intérieur de votre Forme Sauvage (Attribute : resources.primary.values).

Pour une meilleure animation, faites en sorte que le ratio-taille associé aux tokens de votre forme originale et de votre nouvelle forme soient les mêmes (0.5 et 0.5, 0.8 et 0.8, 1 et 1, etc.)

## Configuration

### Personnaliser l'animation

Il vous est possible de choisir différentes animations grâce à Magic Token FX. Il existe 9 types d'animations différentes (celle installée par défaut est la numéro 6) :

1. Simple transition

2. Dreamy

3. Twist

4. Water drop

5. TV Noise

6. Morphing

7. Take off/Put on you disguise!

8. Wind

9. Hologram

Vous devrez alors remplacer le numéro de l'animation que vous souhaitez utiliser par le type numéro 6 présent à deux endroits dans la macro WildShape :

```javascript

    filterType: "polymorph",
    filterId: "polymorphToNewForm",
    type: 6,
    padding: 70,
    magnify: 1,

```

   *[Ligne 40 à 44](https://github.com/MisterHims/FoundryVTT/blob/ed8a96ecd8fc509820b8328cdb2e0fe8869687c0/ScriptMacros/WildShape/FR/WildShape.js#L42)*

```javascript

    filterType: "polymorph",
    filterId: "polymorphToOriginalForm",
    type: 6,
    padding: 70,
    magnify: 1,

```

   *[Ligne 85 à 89](https://github.com/MisterHims/FoundryVTT/blob/ed8a96ecd8fc509820b8328cdb2e0fe8869687c0/ScriptMacros/WildShape/FR/WildShape.js#L87)*

### Personaliser la taille de sa forme de départ et d'arrivée

Par défaut, la taille de la forme de départ et d'arrivée est définie à 1x1 carré. Il vous est possible de modifier cette taille en changeant les valeurs ```js width``` et ```js height``` affichés à deux endroits sur la macro. La première correspond à la taille de la forme originale, la seconde à la forme d'arrivée.

```javascript
    // Adjusts them back the original size.
    // target.update({"width": 1, "height": 1,});
```

### Personaliser les aptitudes à conserver lors du polymorph

Il vous est possible d'enlever et/ou d'ajouter différentes aptitudes qui seront transférer à votre nouvelle forme lors du polymorph :

* ```keepPhysical: true``` Keep Physical Ablitiescores (Str, Dex, Con)
* ```keepMental: true``` Keep Mental Ablitiescores (Wis, Int, Cha)
* ```keepSaves: true``` Keep Savingthrow Proficiency of the Character
* ```keepSkills: true``` Keep Skill Proficiency of the Character
* ```mergeSaves: true``` Merge Savingthrow Proficiencys (take both) this will keep proficiencys of the character intact and also grant any extra proficiencys from the draged on actor
* ```mergeSkills: true``` Merge Skill Proficiency (take both) this will keep proficiencys of the character intact and also grant any extra proficiencys from the draged on actor
* ```keepClass: true``` Keep Proficiency bonus (leaves Class items in sheet) this will leave any Class "item" of the original actor in order to keep the original level and therefore Proficiency bonus
* ```keepFeats: true``` Keep Features
* ```keepSpells: true``` Keep Spells
* ```keepItems: true``` Keep Equipment
* ```keepBio: true``` Keep Biography
* ```keepVision: true``` Keep Vision (Character and Token) if you want to preserve the exact way a token has vision on the map, this will do that. It will also not change the characters senses in the character sheet

## Foire aux Questions

Q : Je ne comprend pas, j'ai fait toutes les étapes une à une après avoir installé les modules requis et cela ne fonctionne toujours pas, pourquoi ?

R : Il est nécessaire d'avoir au préalable correctement configuré ces différents modules pour le bon fonctionnement de la macro. Il est également requis d'avoir coché la case "Auto apply item effects to targets" dans la configuration de Midi-QOL

***

Q : Je rencontre un léger décalage lors de l'animation de mon personnage, il m'arrive aussi des fois de voir une image d'une seconde avec mon ancienne forme qui apparait durant la transition. Je ne sais pas comment résoudre ce problème, que faire ?

R : En fonction de la configuration et de l'optimisation des effets réalisés par votre navigateur, il est possible de devoir faire quelques ajustements sur la macro lorsque vous rencontrerez les lignes suivantes :

```javascript

    setTimeout(function () { token.TMFXdeleteFilters("polymorphToNewForm") }, 1800);

```

   *[Ligne 63](https://github.com/MisterHims/FoundryVTT/blob/ed8a96ecd8fc509820b8328cdb2e0fe8869687c0/ScriptMacros/WildShape/FR/WildShape.js#L63)*

```javascript

    setTimeout(function () { token.TMFXdeleteFilters("polymorphToOriginalForm") }, 1800);

```

   *[Ligne 105](https://github.com/MisterHims/FoundryVTT/blob/ed8a96ecd8fc509820b8328cdb2e0fe8869687c0/ScriptMacros/WildShape/FR/WildShape.js#L105)*

Vous devrez alors jouer sur la valeur (1800 dans ce cas précis) et réduire ou augmenter ce nombre. Ce code permet de stopper la boucle d'animation, il est donc néccesaire de le conserver mais vous êtes libre d'y changer sa valeur.

## Améliorations à venir

Je prévois d'améliorer cette macro afin d'en faire un module. Cela permettra une installation bien plus facile et permettra également de rapidement créer et configurer différents polymorphs (choix des aptitudes à conserver, du nom de la macro, du nom de l'effet, de la taille des personnages, de l'animation, etc.)