# WildShape

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.7.8-informational)

* **Author**: MisterHims
* **Special thanks to**: tposney, Ikabodo, Archer, Crymic, Kandashi and many others :)
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.7.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [The Furnace](https://github.com/kakaroto/fvtt-module-furnace), [DAE](https://gitlab.com/tposney/dae), [Token Magic FX](https://github.com/Feu-Secret/Tokenmagic), [Midi-QOL](https://gitlab.com/tposney/midi-qol)
* **Macro Requirement(s)**: [WildShape] Transfer DAE Effects, Remove WildShape Effect

## Description

WildShape is a macro allowing to polymorph his token with the animations available from Token Magic FX. The actor's capabilities will thus be replaced by those of the desired shahpe and he will then see his token replaced.

The various DAE effects and Token Magic FX animations already present on your character will be preserved.

![WildShape-Demonstration-01](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/FR/images/dem_01.gif)

## Informations

* By default, you will transfer the following capabilities from your original form to your new form:
  * Mental ablities scores (Wisdom, Intelligence, Charisma)

  * Masteries of saving throws

  * Skills

  * Biography

  * Class features

You can yourself choose which capabilities to remove or add from the macro. More information on this at the bottom.

## Installation

*Note* :

* Foundry FVTT polymorph requires players to have rights to create new actors and tokens. You will need to allow them to "Create new characters" and "Create new tokens" from the Options configuration.

* You must also give the players the ownership rights to the actor of the desired shape.

**IMPORTANT** | Follow the steps below exactly, then you will be free to configure the macro to your needs after installation.

1. First, you need to import into Foundry VTT the two required external macros, save them with their respective names. Repeat the operation with the main "WildShape" Macro", you will make the necessary modifications thereafter.

    **[[WildShape] Transfer DAE Effects](<https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/%5BWildShape%5D%20Transfer%20DAE%20Effects.js>)**

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

    **[Remove WildShape Effect](<https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/Remove%20WildShape%20Effect.js>)**

    ```javascript
    setTimeout(function () {
        let WildShapeEffect = game.actors.getName(args[0]);
        let removeWildShapeEffect = WildShapeEffect.effects.find(i => i.data.label === args[1]);
        removeWildShapeEffect.delete();
    }, 3500);
    ```

2. Subsequently, you can check in the Midi-QOL configurations if the checkbox "Auto apply item effects to target" has been checked.

3. Get the Wild Shape 'item' from the SRD Compendium "Class Features" and import it to your item list.

4. Next, create a DAE effect named "WildShape Effect" into the Wild Shape item, then configure this effect as follows:
      * Check the "Suspended" mode
      * Go to the "Duration" tab then add a duration, for example 3600 seconds
      * Add a new attribute key with these values: macro.execute // CUSTOM // "WildShape Macro" // 20.
      * After validation, do not forget to also check "Enabled when equipped".

        *You can directly add the duration of the effect from the Details tab of the item if you have the About Time module*

5. Check if the target item is set to 'self' and place Wild Shape in the character sheet of your original form and of your new form.

6. Then let's take the "WildShape Macro" previously added to Foundry VTT, also accessible from the collection [WildShape.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/WildShape.js):

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

7. Replace "Name of your original form" at the beginning of the macro with the name of the main character (the original form).

8. Change the ID in line 10 to the ID of the main character.

9. Replace the ID in line 15 with the ID of the character whose shape you want to adopt.

    *A simple trick to finding out a character ID is to open an article from the Journal tab, switch it to edit mode, then drag and drop characters from the Characters tab inside.*

10. After making these changes, you should be able to get the macro to work. If not, you will find more information at the bottom of the page.

## Tips

You are free to configure your Wild Shape 'item' as yours needs, you can add for exemple the resource consumption (Attribute: resources.primary.values).

For a better animation, make the ratio size of your original token be the same as the new token form (0.5 and 0.5, 0.8 and 0.8, 1 and 1, ...).

## Configuration

### Customize animation

You can choose different animations from Magic Token FX. There are 9 different types of animations (the one installed by default is number 6):

1. Simple transition

2. Dreamy

3. Twist

4. Water drop

5. TV Noise

6. Morphing

7. Take off/Put on you disguise!

8. Wind

9. Hologram

Then you need to replace the type number 6 by the animation number you want to use. Can be found in two places in the WildShape macro:

```javascript

    filterType: "polymorph",
    filterId: "polymorphToNewForm",
    type: 6,
    padding: 70,
    magnify: 1,

```

   *[Line 40 to 44](https://github.com/MisterHims/FoundryVTT/blob/27c728b5fa370ed9c8eae554640ee5ce78bfdd18/ScriptMacros/WildShape/EN/WildShape.js#L42)*

```javascript

    filterType: "polymorph",
    filterId: "polymorphToOriginalForm",
    type: 6,
    padding: 70,
    magnify: 1,

```

   *[Line 85 to 89](https://github.com/MisterHims/FoundryVTT/blob/27c728b5fa370ed9c8eae554640ee5ce78bfdd18/ScriptMacros/WildShape/EN/WildShape.js#L87)*

### Customize the size of the start and end shape

By default, the size of the start and end shape is set to 1x1 square. You can change this size by changing the ```js width``` and ```js height``` values displayed in two places on the macro. The first is the size of the original shape, the second is the end shape.

```javascript
    // Adjusts them back the original size.
    // target.update({"width": 1, "height": 1,});
```

### Customize the skills to retain during the polymorph

You can remove and / or add different abilities that will be transferred to your new form during the polymorph:

* ```keepPhysical: true``` : Keep Physical Ablitiescores (Str, Dex, Con)
* ```keepMental: true``` : Keep Mental Ablitiescores (Wis, Int, Cha)
* ```keepSaves: true``` : Keep Savingthrow Proficiency of the Character
* ```keepSkills: true``` : Keep Skill Proficiency of the Character
* ```mergeSaves: true``` : Merge Savingthrow Proficiencys (take both) this will keep proficiencys of the character intact and also grant any extra proficiencys from the draged on actor
* ```mergeSkills: true``` : Merge Skill Proficiency (take both) this will keep proficiencys of the character intact and also grant any extra proficiencys from the draged on actor
* ```keepClass: true``` : Keep Proficiency bonus (leaves Class items in sheet) this will leave any Class "item" of the original actor in order to keep the original level and therefore Proficiency bonus
* ```keepFeats: true``` : Keep Features
* ```keepSpells: true``` : Keep Spells
* ```keepItems: true``` : Keep Equipment
* ```keepBio: true``` : Keep Biography
* ```keepVision: true``` : Keep Vision (Character and Token) if you want to preserve the exact way a token has vision on the map, this will do that. It will also not change the characters senses in the character sheet

## Frequently Asked Questions

Q: I don't understand, I did all the steps one by one after installing the required modules and it still doesn't work, why?

A: It's necessary to have previously correctly configured these different modules for the correct functioning of the macro. It's also required to have checked the box "Auto apply item to targets" in the configuration of Midi-QOL module.

***

Q: I experience a slight lag when animating my character, sometimes I also see a 1 second frame with my old shape appearing during the transition. I don't know how to solve this issue, what to do?

A: Depending on the configuration and optimization of the effects performed by your browser, you may need to make some adjustments on the macro when you encounter the following lines:

```javascript

    setTimeout(function () { token.TMFXdeleteFilters("polymorphToNewForm") }, 1800);

```

   *[Line 63](https://github.com/MisterHims/FoundryVTT/blob/27c728b5fa370ed9c8eae554640ee5ce78bfdd18/ScriptMacros/WildShape/EN/WildShape.js#L63)*

```javascript

    setTimeout(function () { token.TMFXdeleteFilters("polymorphToOriginalForm") }, 1800);

```

   *[Line 105](https://github.com/MisterHims/FoundryVTT/blob/27c728b5fa370ed9c8eae554640ee5ce78bfdd18/ScriptMacros/WildShape/EN/WildShape.js#L105)*

You will then have to play on the value (1800 in this precise case) and reduce or increase this number. This code is used to stop the animation loop, so it is necessary to keep it but you are free to change its value.

## Upcoming improvements

I plan to improve this macro to make it a module. This will allow a much easier installation and will also allow you to quickly create and configure different polymorphs (choice of skills to keep, the name of the macro, the name of the effect, the size of the characters, the animation type, etc.)