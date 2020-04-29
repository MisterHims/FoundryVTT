![](https://img.shields.io/badge/Foundry-v0.5.5-informational)
## Munitionis

* **Author**: Ultrakorne, Melchior, ChaoDjinn, Foundry VTT Community
* **Traduction FR**: MisterHims
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: Universal
* **Module Requirement(s)**: Minor Quality of Life

### Description
Munitionis est une petite collection de macros qui vous permettra d'utiliser l'arme à distance de votre personnage, d'y inclure sa consommation de munitions, mais également de pouvoir récupérer la moitié de ces munitions utilisées. Elle est issue de la communauté Foundry VTT. Elle a par la suite été traduite en français.

## Installation

1. Installez le module [Minor Quality of Life](https://gitlab.com/tposney/minor-qol/tree/master) et configurez-le à vos besoins.
2. Sélectionnez une arme à distance dans l'inventaire du personnage contenu dans sa fiche et faites un glisser-déposer dans votre barre de macros.
3. Faites un clic-droit sur l'icône de la nouvelle macro puis éditez-là. Ajoutez-y les lignes suivantes (avant le code déjà présent précédemment généré par l'arme du personnage) :

```javascript
//La macro de cette fonction dépends de la macro nommée "ranged-attack-generic"
const macro = game.macros.entities.find(m => m.name === "ranged-attack-generic");
if(!macro) {
ui.notifications.error("Cette macro dépends de la macro 'ranged-attack-generic' qui ne peut être trouvée.");
  return;
}
```

Le contenu de votre macro devrait alors ressembler à quelque chose comme ça :

```javascript
//La macro de cette fonction dépends de la macro nommée "ranged-attack-generic"
const macro = game.macros.entities.find(m => m.name === "ranged-attack-generic");
if(!macro) {
ui.notifications.error("Cette macro dépends de la macro 'ranged-attack-generic' qui ne peut être trouvée.");
  return;
}
macro.execute("Arc court","Flèches",true);
```
*[add-to-macro-weapon.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/Munitionis/FR/Macros/add-to-macro-weapon.js)*

Donnez un nom à cette nouvelle macro et enregistrez-là. Par exemple "Arc court".

4. Créez maintenant une nouvelle macro en cliquant sur un des emplacements libres de votre barre de macros puis ajoutez-y le code suivant :

```javascript
let updates = [];
let consumed = "";
if (!actor) {
    ui.notifications.warn(`no actor selected`);
    return;
}

let weaponName = "Arc court";
let consumableName = "Flèches";
let item = actor.items.find(i => i.name === consumableName);

if (!item) {
    ui.notifications.warn(`no ammo named ${consumableName} found`);
    return;
}

if (item.data.data.quantity < 1) {
    ui.notifications.warn(`${game.user.name} not enough ${consumableName} remaining`);
} else {
    updates.push({ "_id": item._id, "data.quantity": item.data.data.quantity - 1 });
    consumed += `${item.data.data.quantity - 1} arrows left<br>`;

    MinorQOL.doRoll(event, weaponName, { type: "weapon", versatile: false });
    AudioHelper.play({ src: "sounds/weapons-impacts/Arrow 1.mp3", volume: 0.8, autoplay: true, loop: false }, true);
    let ammoDic = actor.getFlag("world", "fired-arrow");
    let ammoFired = 1;

    if (ammoDic) {
        console.log(ammoDic);
        ammoFired = ammoDic.ammoAmount + 1 || 1;
    }

    let ammoFiredInfo = { ammoName: consumableName, ammoAmount: ammoFired };
    actor.setFlag("world", "fired-arrow", ammoFiredInfo);
}

if (updates.length > 0) {
    actor.updateEmbeddedEntity("OwnedItem", updates);

    ChatMessage.create({
        user: game.user._id,
        speaker: { actor: actor, alias: actor.name },
        content: consumed,
        type: CONST.CHAT_MESSAGE_TYPES.OTHER
    });
}
```
*[ranged-attack-generic.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/Munitionis/FR/Macros/ranged-attack-generic.js)*

5. L'exemple d'arme utilisée pour cette macro est l'Arc court et ses munitions des Flèches. Si vous souhaitez utiliser d'autres armes et/ou munitions, changez simplement leurs noms dans les lignes suivantes : ```javascript let weaponName = "Arc court"; ``` et ```javascript let consumableName = "Flèches"; ``` 


 remplacez-y le nom de l'arme à distance utilisée ("Arc court") et le nom des munitions ("Flèches") par les noms de l'arme à distance et munitions que vous souhaitez utiliser. Ainsi, le nom des différentes armes et munitions dans cette macro doivent être les mêmes que ceux contenues dans l'inventaire du personnage.

6. Nommez de façon exacte cette nouvelle macro "ranged-attack-generic" puis enregistrez-là.

7. Créez maintenant la dernière macro néccessaire à la collecte des flèches (dans le cas présent) et ajoutez-y le code suivant :

```javascript
if (!actor) {
    ui.notifications.warn(`no actor selected`);
    return;
}
let ammoDic = actor.getFlag("world", "fired-arrow");
let firedAmmo = ammoDic.ammoAmount || 0;
let consumableName = ammoDic.ammoName;

let recover = false;
let destroy = false;

new Dialog({
  title: `Recover Fired Ammo`,
  content: `
    <form>
      <div class="form-group">
        <label>${consumableName} Fired: ${firedAmmo}</label>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Recover ammo`,
      callback: () => recover = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Lose unrecovered`,
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
            content: `has recovered ${recoveredAmmo} ammo<br>`,
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
```
*[munitionis-recover.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/Munitionis/FR/Macros/munitionis-recover.js)*

8. Donnez le nom que vous souhaitez à cette nouvelle macro puis enregistrez-là.

9. Placez maintenant le token du personnage qui tirera avec l'arme à distance sur votre carte puis sélectionnez-le. Assurez-vous que ce token cible l'adversaire. Cliquez sur la macro de tir "Arc court" (la première macro créée) pour vérifier que tout fonctionne. Lorsque la barre de message jaune s'affiche pour vous avertir qu'il n'y a plus de munitions à tirer, cliquez sur la macro de collecte de munitions (la denrière macro créée) pour les récupérer.
