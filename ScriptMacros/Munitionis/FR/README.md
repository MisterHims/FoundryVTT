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
    ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
    return;
}

let weaponName = "Arc court";
let consumableName = "Flèches";
let item = actor.items.find(i => i.name === consumableName);

if (!item) {
    ui.notifications.warn(`Aucune munition nommée "${consumableName}" n'a été trouvée`);
    return;
}

if (item.data.data.quantity < 1) {
    ui.notifications.warn(`${game.user.name}, vous n'avez pas assez de ${consumableName} restante(s)`);
} else {
    updates.push({ "_id": item._id, "data.quantity": item.data.data.quantity - 1 });
    consumed += `${item.data.data.quantity - 1} ${consumableName}(s) restante(s)<br>`;

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

___
Dans le code ci-dessus, l'exemple d'arme à distance utilisée est un "Arc court" et ses munitions des "Flèches".
Si vous souhaitez utiliser d'autres armes et/ou munitions à la place, par exemple un "Arc long", changez simplement leurs noms dans les lignes suivantes :
```javascript
let weaponName = "Arc court";
```
est alors remplacé par
```javascript
let weaponName = "Arc long";
```
Effectuez la même procédure si vous souhaitez changer les munitions utilisées (par exemple "Flèches" par "Carreaux").

Ainsi, le nom des différentes armes et munitions dans cette macro doivent être les mêmes que ceux contenues dans l'inventaire du personnage.
___

5. Nommez de façon exacte cette nouvelle macro "ranged-attack-generic" puis enregistrez-là.

6. Créez maintenant la dernière macro néccessaire à la collecte des flèches (dans le cas présent) et ajoutez-y le code suivant :

```javascript
if (!actor) {
    ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
    return;
}
let ammoDic = actor.getFlag("world", "fired-arrow");
let firedAmmo = ammoDic.ammoAmount || 0;
let consumableName = ammoDic.ammoName;

let recover = false;
let destroy = false;

new Dialog({
  title: `Récupérer les munitions utilisées`,
  content: `
    <form>
      <div class="form-group">
        <label>${consumableName} tirées : ${firedAmmo}</label>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Récupérer les munitions`,
      callback: () => recover = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Perdre les munitions`,
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
            content: `a récupéré ${recoveredAmmo} ${consumableName}(s)<br>`,
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

7. Donnez le nom que vous souhaitez à cette nouvelle macro puis enregistrez-là.

8. C'est terminé ! Vous pouvez maintenant tester si tout fonctionne. Pour cela, placez maintenant le token du personnage qui tirera avec l'arme à distance sur votre carte puis sélectionnez-le. Cliquez ensuite sur la macro de tir "Arc court" (la première macro créée) pour vérifier que tout fonctionne. Si la notification jaune s'affiche pour vous avertir qu'il n'y a plus de munitions à tirer, cliquez sur la macro de collecte de munitions (la dernière macro créée) pour les récupérer.

## Faire jouer un son au tir

Vous pouvez faire jouer un son lorsque le personnage tir avec l'arme à distance qui a été définie.

Pour cela, retournez simplement éditer votre macro issue du fichier [ranged-attack-generic.js](https://github.com/MisterHims/FoundryVTT/blob/130812cf0174cca1e3f3e2a15ca5241b2750c4fc/ScriptMacros/Munitionis/FR/Macros/ranged-attack-generic.js#L24) et modifiez la ligne suivante en supprimant les double-slash // du début et ajoutez votre chemin d'accès vers le fichier audio souhaité :
```javascript
//AudioHelper.play({ src: "sounds/weapons-impacts/Arrow 1.mp3", volume: 0.8, autoplay: true, loop: false }, true);
```
deviendrait alors
```javascript
AudioHelper.play({ src: "sounds/weapons-impacts/mon-nouveau-fichier-audio.mp3", volume: 0.8, autoplay: true, loop: false }, true);
```

Vous pouvez également modifier les paramètres de la lecture du fichier audio en question. Pour plus d'informations [cliquez-ici](https://www.w3schools.com/jsref/dom_obj_audio.asp).

## Améliorations à venir

* Utiliser plusieurs types d'armes et de munitions différentes actuellement défini par [ranged-attack-generic.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/Munitionis/FR/Macros/ranged-attack-generic.js).

Idée à approfondir : Appliquer un nom différent pour le fichier [ranged-attack-generic.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/Munitionis/FR/Macros/ranged-attack-generic.js) pour chaque type d'arme
