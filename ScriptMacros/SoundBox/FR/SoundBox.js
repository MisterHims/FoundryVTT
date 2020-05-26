let applyChanges = false;

new Dialog({
  title: `SoundBox`,
  content: `
    <form>
<label>Choose category:</label>
<select id="dropDown" onchange="SoundBox()">
 <option value="1" id="playlist-1" selected="selected">Playlist 1</option>
 <option value="2" id="playlist-2">Playlist 2</option>
 <option value="3" id="playlist-3">Playlist 3</option>
</select>

      <div class="form-group" id="playlist-content-1">
        <label>Choose song:</label>
        <select id="dropDown" onchange="SoundBox()">
          <option value="sounds/dice.wav">Playlist 1 - Song 1</option>
          <option value="sounds/lock.wav">Playlist 1 - Song 2</option>
          <option value="sounds/drums.wav">Playlist 1 - Song 3</option>
          <option value="sounds/notify.wav">Playlist 1 - Song 4</option>
        </select>
      </div>

      <div class="form-group" id="playlist-content-2" style="display: none;">
        <label>Choose song:</label>
        <select>
          <option value="sounds/dice.wav">Playlist 2 - Song 1</option>
          <option value="sounds/lock.wav">Playlist 2 - Song 2</option>
          <option value="sounds/drums.wav">Playlist 2 - Song 3</option>
          <option value="sounds/notify.wav">Playlist 2 - Song 4</option>
        </select>
      </div>

      <div class="form-group" id="playlist-content-3" style="display: none;">
        <label>Choose song:</label>
        <select>
          <option value="sounds/dice.wav">Playlist 3 - Song 1</option>
          <option value="sounds/lock.wav">Playlist 3 - Song 2</option>
          <option value="sounds/drums.wav">Playlist 3 - Song 3</option>
          <option value="sounds/notify.wav">Playlist 3 - Song 4</option>
        </select>
      </div>
 </form> 

         <div class="form-group">
        <label for="vol">Volume:</label>
           <div class="form-fields">
            <input type="range" id="vol" name="vol" min="0" max="8" value="1" step="0.2" data-dtype="Number">
            <span class="range-value" id="demo">1</span>
           </div>
        </div>

<script>
var slider = document.getElementById("vol");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
  let dropDown = document.getElementById("dropDown"),
    myPlaylists = [
      document.getElementById("playlist-content-1"),
      document.getElementById("playlist-content-2"),
      document.getElementById("playlist-content-3")
    ];
  function SoundBox() {
    for (i = 0; i < myPlaylists.length; i++) {
      if (dropDown.value === "1") {
        myPlaylists[i].style.display = "none";
        myPlaylists[0].style.display = "block";
      } else if (dropDown.value === "2") {
        myPlaylists[i].style.display = "none";
        myPlaylists[1].style.display = "block";
      } else if (dropDown.value === "3") {
        myPlaylists[i].style.display = "none";
        myPlaylists[2].style.display = "block";
      }
    }
  }
</script>
          `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Changes`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      let canzone = html.find('[name="idcanzone"]')[0].value || "none";
      let vol1 = html.find('[name="vol"]')[0].value || "none";
      AudioHelper.play({ src: canzone, volume: vol1, autoplay: true, loop: false }, true);
    }
  }
}).render(true);