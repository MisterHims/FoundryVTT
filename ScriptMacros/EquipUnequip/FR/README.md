# EquipUnequip

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: Foundry VTT Community, Melithian539, Ultrakorne, MisterHims
* **Traduction**: MisterHims
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: None

## Description

EquipUnequip est une macro permettant d'équiper ou de déséquiper rapidement un objet de l'inventaire du personnage sélectionné. Une notification apparaîtra si aucun personnage n'a été séléctionné et si l'objet recherché n'a pas été trouvé.

![EquipUnequip-Demonstration](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EquipUnequip/images/dem-fr-01.gif)

## Installation

### Installation de equip-unequip-generic

Le code suivant est nécessaire à l'utilisation de la seconde macro qui vous permettra de définir l'objet à équiper ou déséquiper.

1. Copiez le code ci-dessous ou accédez-y depuis le fichier [equip-unequip-item.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EquipUnequip/FR/Macros/equip-unequip-generic.js) :

   ```javascript
    let itemName = args[0];
    let item = actor.items.find(i => i.name === itemName);
    if (!item) {
        ui.notifications.warn(`Aucun objet nommé ${itemName} n'a été trouvé`);
        return;
    }
    ui.notifications.info(item.data.data.equipped ? `${itemName} a été équippé` : `${itemName} a été déséquipée`);
    actor.updateOwnedItem({ _id: item.id, "data.equipped": !item.data.data.equipped });
   ```

   *[equip-unequip-generic.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EquipUnequip/FR/Macros/equip-unequip-generic.js)*

2. Allez maintenant sur Foundry VTT puis cliquez sur un emplacement libre de la barre de macros afin d'en créer une nouvelle.

3. Sélectionnez le type "Script" puis collez le code à l'intérieur.

4. Donnez-lui exactement le nom suivant : ``` equip-unequip-generic ``` et sauvegardez la macro.

5. Vous n'aurez pas besoin de la macro à cet emplacement et vous pouvez donc là retirer (mais pas supprimer).

### Installation de la macro de l'objet à utiliser

1. Copiez le code ci-dessous ou accédez-y depuis la [Collection](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EquipUnequip/FR/Macros/equip-unequip-item.js) sous le nom de "equip-unequip-item.js" :

   ```javascript
    const macro = game.macros.entities.find(m => m.name === "equip-unequip-generic");
    if (!actor) {
        ui.notifications.warn(`Vous n'avez pas sélectionné de personnage !`);
        return;
    }
    if (!macro) {
        ui.notifications.error("La macro est dépendante de la macro nommée 'equip-unequip-generic' qui n'a pas été trouvée.");
        return;
    }
    macro.execute("Bouclier", true);
   ```

   *[equip-unequip-item.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EquipUnequip/FR/Macros/equip-unequip-item.js)*

2. Allez maintenant sur Foundry VTT puis cliquez sur un emplacement libre de la barre de macros afin d'en créer une nouvelle.

3. Sélectionnez le type "Script" puis collez le code à l'intérieur.

4. Donnez-lui par exemple le nom suivant : ``` Equiper/Déséquiper Bouclier ``` et sauvegardez la macro.

C'est avec la macro ci-dessus que vous devrez intéragir pour équiper ou déséquiper l'objet souhaité (dans cet exemple un Bouclier).

Ainsi, le nom de l'objet dans cette macro doit être identique à celui de l'inventaire du personnage. Remplacez par exemple "Bouclier" par "Trident" si vous souhaitez vous équiper ou vous déséquiper de votre trident.

## Améliorations à venir

* Possibilité d'équiper ou de déséquiper plusieurs objets en même temps
