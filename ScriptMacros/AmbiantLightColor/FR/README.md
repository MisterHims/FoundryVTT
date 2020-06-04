# AmbiantLightColor

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: Juicebox, MisterHims, Foundry VTT Community
* **Traduction**: MisterHims
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: None

## Description

AmbiantLightColor est une macro vous permettant d'ajouter très rapidement une lumière ambiante de couleur à votre scène.

![AmbiantLightColor-Demonstration](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/AmbiantLightColor/FR/images/dem-00.gif)

### Couleurs disponibles

* Rouge
* Rose
* Magenta
* Violet
* Bleu
* Azure
* Aquamarine
* Vert
* Chartreuse
* Jaune
* Orange

## Installation

1. Copiez le code ci-dessous ou accédez-y depuis le fichier [AmbiantLightColor.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/AmbiantLightColor/FR/AmbiantLightColor.js) :

   ```javascript

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

   ```

   *[AmbiantLightColor.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/AmbiantLightColor/FR/AmbiantLightColor.js)*

2. Allez maintenant sur Foundry VTT puis cliquez sur un emplacement libre de la barre de macros afin d'en créer une nouvelle.

3. Sélectionnez le type "Script" puis collez le code à l'intérieur.

4. Donnez-lui le nom de votre choix, par exemple : ``` AmbiantLightColor ``` et sauvegardez la macro.

## Configuration

* La macro est configurée par défaut afin de positionner la lumière ambiante au milieu de votre scène si celle-ci possède une dimension de 3500x3500. Il est possible d'ajuster le positionnement de la lumière ambiante en remplaçant les valeurs ```x``` et ```y``` des couleurs de votre choix dans le code de la macro.

* Si vous souhaitez supprimer la lumière ambiante de votre scène, accédez à l'outil de Lumière depuis votre menu de contrôle sur votre. Sélectionnez l'outil Source de Lumière et placez votre curseur sur l'icône de la lumière ambiante en question, cliquez ensuite sur la touche SUPPR de votre clavier.

## Améliorations à venir

* Choisir la couleur désirée directement depuis un menu déroulant (et non pas sous forme des boutons)

* Positionner automatiquement la lumière ambiante au centre de la scène sans devoir y définir les valeurs de position.

* Suppression automatique de la dernière lumière ambiante créer lorsqu'une autre est sélectionnée

## Rejoint La Fonderie !

Tu es la c'est parce que tu as découvert avec bonheur qu'il existait des modules et systèmes en Français ? Mais tu ne sais peut-être pas qu'il existe désormais un discord francophone officiel sur lequel tu vas pouvoir parler dans la langue de Molière sans te faire prendre pour un Klingon !

Alors si tu as envie de nous rejoindre dans la bonne entente, je t'invite à cliquer sur le lien ci-dessous :

[Serveur Discord La Fonderie](https://discord.gg/pPSDNJk)