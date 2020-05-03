let itemName1 = args[0];
let itemName2 = args[1];
let item = actor.items.find(i => i.name === itemName1);
if (!item) {
    ui.notifications.warn(`Nos object named ${itemName1} and ${itemName2} was found`);
    return;
}
ui.notifications.info(item.data.data.equipped ? `${itemName1} and ${itemName2} Equipped` : `${itemName1} and ${itemName2} Unequipped`);
actor.updateOwnedItem({ _id: item.id, "data.equipped": !item.data.data.equipped });