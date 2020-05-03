let dialogEditor = new Dialog({
  title: `Couleur de la lumière ambiante`,
  content: ``,
  buttons: {
    red: {
      label: `Rouge`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#FD0006", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
    pink: {
      label: `Rose`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#FF007F", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
    magenta: {
      label: `Magenta`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#FD00FF", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
    purple: {
      label: `Violet`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#7F00FF", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
    blue: {
      label: `Bleu`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#0000FF", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
    azur: {
      label: `Azure`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#007FFF", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
    aquamarine: {
      label: `Aquamarine`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#00FF7F", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
    green: {
      label: `Vert`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#00FF00", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
    chartreuse: {
      label: `Chartreuse`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#7FFF00", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
    yellow: {
      label: `Jaune`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#FFFF00", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
    orange: {
      label: `Orange`,
      callback: () => {
        AmbientLight.create({
          t: "l", // l for local. The other option is g for global.
          x: 3200, // horizontal positioning
          y: 3200, // vertical positioning
          dim: 40, // the total radius of the light, including where it is dim.
          bright: 20, // the bright radius of the light
          angle: 360, // the coverage of the light. (Try 30 for a "spotlight" effect.)
          rotation: 0, // the beam direction of the light in degrees (if its angle is less than 360 degrees.) 
          // Oddly, degrees are counted from the 6 o'clock position.
          tintColor: "#FF7F02", // Light coloring.
          tintAlpha: 0.5 // Light opacity (or "brightness," depending on how you think about it.) 
        });
        dialogEditor.render(true);
      }
    },
  },
  default: "close",
  close: () => { }
});

dialogEditor.render(true)
