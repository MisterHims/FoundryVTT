# SoundBox

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: Rockshow, MisterHims, Foundry VTT Community
* **Traduction**: MisterHims
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: None

## Description

SoundBox est une macro qui vous permet de faire apparaître une boite à sons. Cette dernière vous permet de faire jouer un son parmi une sélection puis de régler son volume. Elle est particulièrement utile lorsque vous ne souhaitez pas utiliser la JukeBox intégrée à FoundryVTT lorsque vous désirez faire jouer des bruitages ou des petits sons d'ambiance par exemple.



![SoundBox-Demonstration](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/SoundBox/FR/images/dem_01.gif)

## Installation

1. Copiez le code ci-dessous ou accédez-y depuis le fichier [SoundBox.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/SoundBox/FR/SoundBox.js) :

   ```javascript

   let applyChanges = false;
   new Dialog({
     title: `SoundBox`,
     content: `
       <form>
         <div class="form-group">
           <label>Choose category:</label>
             <select id="dropDown" onchange="SoundBox()">
               <option value="1" id="playlist-1" selected="selected">Playlist 1</option>
               <option value="2" id="playlist-2">Playlist 2</option>
               <option value="3" id="playlist-3">Playlist 3</option>
             </select>
         </div>
         <div class="form-group">
           <label>Choose song:</label>
             <select id="playlist-content-1" name="selected-playlist">
               <option value="sounds/dice.wav">Dice</option>
               <option value="sounds/lock.wav">Door</option>
               <option value="sounds/drums.wav">Drums</option>
               <option value="sounds/notify.wav">Notify</option>
             </select>
             <select id="playlist-content-2" style="display: none;">
               <option value="sounds/lock.wav">Lock</option>
               <option value="sounds/dice.wav">Dice</option>
               <option value="sounds/notify.wav">Notify</option>
               <option value="sounds/drums.wav">Drums</option>
             </select>
             <select id="playlist-content-3" style="display: none;">
               <option value="sounds/notify.wav">Notify</option>
               <option value="sounds/drums.wav">Drums</option>
               <option value="sounds/lock.wav">Door</option>
               <option value="sounds/dice.wav">Dice</option>
             </select>
        </div>
        <div class="form-group">
           <label for="vol">Volume:</label>
              <div class="form-fields">
               <input type="range" id="vol" name="vol" min="0" max="8" value="1" step="0.2" data-dtype="Number">
               <span class="range-value" id="demo">1</span>
              </div>
           </div>
    </form>
   <script>
   var slider = document.getElementById("vol");
   var output = document.getElementById("demo");
   output.innerHTML = slider.value;
   slider.oninput = function() {output.innerHTML = this.value;}
     var dropDown = document.getElementById("dropDown"),
       myPlaylists = [
         document.getElementById("playlist-content-1"),
         document.getElementById("playlist-content-2"),
         document.getElementById("playlist-content-3")
       ];
     function SoundBox() {
       for (i = 0; i < myPlaylists.length; i++) {
         if (dropDown.value === "1") {
           myPlaylists[i].style.display = "none";
           myPlaylists[i].removeAttribute("name", "selected-playlist");
           myPlaylists[1].style.display = "flex";
           myPlaylists[1].setAttribute("name", "selected-playlist");
         } else if (dropDown.value === "2") {
           myPlaylists[i].style.display = "none";
           myPlaylists[i].removeAttribute("name", "selected-playlist");
           myPlaylists[2].style.display = "flex";
           myPlaylists[2].setAttribute("name", "selected-playlist");
         } else if (dropDown.value === "3") {
           myPlaylists[i].style.display = "none";
           myPlaylists[i].removeAttribute("name", "selected-playlist");
           myPlaylists[3].style.display = "flex";
           myPlaylists[3].setAttribute("name", "selected-playlist");
         }
       }
     }
   </script>
             `,
     buttons: {
       yes: {
         icon: "<i class='fas fa-check'></i>",
         label: `Apply`,
         callback: () => applyChanges = true
       },
       no: {
         icon: "<i class='fas fa-times'></i>",
         label: `Cancel`
       },
     },
     default: "yes",
     close: html => {
       if (applyChanges) {
           let canzone = html.find('[name="selected-playlist"]')[0].value || "none";
         let vol1 = html.find('[name="vol"]')[0].value || "none";
         AudioHelper.play({ src: canzone, volume: vol1, autoplay: true, loop: false }, true);
       }
     }
   }).render(true);

   ```

   *[SoundBox.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/SoundBox/FR/SoundBox.js)*

2. Allez maintenant sur FoundryVTT puis cliquez sur un emplacement libre de la barre de macros afin d'en créer une nouvelle.

3. Sélectionnez le type "Script" puis collez le code à l'intérieur.

4. Donnez-lui le nom de votre choix, par exemple : ``` SoundBox ``` et sauvegardez la macro.

## Configuration

Vous pouvez paramétrer la macro de telle façon à gérer vos sons dans plusieurs playlists définies. Vos sons sont ainsi contenus dans plusieurs playlists différentes.
Par défaut, la macro dispose de 3 playlists contenant 4 sons.

### Renommer une playlist

   Pour renommer une playlist, il vous suffit de changer son nom qui est contenu les premières lignes options de la macro.
   Si nous prenons comme exemple la première playlist, cette ligne devrait correspondre à ça :

   ```javascript

   <option value="3" id="playlist-3">Playlist 3</option>

   ```

   Il vous suffit alors de remplacer ``` Playlist 3 ``` par le nom de votre choix, par exemple ``` Bruits de monstres ```

   ```javascript

   <option value="3" id="playlist-3">Bruits de monstres</option>

   ```

### Ajouter une playlist

1. Ajouter une nouvelle option de playlist

   Pour ajouter une ajouter une nouvelle playlist, vous devrez dans un premier temps copier-coller une nouvelle ligne option comme ci-dessous après un retour à la ligne dans la partie catégorie :

   ```javascript

   <option value="3" id="playlist-3">Playlist 3</option>

   ```

   Vous devrez ensuite lui donner une nouvelle valeur, un nouvel ID et là renommer, évitez tout espaces et caractères spéciaux pour le nouvel ID. En gardant notre exemple donné ci-dessus, cette nouvelle ligne devrait alors ressembler à ça :

   ```javascript

   <option value="4" id="playlist-4">Playlist 4</option>

   ```

2. Ajouter une nouvelle liste de sons

   Il vous sera ensuite nécessaire de créer votre nouvelle liste de sons, vous devrez alors copier-coller un nouveau bloc-sélection comme ci-dessous après un retour à la ligne :

   ```javascript

   <select id="playlist-content-3" style="display: none;">
     <option value="sounds/lock.wav">Lock</option>
     <option value="sounds/dice.wav">Dice</option>
     <option value="sounds/notify.wav">Notify</option>
     <option value="sounds/drums.wav">Drums</option>
   </select>

   ```

   Vous devriez alors obtenir quelque chose comme ça après avoir renommé son ID. Dans cet exemple nous avons renommé ``` id="playlist-content-3" ``` en ``` id="playlist-content-4" ``` :

   ```javascript

   <select id="playlist-content-4" style="display: none;">
     <option value="sounds/lock.wav">Lock</option>
     <option value="sounds/dice.wav">Dice</option>
     <option value="sounds/notify.wav">Notify</option>
     <option value="sounds/drums.wav">Drums</option>
   </select>

   ```

3. Automatiser la liste déroulante

   Pour terminer, vous devrez ajouter un second bloc de liste déroulante afin d'automatiser le script le script permettant de faire jouer un son. Ainsi, un peu plus bas dans le code, vous trouverez la ligne suivante à copier-coller dans une nouvelle ligne :

   ```javascript

      } else if (dropDown.value === "3") {
    myPlaylists[i].style.display = "none";
    myPlaylists[i].removeAttribute("name", "selected-playlist");
    myPlaylists[3].style.display = "flex";
    myPlaylists[3].setAttribute("name", "selected-playlist");

   ```

   Vous devrez ensuite changer la la valeur de ``` dropDown.value ``` et ``` myPlaylists ``` à par exemple 4 pour une quatrième playlist  :

   ```javascript

      } else if (dropDown.value === "4") {
    myPlaylists[i].style.display = "none";
    myPlaylists[i].removeAttribute("name", "selected-playlist");
    myPlaylists[4].style.display = "flex";
    myPlaylists[4].setAttribute("name", "selected-playlist");

   ```

### Ajouter des sons

Des sons systèmes sont installés par défaut à titre d'exemple. Si vous souhaitez ajouter vos propres sons, vous devrez vous y prendre comme ci-dessous :

1. Ajouter une nouvelle ligne option :

   Ajouter une nouvelle ligne option vous permettra de rajouter un son dans la playlist en question.
   Pour rajouter une option supplémentaire, copiez simplement une ligne option comme celle-ci : ``` <option value="sounds/lock.wav">Lock</option> ``` puis collez là après un retour à la ligne dans la playlist de votre choix.

2. Choisir le son à faire jouer :

