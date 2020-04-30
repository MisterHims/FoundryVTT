let updates = [];
let consumed = "";
let consumableName = args[0];
let item = actor.items.find(i => i.name === consumableName);
if (!item) {
    ui.notifications.warn(`Aucun consommable nommé "${consumableName}" n'a été trouvé`);
    return;
}
if (item.data.data.quantity < 1) {
    ui.notifications.warn(`Vous n'avez plus de ${consumableName} restante(s)`);
} else {
    updates.push({ "_id": item._id, "data.quantity": item.data.data.quantity - 1 });
    consumed += `${item.data.data.quantity - 1} ${consumableName}(s) restante(s)<br>`;
    //AudioHelper.play({ src: "sounds/items-use/lantern.mp3", volume: 0.8, autoplay: true, loop: false }, true);
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
