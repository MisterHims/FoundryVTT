# WildShape

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: DocQuantic, Foundry VTT Community
* **Traduction**: MisterHims
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [The Furnace](https://github.com/kakaroto/fvtt-module-furnace)

## Description

WildShape is a macro allowing you to quickly change the shape of the selected character and then return to its original shape. If the character is not selected, a notification will appear. The druid's statistics will be replaced by those of the beast and he will then have his token replaced. The macro takes into account the resource cost of the Wild Form action. This is a particularly useful macro for Druids.

![WildShape-Demonstration-01](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/images/dem_01.gif)

## Installation

The macro will certainly not work after its installation, you will then have to make some modifications in order to make it functional and to adapt it to your needs. But do not be discouraged, it is much simpler than it seems.

1. Copy the code below or access it from [WildShape.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/WildShape.js) :

   ```javascript

   if (!actor) {
       ui.notifications.warn(`No character is selected!`);
       return;
   }
   let changeForm = false;
   actor = actor ? actor : game.user.character;
   let formActorId;
   let formActor;
   let cost = 1;
   if (actor.isPolymorphed) {
       actor.revertOriginalForm();
       return;
   }
   let remainingShapes = actor.data.data.resources.primary.value;
   if (remainingShapes < 1) return;
   let d = new Dialog({
       title: "Wild Shape",
       content: `
        <form>
        <div class="form-group">
            <label>Choice of shape:</label>
            <select id="form-type" name="form-type">
            <option value="wolf">Wolf shape</option>
            <option value="crocodile">Crocodile shape</option>
            <option value="eagle">Eagle shape</option>
            </select>
        </div>
        </form>
        `,
       buttons: {
           yes: {
               icon: '<i class="fas fa-check"></i>',
               label: "Apply",
               callback: () => changeForm = true
           },
           no: {
               icon: '<i class="fas fa-times"></i>',
               label: "Cancel"
           }
       },
       default: "yes",
       close: html => {
           if (changeForm) {
               let formType = html.find('[name="form-type"]')[0].value || "none";
               switch (formType) {
                   case "loup":
                       formActorId = "Character_ID";
                       break;
                   case "crocodile":
                       formActorId = "Character_ID";
                       break;
                   case "aigle":
                       formActorId = "Character_ID";
                       break;
               }
               formActor = game.actors.get(formActorId);
               actor.data.data.resources.primary.value = remainingShapes - cost;
               actor.transformInto(formActor, { keepMental: true, mergeSaves: true, mergeSkills: true, keepBio: true });
           }
       }
   }).render(true);

   ```

   *[WildShape.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/WildShape.js)*

2. Now go to Foundry VTT then click on an empty place in the macro bar to create a new one.

3. Select the type "Script" then paste the code inside.

4. Give it the name of your choice, for example: ``` WildShape ``` and save the macro.

## Configuration

After installing WildShape, you need to configure it.

1. First, you must have the character whose shape you want to change. Make sure he has the Wild Form ability in his sheet. If it's not the case, you need to add it from the "Class Features" compendium. Thereafter, you will need to add a new resource slot to it:

   ![WildShape-New-Slot](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/images/new-slot.jpg)

2. Create the character sheets of the different shapes that you want to add to the macro. For this, I suggest you directly use a solution integrated with FoundryVTT:
    * Drag and drop the beast whose shape you want to adopt (for example a Wolf) from the "Monsters" compendium to the character sheet previously created in step 1.

    * A window opens then, tick the boxes "Keep the equipment", "Keep the mastery bonus", "Keep the skills", "Keep the spells", "Keep his biography", "Keep the vision" and " Transform all linked tokens. "

    * In this way, a new character sheet will be temporarily created in your list in the Characters menu, you can then modify it as you wish. Make a copy and rename it to save it. You can delete the first temporary character sheet.

    * Repeat for all the shapes you want to add, for example the Crocodile and the Eagle.

      ![WildShape-Polymorph](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/images/dem_polymorph.gif)

3. Get the ID of the different character sheets of the shapes in question, for that there are several methods but I suggest this one to stay on FoundryVTT:
    * Open or create a new article in the Articles menu and switch to edit mode (by clicking on the square icon with a pencil).

    * Open the Characters menu then drag and drop the shape's character sheet, you should get something like this ``` @Actor[5K4RGyiivnSg1jFe]{Erendil The Wolf} ```, the ID is then between the brackets ``` 5K4RGyiivnSg1jFe ``` in this case.

    * Then write down thoses IDs somewhere, it will allow you to add this shape to the macro.

      ![WildShape-RécupérerIDs](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/images/dem_id.gif)

4. After recovering the different IDs necessary for your needs from the different character sheets (for example: Erendil the Wolf, Erendil the Crocodile and Erendil the Eagle), you will then have to modify the macro code in order to add these IDs. In the following piece of code, replace ``` Character_ID ``` with the ID of the character whose shape you want to change:

   ```javascript

    case "wolf":
     formActorId = "Character_ID";
     break;

   ```

   Then would become:

   ```javascript

    case "wolf":
     formActorId = "5K4RGyiivnSg1jFe";
     break;

   ```

5. Then repeat the operation with the IDs used for the Crocodile and Eagle shapes:

   ```javascript

    case "wolf":
     formActorId = "5K4RGyiivnSg1jFe";
     break;
    case "crocodile":
     formActorId = "I2CjA2taEWxY03aR";
     break;
    case "eagle":
     formActorId = "Y0d0Hy8FcBNYC79u";
     break;

   ```

That's done ! Here you are with a functional macro to change the shape of your character in 3 different ways!

### Add more shapes

You are here limited to three shapes, if you want to add more, take note of the method proposed below, otherwise choose one of the following macros already pre-configured:

* 1 forme : *[WildShape-1-shape.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/WildShape-1-shape.js)*
* 2 formes : *[WildShape-2-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/WildShape-2-shapes.js)*
* 3 formes : *[WildShape-3-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/WildShape-3-shapes.js)*
* 4 formes : *[WildShape-4-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/WildShape-4-shapes.js)*
* 5 formes : *[WildShape-5-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/WildShape-5-shapes.js)*
* 6 formes : *[WildShape-6-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/WildShape-6-shapes.js)*
* 7 formes : *[WildShape-7-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/WildShape-7-shapes.js)*
* 8 formes : *[WildShape-8-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/WildShape-8-shapes.js)*
* 9 formes : *[WildShape-9-shapes.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/WildShape/EN/Collection/WildShape-9-shapes.js)*

---

If you need to add yet another shape to the macro then you can do it this way:

1. You will find at the top of the code contained in the macro the options of the window that appear during interaction with the macro, to add an additional option, simply copy an option line like this: ``` <option value="wolf">Wolf shape</option> ``` then paste it after a return to the line.

2. Then change the value of this option and its name. If you want to add a bear shape, for example, this new line should look something like this: ``` <option value="bear">Bear shape</option> ```

3. Then go to the bottom of the code contained in the macro, you will find the "cases" there. In the same way as before, copy and paste a new case after a line break:

   * Change the name of the box, for example ``` case "wolf": ``` to ``` case "bear": ```

   * Then replace the ID with that of your character sheet for the shape of the Eagle in question, for example ``` formActorId = "5K4RGyiivnSg1jFe"; ``` to ``` formActorId = "x82ahds4sazDF2s3"; ```

4. It's done, you've added a shape to the macro. Then repeat the operation as many times you need.

### Choose to keep your equipment when changing shape

You just have to change the following line: :

```javascript
actor.transformInto(formActor, {keepMental: true, mergeSaves: true, mergeSkills: true, keepBio: true});
```

by this new line:

```javascript
actor.transformInto(formActor, {keepMental: true, mergeSaves: true, mergeSkills: true, keepItems: true, keepBio: true})
```
