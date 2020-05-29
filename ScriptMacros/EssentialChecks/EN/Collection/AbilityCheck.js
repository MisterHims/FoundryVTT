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