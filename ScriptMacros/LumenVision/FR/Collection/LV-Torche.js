if (!actor) {
    ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
    return;
}
game.dnd5e.rollItemMacro("Torche");
let applyChanges = false;
new Dialog({
  title: `Torche`,
  content: `
    <form>
      <div class="form-group">
        <label>Action :</label>
        <select id="light-source" name="light-source">
          <option value="none">Eteindre</option>
          <option value="torch">Allumer</option>
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
          case "torch":
            dimLight = 8;
            brightLight = 4;
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
