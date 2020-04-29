// Utilisation de la Lampe
let applyChanges = false;
new Dialog({
  title: `Lampe`,
  content: `
    <form>
      <div class="form-group">
        <label>Allumer/Eteindre :</label>
        <select id="light-source" name="light-source">
          <option value="lamp">Allumer</option>
          <option value="none">Eteindre</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Appliquer`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Annuler`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      for ( let token of canvas.tokens.controlled ) {
        let lightSource = html.find('[name="light-source"]')[0].value || "none";
        let dimSight = 0;
        let brightSight = 0;
        let dimLight = 0;
        let brightLight = 0;
        let lightAngle = 360;
        let lockRotation = token.data.lockRotation;
        switch (lightSource) {
          case "lamp":
            dimLight = 9;
            brightLight = 3;
            consumOil();
            break;
          case "none":
            dimLight = 0;
            brightLight = 0;
            break;
          case "nochange":
        }
        console.log(token);
        token.update({
          vision: true,
          dimLight: dimLight,
          brightLight:  brightLight,
          lightAngle: lightAngle,
          lockRotation: lockRotation
        });
      }
    }
  }
}).render(true);

function consumOil() {
// Consommation d'une flasque d'Huile
let updates = [];
let consumed = "";
let item = actor.items.find(i=> i.name==="Huile");
if (item.data.data.quantity < 1) {
  ui.notifications.warn(`${game.user.name} not enough ${name} remaining`);
} else {
  updates.push({"_id": item._id, "data.quantity": item.data.data.quantity - 1});
consumed += `${item.data.data.quantity - 1} flasque(s) d'huile restante(s)<br>`;
}
if (updates.length > 0) {
  actor.updateManyEmbeddedEntities("OwnedItem", updates);
}
ChatMessage.create({
  user: game.user._id,
speaker: { actor: actor, alias: actor.name },
  content: chatMessage,
  type: CONST.CHAT_MESSAGE_TYPES.OTHER
});
}
