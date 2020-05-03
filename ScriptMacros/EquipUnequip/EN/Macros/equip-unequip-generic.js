let itemName = args[0];
let item = actor.items.find(i => i.name === itemName);
if (!item) {
    ui.notifications.warn(`No object named ${itemName} was found`);
    return;
}
ui.notifications.info(item.data.data.equipped ? `${itemName} Equipped` : `${itemName} Unequipped`);
actor.updateOwnedItem({ _id: item.id, "data.equipped": !item.data.data.equipped });