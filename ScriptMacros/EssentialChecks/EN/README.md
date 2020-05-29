# EssentialChecks

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: DocQuantic, Foundry VTT Community
* **Traduction**: DocQuantic
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [The Furnace](https://github.com/kakaroto/fvtt-module-furnace)

## Description

EssentialChecks is a collection of very useful macros for performing Ability or Skill checks. If the character is not selected, a notification will appear to warn you.

### Installation of AbilityCheck

![AbilityCheck-Demonstration](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/EN/images/abilitycheck-dem-01.gif)

1. Copy the code below or access it from the [Collection](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/EN/Collection/AbilityCheck.js) under the name of "AbilityCheck.js" :

   ```javascript
   let rollDices = false;
   if (!actor) {
       ui.notifications.warn(`No selected token!`);
       return;
   }
   let messageContent = '';
   let d = new Dialog({
       title: "Ability Check",
       content: `
        <form>
        <div class="form-group">
            <label>Ability Check</label>
            <select id="ability-type" name="ability-type">
            <option value="str">Strength</option>
            <option value="dex">Dexterity</option>
            <option value="con">Constitution</option>
            <option value="int">Intelligence</option>
            <option value="wis">Wisdom</option>
            <option value="cha">Charisma</option>
            </select>
        </div>
        </form>
        `,
       buttons: {
           yes: {
               icon: '<i class="fas fa-check"></i>',
               label: "Roll",
               callback: () => rollDices = true
           },
           no: {
               icon: '<i class="fas fa-times"></i>',
               label: "Cancel"
           }
       },
       default: "yes",
       close: html => {
           if (rollDices) {
               let caracType = html.find('[name="ability-type"]')[0].value || "none";
               actor.rollAbility(caracType);
           }
       }
   }).render(true);
   ```

   *[AbilityCheck.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/EN/Collection/AbilityCheck.js)*

2. Now go to Foundry VTT then click on an empty place in the macro bar to create a new one.

3. Select the type "Script" then paste the code inside.

4. For example, give it the following name: ``` Ability Check ``` and save the macro.

### Installation of SkillCheck

![SkillCheck-Demonstration](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/EN/images/skillcheck-dem-01.gif)

1. Copy the code below or access it from the [Collection](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/EN/Collection/SkillCheck.js) under the name of "SkillCheck.js" :

   ```javascript
   let rollDices = false;
   if (!actor) {
       ui.notifications.warn(`No selected token!`);
       return;
   }
   let messageContent = '';
   let d = new Dialog({
       title: "Skill Check",
       content: `
        <form>
        <div class="form-group">
            <label>Skill Check</label>
            <select id="ability-type" name="ability-type">
            <option value="acr">Acrobatics</option>
            <option value="arc">Arcana</option>
            <option value="ath">Athletics</option>
            <option value="ste">Stealth</option>
            <option value="ani">Animal Handling</option>
            <option value="slt">Sleight of Hand</option>
            <option value="his">History</option>
            <option value="itm">Intimidation</option>
            <option value="inv">Investigation</option>
            <option value="med">Medicine</option>
            <option value="nat">Nature</option>
            <option value="prc">Perception</option>
            <option value="ins">Insight</option>
            <option value="per">Persuasion</option>
            <option value="rel">Religion</option>
            <option value="prf">Performance</option>
            <option value="dec">Deception</option>
            <option value="sur">Survival</option>
            </select>
        </div>
        </form>
        `,
       buttons: {
           yes: {
               icon: '<i class="fas fa-check"></i>',
               label: "Roll",
               callback: () => rollDices = true
           },
           no: {
               icon: '<i class="fas fa-times"></i>',
               label: "Cancel"
           }
       },
       default: "yes",
       close: html => {
           if (rollDices) {
               let abilityType = html.find('[name="ability-type"]')[0].value || "none";
               actor.rollSkill(abilityType);
           }
       }
   }).render(true);
   ```

   *[SkillCheck.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/EN/Collection/SkillCheck.js)*

2. Now go to Foundry VTT then click on an empty place in the macro bar to create a new one.

3. Select the type "Script" then paste the code inside.

4. For example, give it the following name: ``` Skill Check ``` and save the macro.