if (!actor) {
    ui.notifications.warn(`No token selected`);
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