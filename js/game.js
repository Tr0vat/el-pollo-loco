let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game environment by setting up the level, displaying elements,
 * and initializing the game world.
 */
function init(){
   initLevel();
   document.getElementById('game-container').classList.add('d-block');
   canvas = document.getElementById('canvas');
   world = new World(canvas, keyboard);
   document.getElementById('btn-description-container').classList.add('d-block');
}

/**
 * Toggles the mute state of the game and updates the mute button's focus state.
 */
function muteGame() {
   world.isMuted = !world.isMuted;
   if (world.isMuted) {
      mute();
   } else {
      unmute();
   }
   document.getElementById('btn-mute').blur();
}

/**
 * Mutes all game sounds and updates the mute button icon.
 */
function mute(){
   world.soundtrack.volume = 0;
   world.bottle_sound.volume = 0;
   world.collect_sound.volume = 0;
   world.chicken_hit_sound.volume = 0;
   world.character.walking_sound.volume = 0;
   world.character.jumping_sound.volume = 0;
   document.getElementById('btn-mute').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#802000cc"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>';
}

/**
 * Unmutes all game sounds and updates the mute button icon.
 */
function unmute(){
   world.soundtrack.volume = 0.2;
   world.bottle_sound.volume = 0.8;
   world.collect_sound.volume = 0.8;
   world.chicken_hit_sound.volume = 0.6;
   world.character.walking_sound.volume = 1;
   world.character.jumping_sound.volume = 1;
   document.getElementById('btn-mute').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#802000cc"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>';

}

/**
 * Displays the game menu and hides the game elements.
 */
function gameMenu(){
   document.getElementById('game-container').classList.remove('d-block');
   document.getElementById('btn-description-container').classList.remove('d-block');
   document.getElementById('start-screen').classList.remove('d-none');
   world.soundtrack.volume = 0;
}

/**
 * Handles keyboard input by setting the corresponding direction or action in the `keyboard` object.
 */
window.addEventListener("keydown", (e) => {
 if (e.keyCode == 39) {
    keyboard.RIGHT = true;
 }
 if (e.keyCode == 37) {
    keyboard.LEFT = true;
 }
 if (e.keyCode == 38) {
    keyboard.UP = true;
 }
 if (e.keyCode == 40) {
    keyboard.DOWN = true;
 }
 if (e.keyCode == 32) {
    keyboard.SPACE = true;
 }
 if (e.keyCode == 68) {
    keyboard.D = true;
 }
});

/**
 * Handles keyboard input by resetting the corresponding direction or action in the `keyboard` object when a key is released.
 */
window.addEventListener("keyup", (e) => {
 if (e.keyCode == 39) {
    keyboard.RIGHT = false;
 }
 if (e.keyCode == 37) {
    keyboard.LEFT = false;
 }
 if (e.keyCode == 38) {
    keyboard.UP = false;
 }
 if (e.keyCode == 40) {
    keyboard.DOWN = false;
 }
 if (e.keyCode == 32) {
    keyboard.SPACE = false;
 }
 if (e.keyCode == 68) {
    keyboard.D= false;
 }
});