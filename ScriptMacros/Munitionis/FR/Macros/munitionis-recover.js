if (!actor) {
    ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
    return;
}
let ammoDic = actor.getFlag("world", "fired-arrow");
let firedAmmo = ammoDic.ammoAmount || 0;
let consumableName = ammoDic.ammoName;

let recover = false;
let destroy = false;

new Dialog({
  title: `Récupérer les munitions utilisées`,
  content: `
    <form>
      <div class="form-group">
        <label>${consumableName} tirées : ${firedAmmo}</label>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Récupérer les munitions`,
      callback: () => recover = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Perdre les munitions`,
      callback: () => destroy = true
    },
  },
  default: "yes",
  close: html => {
    if (recover) {
        let recoveredAmmo = Math.floor(firedAmmo / 2) || 0;
        ChatMessage.create({
            user: game.user._id,
            speaker: { actor: actor, alias: actor.name },
            content: `a récupéré ${recoveredAmmo} ${consumableName}(s)<br>`,
            type: CONST.CHAT_MESSAGE_TYPES.OTHER
        });

        let updates = [];
        let item = actor.items.find(i => i.name === consumableName);
        updates.push({ "_id": item._id, "data.quantity": item.data.data.quantity + recoveredAmmo });
        actor.updateEmbeddedEntity("OwnedItem", updates);
    }
    if(recover || destroy) {
        let ammoFiredInfo = { ammoName : consumableName, ammoAmount : 0};
        actor.setFlag("world", "fired-arrow", ammoFiredInfo);
        actor.unsetFlag("world", "fired-arrow");
    }
  }
}).render(true);
