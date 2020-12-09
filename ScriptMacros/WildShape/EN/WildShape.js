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