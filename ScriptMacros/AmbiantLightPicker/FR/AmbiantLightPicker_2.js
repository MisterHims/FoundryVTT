let applyChanges = false;
new Dialog({
  title: `Configuration de lumière ambiante`,
  content: `
    <form>
      <div class="form-group">
        <label>Portée :</label>
        <select id="vision-type" name="vision-type">
          <option value="torch">Torche</option>
        </select>
      </div>
      <div class="form-group">
        <label>Couleur :</label>
        <select id="light-source" name="light-source">
          <option value="nochange">Vert</option>
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
      for () {
        switch () {
          case "torch":
                AmbientLight.create({
                    t: "l", // l for local. The other option is g for global.
                    x: 1100, // horizontal positioning
                    y: 1150, // vertical positioning
                    dim: 40, // the total radius of the light, including where it is dim.
                    bright: 20, // the bright radius of the light
                    angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
                    rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
                    // Oddly, degrees are counted from the 6 o'clock position.
                });
            break;
        }
        // Get Light Source Values
        switch () {
          case "green":
                AmbientLight.create({
                    tintColor: "#00ff00", // Light coloring.
                    tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
                });
            break;
        }
      }
    }
  }
}).render(true);
