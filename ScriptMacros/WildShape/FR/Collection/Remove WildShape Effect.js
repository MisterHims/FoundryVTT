setTimeout(function () {
    let WildShapeEffect = game.actors.getName(args[0]);
    let removeWildShapeEffect = WildShapeEffect.effects.find(i => i.data.label === args[1]);
    removeWildShapeEffect.delete();
}, 3500);