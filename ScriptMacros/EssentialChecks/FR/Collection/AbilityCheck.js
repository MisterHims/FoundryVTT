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