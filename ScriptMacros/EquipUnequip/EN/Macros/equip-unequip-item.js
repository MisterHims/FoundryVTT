const macro = game.macros.entities.find(m => m.name === "equip-unequip-generic");
if (!actor) {
    ui.notifications.warn(`You didn't have selected token !`);
    return;
}
if (!macro) {
    ui.notifications.error("This macro depends of the 'equip-unequip-generic' macro which cannot be found.");
    return;
}
macro.execute("Shield", true);
