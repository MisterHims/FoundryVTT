# EssentialChecks

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: DocQuantic, Foundry VTT Community
* **Traduction**: DocQuantic
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [The Furnace](https://github.com/kakaroto/fvtt-module-furnace)

## Description

EssentialChecks est une collection de macros très utiles pour éffectuer des jets de dés "manuels" en tout genre comme des Tests de caractéristique par exemple. Leur utilisation nécessite que le token dont vous souhaitez éffectuer les différents jets soit sélectionné, une notification pour vous prévenir apparaîtra dans le cas contraire.

### Installation de AbilityCheck (Test de Caractéristique)

![AbilityCheck-Demonstration](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/FR/images/abilitycheck-dem-01.gif)

1. Copiez le code ci-dessous ou accédez-y depuis la [Collection](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/FR/Collection/AbilityCheck.js) sous le nom de "AbilityCheck.js" :

   ```javascript
   let rollDices = false;
   if (!actor) {
       ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
       return;
   }
   let messageContent = '';
   let d = new Dialog({
       title: "Test de Caractéristique",
       content: `
        <form>
        <div class="form-group">
            <label>Caractéristique</label>
            <select id="ability-type" name="ability-type">
            <option value="str">Force</option>
            <option value="dex">Dextérité</option>
            <option value="con">Constitution</option>
            <option value="int">Intelligence</option>
            <option value="wis">Sagesse</option>
            <option value="cha">Charisme</option>
            </select>
        </div>
        </form>
        `,
       buttons: {
           yes: {
               icon: '<i class="fas fa-check"></i>',
               label: "Lancer",
               callback: () => rollDices = true
           },
           no: {
               icon: '<i class="fas fa-times"></i>',
               label: "Annuler"
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

   *[AbilityCheck.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/FR/Collection/AbilityCheck.js)*

2. Allez maintenant sur Foundry VTT puis cliquez sur un emplacement libre de la barre de macros afin d'en créer une nouvelle.

3. Sélectionnez le type "Script" puis collez le code à l'intérieur.

4. Donnez-lui par exemple le nom suivant : ``` Test de Caractéristique ``` et sauvegardez la macro.

### Installation de SkillCheck (Test de Compétence)

![SkillCheck-Demonstration](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/FR/images/skillcheck-dem-01.gif)

1. Copiez le code ci-dessous ou accédez-y depuis la [Collection](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/FR/Collection/SkillCheck.js) sous le nom de "SkillCheck.js" :

   ```javascript
   let rollDices = false;
   if (!actor) {
       ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
       return;
   }
   let messageContent = '';
   let d = new Dialog({
       title: "Test de Compétence",
       content: `
        <form>
        <div class="form-group">
            <label>Compétence</label>
            <select id="ability-type" name="ability-type">
            <option value="acr">Acrobaties</option>
            <option value="arc">Arcanes</option>
            <option value="ath">Athlétisme</option>
            <option value="ste">Discrétion</option>
            <option value="ani">Dressage</option>
            <option value="slt">Escamotage</option>
            <option value="his">Histoire</option>
            <option value="itm">Intimidation</option>
            <option value="inv">Investigation</option>
            <option value="med">Médecine</option>
            <option value="nat">Nature</option>
            <option value="prc">Perception</option>
            <option value="ins">Perspicacité</option>
            <option value="per">Persuasion</option>
            <option value="rel">Religion</option>
            <option value="prf">Représentation</option>
            <option value="dec">Supercherie</option>
            <option value="sur">Survie</option>
            </select>
        </div>
        </form>
        `,
       buttons: {
           yes: {
               icon: '<i class="fas fa-check"></i>',
               label: "Lancer",
               callback: () => rollDices = true
           },
           no: {
               icon: '<i class="fas fa-times"></i>',
               label: "Annuler"
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

   *[SkillCheck.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/EssentialChecks/FR/Collection/SkillCheck.js)*

2. Allez maintenant sur Foundry VTT puis cliquez sur un emplacement libre de la barre de macros afin d'en créer une nouvelle.

3. Sélectionnez le type "Script" puis collez le code à l'intérieur.

4. Donnez-lui par exemple le nom suivant : ``` Test de Compétence ``` et sauvegardez la macro.

## Problèmes rencontrés

* La traduction totale des fenêtres qui apparaîssent n'est pas encore possible.
