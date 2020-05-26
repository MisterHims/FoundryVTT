# SoundBox

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: Rockshow, MisterHims, Foundry VTT Community
* **Traduction**: MisterHims
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [The Furnace](https://github.com/kakaroto/fvtt-module-furnace)

## Description

SoundBox is a macro that allows you to display a sound box. You can play a sound from a selection and then adjust its volume. It is particularly useful when you don't want to use the JukeBox integrated into FoundryVTT and when you want to play sound effects or small ambient sounds for exemple.

![SoundBox-Demonstration](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/SoundBox/EN/images/dem_01.gif)

## Installation

1. Copy the code below or access it from [SoundBox.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/SoundBox/EN/SoundBox.js) :

   ```js

   let applyChanges = false;
   new Dialog({
     title: `SoundBox`,
     content: `
       <form>
         <div class="form-group">
           <label>Choose category</label>
             <select id="dropDown" onchange="SoundBox()">
               <option value="1" id="playlist-1" selected="selected">Playlist 1</option>
               <option value="2" id="playlist-2">Playlist 2</option>
               <option value="3" id="playlist-3">Playlist 3</option>
             </select>
         </div>
         <div class="form-group">
           <label>Choose song</label>
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
           <label for="vol">Volume</label>
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
           myPlaylists[0].style.display = "flex";
           myPlaylists[0].setAttribute("name", "selected-playlist");
         } else if (dropDown.value === "2") {
           myPlaylists[i].style.display = "none";
           myPlaylists[i].removeAttribute("name", "selected-playlist");
           myPlaylists[1].style.display = "flex";
           myPlaylists[1].setAttribute("name", "selected-playlist");
         } else if (dropDown.value === "3") {
           myPlaylists[i].style.display = "none";
           myPlaylists[i].removeAttribute("name", "selected-playlist");
           myPlaylists[2].style.display = "flex";
           myPlaylists[2].setAttribute("name", "selected-playlist");
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

   *[SoundBox.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/SoundBox/EN/SoundBox.js)*

2. Now go to FoundryVTT then click on an empty place in the macro bar to create a new one.

3. Select type "Script" then paste the code inside.

4. Give it the name of your choice, for example: ``` SoundBox ``` and save the macro.

## Configuration

You can configure the macro to manage your sounds in multiple defined playlists. Your sounds are contained in different playlists. By default, the macro has 3 playlists containing 4 sounds.

### Rename a playlist

   To rename a playlist, you just have to change its name which is contained in the first lines of the macro options. If we take the first playlist as an example, this line should correspond to this:

   ```html

   <option value="3" id="playlist-3">Playlist 3</option>

   ```

   You just need to replace ``` Playlist 3 ``` by the name of your choice, for example ``` Sounds of monsters ```

   ```html

   <option value="3" id="playlist-3">Sounds of monsters</option>

   ```

### Add a new playlist

1. Add a new playlist option

   To add an add a new playlist, you will first have to copy and paste a new line option as below after a line break in the category part:

   ```html

   <option value="3" id="playlist-3">Playlist 3</option>

   ```

   Then you need to give it a new value, a new ID and rename it, avoid any spaces and special characters for the new ID. Keeping our example given above, this new line should look like this:

   ```html

   <option value="4" id="playlist-4">Playlist 4</option>

   ```

2. Add a new list of sounds

   Then create your new list of sounds, you will then have to copy and paste a new selection block as below after a line break:

   ```html

   <select id="playlist-content-3" style="display: none;">
     <option value="sounds/lock.wav">Lock</option>
     <option value="sounds/dice.wav">Dice</option>
     <option value="sounds/notify.wav">Notify</option>
     <option value="sounds/drums.wav">Drums</option>
   </select>

   ```

   You should then get something like that after renaming its ID. In this example we have renamed ``` id="playlist-content-3" ``` to ``` id="playlist-content-4" ``` :

   ```html

   <select id="playlist-content-4" style="display: none;">
     <option value="sounds/lock.wav">Lock</option>
     <option value="sounds/dice.wav">Dice</option>
     <option value="sounds/notify.wav">Notify</option>
     <option value="sounds/drums.wav">Drums</option>
   </select>

   ```

3. Automate drop-down list

   You have one last step to automate the script for managing your playlist sounds.
   You must then add your new playlist in myPlaylists, for this proceed as follows:

   ```js

    myPlaylists = [
      document.getElementById("playlist-content-1"),
      document.getElementById("playlist-content-2"),
      document.getElementById("playlist-content-3")
    ];

   ```

   Then would become as below (don't forget the new comma at the end of the line of the previous playlist):

   ```js

    myPlaylists = [
      document.getElementById("playlist-content-1"),
      document.getElementById("playlist-content-2"),
      document.getElementById("playlist-content-3"),
      document.getElementById("playlist-content-4")
    ];

   ```
  
   You must then add a second drop-down list block. So, a little further down in the code, you will find the following line to copy and paste into a new line:

   ```js

      } else if (dropDown.value === "3") {
    myPlaylists[i].style.display = "none";
    myPlaylists[i].removeAttribute("name", "selected-playlist");
    myPlaylists[3].style.display = "flex";
    myPlaylists[3].setAttribute("name", "selected-playlist");

   ```

   You will then need to change the value from ``` dropDown.value ``` at 4 and the value from ``` myPlaylists ``` at 3 for a fourth playlist. Perform the same process by adding +1 to the values ​​for a fifth playlist, etc.:

   ```js

      } else if (dropDown.value === "4") {
    myPlaylists[i].style.display = "none";
    myPlaylists[i].removeAttribute("name", "selected-playlist");
    myPlaylists[4].style.display = "flex";
    myPlaylists[4].setAttribute("name", "selected-playlist");

   ```

### Add new sounds

Some system sounds are installed by default as an example. If you want to add your own sounds, you will have to do it as below:

1. Add a new option line

   Adding a new option line allow you to add a sound to the playlist. To add an additional option, simply copy an option line like this: ``` <option value="sounds/drums.wav">Drums</option> ``` then paste it after a line break in the playlist of your choice.

2. Select the sound to play

   To choose the sound to play when you select the option from the drop-down menu (the option called Drums in the example above), you will simply have to change its path to the new audio file. The path is between the quotes just after ``` value= ```

   Par exemple :

   ```js

   <option value="my-path/audio-file.wav">Drums</option>

   ```
