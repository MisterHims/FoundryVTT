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