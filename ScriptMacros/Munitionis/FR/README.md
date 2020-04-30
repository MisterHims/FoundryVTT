![](https://img.shields.io/badge/Foundry-v0.5.5-informational)
# Munitionis

* **Author**: Ultrakorne, Melchior, ChaoDjinn, Foundry VTT Community
* **Traduction FR**: MisterHims
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [Minor Quality of Life](https://gitlab.com/tposney/minor-qol/tree/master), [The Furnace](https://github.com/kakaroto/fvtt-module-furnace)

## Description
Munitionis est une petite collection de macros qui vous permettra d'utiliser l'arme à distance de votre personnage, d'y inclure sa consommation de munitions, mais également de pouvoir récupérer la moitié de ces munitions utilisées. Elle est issue de la communauté Foundry VTT. Elle a par la suite été traduite en français.

## Installation

1. Installez le module The Furnace puis Minor Quality of Life et configurez-le à vos besoins.
2. Allez sur FoundryVTT puis sélectionnez une arme à distance dans l'inventaire de la fiche personnage. Faites un glisser-déposer de celle-ci dans votre barre de macros.
3. Vous allez maintenant créer votre macro principale qui sera utilisée pour votre arme à distance. Faites un clic-droit sur l'icône de la nouvelle macro puis éditez-là. Ajoutez ou remplacez par le code suivant  :

```javascript
const macro = game.macros.entities.find(m => m.name === "ranged-attack-generic");
if(!macro) {
ui.notifications.error("Cette macro dépends de la macro 'ranged-attack-generic' qui ne peut être trouvée.");
  return;
}
macro.execute("Arc court","Flèches",true);
```
*[add-to-macro-weapon.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/Munitionis/FR/Macros/add-to-macro-weapon.js)*

Dans cet exemple, l'arme utilisée est un "Arc court" et ses munitions sont des "Flèches". Si vous souhaitez utiliser d'autres armes et/ou munitions, par exemple une "Arbalète légère" et des "Carreaux d'arbalète", changez simplement leurs noms à la ligne suivante :
```javascript
macro.execute("Arbalète légère","Carreaux d'arbalète",true);
```
Ainsi, le nom des différentes armes et munitions utilisées dans cette macro doivent être identiques à l'inventaire du personnage.
Si vous avez utilisez le compendium AideDD Items, pensez à bien supprimer les chiffres entre parenthèses de vos munitions.
Exemple : "Carreaux d'arbalète (20)" doit devenir "Carreaux d'arbalète".

4. Créez maintenant une nouvelle macro en cliquant sur un des emplacements libres de votre barre de macros et ajoutez-y le code suivant :

```javascript
let updates = [];
let consumed = "";
if (!actor) {
    ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
    return;
}

let weaponName = args[0];
let consumableName = args[1];
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

5. Nommez cette nouvelle macro "ranged-attack-generic" puis enregistrez-là.

6. Créez maintenant la dernière macro, celle-ci vous permettra de récupérer la moitié de vos munitions tirées. Ajoutez-y alors le code suivant :

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

7. Donnez le nom que vous souhaitez à cette nouvelle macro, par exemple "Munitionis-Recover" puis enregistrez-là.

8. C'est terminé ! Vous pouvez maintenant tester si tout fonctionne.

* Placez le token du personnage qui tirera avec l'arme à distance sur votre carte puis sélectionnez-le. Cliquez ensuite sur la première macro créer pour vérifier que tout fonctionne.
* Si vous avez tiré toutes vos munitions, une notification jaune s'affiche pour vous avertir que vous ne disposez plus de munitions.
* Cliquez alors sur la macro de collecte de munitions "Munitionis-Recover" pour récupérer la moitié (arrondi à l'inférieur).

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
