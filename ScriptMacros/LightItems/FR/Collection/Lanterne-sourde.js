let applyChanges = false;
if (!actor) {
    ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
    return;
}
let item = actor.items.find(i => i.name === "Huile");
const macro = game.macros.entities.find(m => m.name === "consum-generic");
if(!macro) {
ui.notifications.error("Cette macro dépends de la macro 'consum-generic' qui ne peut être trouvée.");
  return;
}
new Dialog({
  title: `Lanterne sourde`,
  content: `
    <form>
      <div class="form-group">
        <label>Action :</label>
        <select id="light-source" name="light-source">
          <option value="none">Eteindre</option>
          <option value="bullseye">Allumer</option>
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
          case "bullseye":
          macro.execute("Huile",true);
          if (item.data.data.quantity < 1) {
              return;
            } else {
              dimLight = 24;
              brightLight = 12;
              lockRotation = false;
              lightAngle = 52.5;
              break;
          }
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
