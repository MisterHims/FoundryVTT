// Utilisation de la Lanterne à capote
let applyChanges = false;
new Dialog({
  title: `Lanterne à capote`,
  content: `
    <form>
      <div class="form-group">
        <label>Niveau de lumière :</label>
        <select id="light-source" name="light-source">
          <option value="none">Eteindre</option>
          <option value="hooded-dim">Lumière faible</option>
          <option value="hooded-bright">Lumière vive</option>
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
          case "hooded-dim":
            dimLight = 1;
            brightLight = 0;
            consumOil();
            break;
          case "hooded-bright":
            dimLight = 12;
            brightLight = 6;
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

function consumOil() {
// Consommation d'une flasque d'Huile
let updates = [];
let consumed = "";
let item = actor.items.find(i=> i.name==="Huile");
if (item.data.data.quantity < 1) {
  ui.notifications.warn(`${game.user.name} ne dispose pas assez de flasque(s) d'Huile`);
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
