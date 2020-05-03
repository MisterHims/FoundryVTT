# LumenVision

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: Sky-Captain-13, Foundry VTT Community
* **Traduction**: MisterHims
* **Version**: 1.0.1
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: None

## Description

LumenVision est un outil permettant d'initialiser rapidement la vision, la lumière et sa couleur issue d'un ou plusieurs tokens sélectionnés, une notification apparaît alors dans le cas contraire. Cette macro est en partie issue de la communauté Foundry VTT et a par la suite été traduite en français, modifiée puis convertie au système métrique européen. C'est un outil principalement utile pour le MJ. Voici un exemple avec les différentes sources de lumières disponibles :

![alt text](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LumenVision/FR/images/dem_01.gif)

## Installation

1. Copiez le code ci-dessous ou accédez-y depuis le fichier [LumenVision.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LumenVision/FR/LumenVision.js) :

   ```javascript

    let applyChanges = false;
    if (!actor) {
        ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
        return;
    }
    new Dialog({
    title: `Configuration de la vision du token`,
    content: `
        <form>
        <div class="form-group">
            <label>Type de vision :</label>
            <select id="vision-type" name="vision-type">
            <option value="nochange">Pas de changement</option>
            <option value="dim0">Aucune</option>
            <option value="dim30">Vision dans le noir (9 m)</option>
            <option value="dim60">Vision dans le noir (18 m)</option>
            <option value="dim90">Vision dans le noir (27 m)</option>
            <option value="dim120">Vision dans le noir (36 m)</option>
            <option value="dim150">Vision dans le noir (45 m)</option>
            <option value="dim180">Vision dans le noir (54 m)</option>
            <option value="bright120">Vision du diable (36 m dans les ténèbres)</option>
            </select>
        </div>
        <div class="form-group">
            <label>Source de lumière :</label>
            <select id="light-source" name="light-source">
            <option value="nochange">Pas de changement</option>
            <option value="none">Aucune</option>
            <option value="candle">Bougie</option>
            <option value="lamp">Lampe</option>
            <option value="bullseye">Lanterne sourde</option>
            <option value="hooded-dim">Lanterne à capote (lumière faible)</option>
            <option value="hooded-bright">Lanterne à capote (lumière vive)</option>
            <option value="light-dim">Lanterne de révélation (lumière faible)</option>
            <option value="light-bright">Lanterne de révélation (lumière vive)</option>
            <option value="torch">Torche</option>
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
            let visionType = html.find('[name="vision-type"]')[0].value || "none";
            let lightSource = html.find('[name="light-source"]')[0].value || "none";
            let dimSight = 0;
            let brightSight = 0;
            let dimLight = 0;
            let brightLight = 0;
            let lightAngle = 360;
            let lockRotation = token.data.lockRotation;
            // Get Vision Type Values
            switch (visionType) {
            case "dim0":
                dimSight = 0;
                brightSight = 0;
                break;
            case "dim30":
                dimSight = 9;
                brightSight = 0;
                break;
            case "dim60":
                dimSight = 18;
                brightSight = 0;
                break;
            case "dim90":
                dimSight = 27;
                brightSight = 0;
                break;
            case "dim120":
                dimSight = 36;
                brightSight = 0;
                break;
            case "dim150":
                dimSight = 45;
                brightSight = 0;
                break;
            case "dim180":
                dimSight = 54;
                brightSight = 0;
                break;
            case "bright120":
                dimSight = 0;
                brightSight= 36;
                break;
            case "nochange":
            default:
                dimSight = token.data.dimSight;
                brightSight = token.data.brightSight;
            }
            // Get Light Source Values
            switch (lightSource) {
            case "none":
                dimLight = 0;
                brightLight = 0;
                break;
            case "candle":
                dimLight = 2;
                brightLight = 1;
                break;
            case "lamp":
                dimLight = 9;
                brightLight = 3;
                break;
            case "bullseye":
                dimLight = 24;
                brightLight = 12;
                lockRotation = false;
                lightAngle = 52.5;
                break;
            case "hooded-dim":
                dimLight = 1;
                brightLight = 0;
                break;
            case "hooded-bright":
                dimLight = 12;
                brightLight = 6;
                break;
            case "light-dim":
                dimLight = 1;
                brightLight = 0;
                break;
            case "light-bright":
                dimLight = 10;
                brightLight = 4;
                break;
            case "torch":
                dimLight = 8;
                brightLight = 4;
                break;
            case "nochange":
            default:
                dimLight = token.data.dimLight;
                brightLight = token.data.brightLight;
                lightAngle = token.data.lightAngle;
                lockRotation = token.data.lockRotation;
            }
            // Update Token
            console.log(token);
            token.update({
            vision: true,
            dimSight: dimSight,
            brightSight: brightSight,
            dimLight: dimLight,
            brightLight:  brightLight,
            lightAngle: lightAngle,
            lockRotation: lockRotation
            });
        }
        }
    }
    }).render(true);

   ```

   *[LumenVision.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LumenVision/FR/LumenVision.js)*

2. Allez maintenant sur Foundry VTT puis cliquez sur un emplacement libre de la barre de macros afin d'en créer une nouvelle.

3. Sélectionnez le type "Script" puis collez le code à l'intérieur.

4. Donnez-lui le nom de votre choix, par exemple : ``` LumenVision ``` et sauvegardez la macro.