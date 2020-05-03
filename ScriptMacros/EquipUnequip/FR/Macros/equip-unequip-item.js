const macro = game.macros.entities.find(m => m.name === "equip-unequip-generic");
if (!actor) {
    ui.notifications.warn(`Vous n'avez pas sélectionné de personnage !`);
    return;
}
if (!macro) {
    ui.notifications.error("La macro est dépendante de la macro nommée 'equip-unequip-generic' qui n'a pas été trouvée.");
    return;
}
macro.execute("Bouclier", true);