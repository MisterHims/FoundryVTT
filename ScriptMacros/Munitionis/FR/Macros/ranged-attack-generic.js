let updates = [];
let consumed = "";
if (!actor) {
    ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
    return;
}

let weaponName = args[0];
let consumableName = args[1];
let item = actor.items.find(i => i.name === consumableName);

if (!item) {
    ui.notifications.warn(`Aucune munition nommée "${consumableName}" n'a été trouvée`);
    return;
}

if (item.data.data.quantity < 1) {
    ui.notifications.warn(`${game.user.name}, vous n'avez pas assez de ${consumableName} restante(s)`);
} else {
    updates.push({ "_id": item._id, "data.quantity": item.data.data.quantity - 1 });
    consumed += `${item.data.data.quantity - 1} ${consumableName}(s) restante(s)<br>`;

    MinorQOL.doRoll(event, weaponName, { type: "weapon", versatile: false });
    //AudioHelper.play({ src: "sounds/weapons-impacts/Arrow 1.mp3", volume: 0.8, autoplay: true, loop: false }, true);
    let ammoDic = actor.getFlag("world", "fired-arrow");
    let ammoFired = 1;

    if (ammoDic) {
        console.log(ammoDic);
        ammoFired = ammoDic.ammoAmount + 1 || 1;
    }

    let ammoFiredInfo = { ammoName: consumableName, ammoAmount: ammoFired };
    actor.setFlag("world", "fired-arrow", ammoFiredInfo);
}

if (updates.length > 0) {
    actor.updateEmbeddedEntity("OwnedItem", updates);

    ChatMessage.create({
        user: game.user._id,
        speaker: { actor: actor, alias: actor.name },
        content: consumed,
        type: CONST.CHAT_MESSAGE_TYPES.OTHER
    });
}
