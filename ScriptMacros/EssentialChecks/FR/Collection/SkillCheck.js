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