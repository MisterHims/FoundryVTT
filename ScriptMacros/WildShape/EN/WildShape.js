///////////////////////////////////////////////////////////////
// Requires DAE, MagicTokenFX and Midi-QOL correctly configured (check 'Auto apply item to targets')
// Requires two external macros:
// '[WildShape] Transfer DAE Effects' and 'Remove WildShape Effect'
// These macros can be found in comments at the bottom
///////////////////////////////////////////////////////////////

// NOTE:
// Foundry VTT polymorph requires the player to have rights to create new actors and tokens
// You must also give the players the rights to the actor of the desired shape

// INSTRUCTIONS:
// /!\ Do exactly as shown for the next steps, you will be able to configure the macro as you wish thereafter
// 1. First, you need to get the 'Wild Shape' item from the SRD Compendium or any other item.
// 2. Create an effect named 'WildShape Effect' from the 'Wild Shape' item and put it in 'suspended' and 'enabled when equiped'
// 3. Add the following key: macro.execute // CUSTOM // "WildShape Macro" // 20
// 4. Add a duration, from the item itself, or from the effect. In addition, check that your item has as a target 'self'
// 5. Install this new item in the inventory of your original actor form and new actor form (the form you would take)
// 6. Create a new macro (name it "WildShape Macro")
// 7. Create the two new external macros that you will find at the bottom with their names as indicated
// 8. Replace "Randal" with the name of your original actor
// 9. Replace the ID in line 39 by your original actor ID
// 10. Replace the ID in line 44 by your new actor ID
// 11. Add the content below into your 'WhilShape Macro'

// TIPS:
// - You can add resource consumption inside your original actor activable (for example Attribute => resources.primary.values)
// - For a better animation, make the ratio size of your original token to be the same as the new token form

// Name of your original actor form
let actorOriginalFormName = "Randal";

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
    setTimeout(function () { token.TMFXdeleteFilters("polymorphToNewForm");; }, 1900);

    // Polymorph into the new form with delay for the start animation
    setTimeout(function () { actorPolymorphism(); }, 1500);

    // Transfer all effects from original actor to new actor (except the WildShape effect)
    let transferDAEeffectsWithoutWildShape = game.macros.getName("[WildShape] Transfer DAE Effects");
    // With delay for the animation time
    setTimeout(function () { transferDAEeffectsWithoutWildShape.execute(wildShapeEffectName); }, 2550);
    // Choose the token size of the new form
    target.update({ "width": 1, "height": 1, });


    // If actor is already polymorphed, remove the WildShape effect from the original actor to launch the return animation
} else if (args[0] === "off") {
    removeWildShapeEffect.execute(actorOriginalFormName, wildShapeEffectName);

    // Starts the return animation if the actor is polymorphed
} else if (actor.data.flags.dnd5e?.isPolymorphed) {
    token.TMFXhasFilterId("polymorphToOriginalForm");
    let polymorphAnimation = function () {
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
        setTimeout(function () { token.TMFXdeleteFilters("polymorphToOriginalForm");; }, 1900);
        // Revert to original form with delay for the return animation
        setTimeout(function () { actor.revertOriginalForm(); }, 1500);
        // That line stabilise the return animation but remove all token's filters!
        //setTimeout(function () { TokenMagic.deleteFiltersOnSelected(); }, 1500);
        // Adjusts them back the original size.
        //target.update({"width": 1, "height": 1,});

    }
    polymorphAnimation();
}