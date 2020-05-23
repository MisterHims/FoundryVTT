let changeForm = false;
let messageContent;
actor = actor ? actor : game.user.character;
if (!token && game.user.character) token = actor.getActiveTokens()[0];
let characterName = actor.data.name;
let characterToken = actor.data.token;
let characterId = characterToken.actorId;
let formActorId;
let formActor;
let startScene = canvas.scene.id;
let x = token._validPosition.x;
let y = token._validPosition.y;

let d = new Dialog({
  title: "Forme sauvage",
  content: `
     <form>
     <div class="form-group">
         <label>Choix de la forme :</label>
         <select id="form-type" name="form-type">
         <option value="forme-originale">Forme originale</option>
         <option value="forme-ours">Ours</option> 
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
        case "forme-originale":
          formActorId = "vSlsRdK5e1gJcIhg";
          break;
        case "forme-ours":
          formActorId = "k29xejd9bksJF9t2";
          break;
      }
      formActor = game.actors.get(formActorId);
      game.macros.getName("deleteToken")?.execute(startScene, token.id);
      let formToken = formActor.data.token;
      game.macros.getName("createToken")?.execute(startScene, x, y, formToken);
    }
  }
}).render(true);