# EquipUnEquip

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: Foundry VTT Community, MisterHims, Melithian539, Ultrakorne
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: None

## Description

EquipUnequip is a macro allowing to quickly equip or unequip an object of the inventory for the selected token. A notification appear if no token has been selected and if the object sought has not been found.

![EquipUnequip-Demonstration](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EquipUnequip/images/dem-en-1.gif)

## Installation

### Installation of equip-unequip-generic

The following code is necessary to use the second macro which will allow you to define the object to equip or unequip.

1. Copy the code below or access it from the file [equip-unequip-item.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EquipUnequip/EN/Macros/equip-unequip-generic.js) :

   ```javascript
    let itemName = args[0];
    let item = actor.items.find(i => i.name === itemName);
    if (!item) {
        ui.notifications.warn(`No object named ${itemName} was found`);
        return;
    }
    ui.notifications.info(item.data.data.equipped ? `${itemName} Equipped` : `${itemName} Unequipped`);
    actor.updateOwnedItem({ _id: item.id, "data.equipped": !item.data.data.equipped });
   ```

   *[equip-unequip-generic.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EquipUnequip/EN/Macros/equip-unequip-generic.js)*

2. Now go to Foundry VTT then click on an empty slot in the macro bar to create a new one.

3. Select the "Script" type then paste the code inside.

4. Give it exactly the following name: ``` equip-unequip-generic ``` and save the macro.

5. You will not need the macro there, so you can remove (but not delete) of there.

### Installation of the macro object to use

1. Copy the code below or access it from the [Macros](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EquipUnequip/EN/Macros/equip-unequip-item.js) under the name of "equip-unequip-item.js" :

   ```javascript
    const macro = game.macros.entities.find(m => m.name === "equip-unequip-generic");
    if (!actor) {
        ui.notifications.warn(`You didn't have selected token !`);
        return;
    }
    if (!macro) {
        ui.notifications.error("This macro depends of the 'equip-unequip-generic' macro which cannot be found.");
        return;
    }
    macro.execute("Shield", true);
   ```

   *[equip-unequip-item.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EquipUnequip/EN/Macros/equip-unequip-item.js)*

2. Now go to Foundry VTT then click on an empty slot in the macro bar to create a new one.

3. Select the "Script" type then paste the code inside.

4. For example, give it the following name: ``` Equip/Unequip Shield ``` and save the macro.

It is with the macro above that you will have to interact to equip or unequip the desired object (in this example a Shield).

Thus, the name of the object in this macro must be identical to the token's inventory. For example, replace "Shield" with "Trident" if you want to equip or remove your trident.

## Upcoming improvements

* Possibility to equip or unequip several objects at the same time
