if (!actor) {
    ui.notifications.warn(`Aucun personnage n'est sélectionné !`);
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
    title: "Forme sauvage",
    content: `
     <form>
     <div class="form-group">
         <label>Choix de la forme sauvage :</label>
         <select id="form-type" name="form-type">
         <option value="shape-1">Forme 1</option>
         <option value="shape-2">Forme 2</option>
         <option value="shape-3">Forme 3</option>
         </select>
     </div>
     </form>
     `,
    buttons: {
        yes: {
            icon: '<i class="fas fa-check"></i>',
            label: "Lancer",
            callback: () => changeForm = true
        },
        no: {
            icon: '<i class="fas fa-times"></i>',
            label: "Annuler"
        }
    },
    default: "yes",
    close: html => {
        if (changeForm) {
            let formType = html.find('[name="form-type"]')[0].value || "none";
            switch (formType) {
                case "shape-1":
                    formActorId = "ID_du_personnage";
                    break;
                case "shape-2":
                    formActorId = "ID_du_personnage";
                    break;
                case "shape-3":
                    formActorId = "ID_du_personnage";
                    break;
            }
            formActor = game.actors.get(formActorId);
            actor.data.data.resources.primary.value = remainingShapes - cost;
            actor.transformInto(formActor, { keepMental: true, mergeSaves: true, mergeSkills: true, keepBio: true });
        }
    }
}).render(true);