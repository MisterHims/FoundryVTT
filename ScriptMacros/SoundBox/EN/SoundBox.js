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
            <option value="4" id="playlist-4">Playlist 4</option>
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
          <select id="playlist-content-4" style="display: none;">
            <option value="sounds/lock.wav">Lock</option>
            <option value="sounds/dice.wav">Dice</option>
            <option value="sounds/notify.wav">Notify</option>
            <option value="sounds/drums.wav">Drums</option>
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
      document.getElementById("playlist-content-3"),
      document.getElementById("playlist-content-4"),
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
      } else if (dropDown.value === "4") {
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