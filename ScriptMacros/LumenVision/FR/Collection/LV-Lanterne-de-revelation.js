// Utilisation de la Lanterne de révélation
let applyChanges = false;
new Dialog({
  title: `Lanterne de révélation`,
  content: `
    <form>
      <div class="form-group">
        <label>Niveau de lumière :</label>
        <select id="light-source" name="light-source">
          <option value="none">Eteindre</option>
          <option value="light-dim">Lumière faible</option>
          <option value="light-bright">Lumière vive</option>
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
          case "light-dim":
            dimLight = 1;
            brightLight = 0;
            consumOil();
            break;
					case "light-bright":
	           dimLight = 10;
	           brightLight = 4;
             consumOil();
	           break;
          case "none":
            dimLight = 0;
            brightLight = 0;
            break;
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
// Consommation d'une flasque d'Huile
function consumOil() {
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
  content: consumed,
  type: CONST.CHAT_MESSAGE_TYPES.OTHER
});
}
