let itemName = args[0];
let item = actor.items.find(i => i.name === itemName);
if (!item) {
    ui.notifications.warn(`Aucun objet nommé ${itemName} n'a été trouvé`);
    return;
}
ui.notifications.info(item.data.data.equipped ? `${itemName} a été équipé` : `${itemName} a été déséquipé`);
actor.updateOwnedItem({ _id: item.id, "data.equipped": !item.data.data.equipped });