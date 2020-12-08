if (actor.data.flags.dnd5e?.isPolymorphed) {
    let originalActor = game.actors.get(actor.data.flags.dnd5e.originalActor);
    // Put your effects to exclude below between the brackets
    let effectsData = originalActor.effects.filter(ef =>
        ![args[0]].includes(ef.data.label)
    ).map(ef => ef.data);
    actor.createEmbeddedEntity("ActiveEffect", effectsData)
}