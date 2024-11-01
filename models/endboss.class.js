class Endboss extends MovableObject{
    height = 400;
    width = 250;
    y = 55;
    energy = 25;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    world;
    hadFirstContact = false;

    /**
     * Initializes a new character object with various animations, sets its initial position, and starts its animation cycle.
     */
    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4500;
        this.animate();
    }

    /**
     * Controls the animation and behavior of the endboss based on its current state, checking and adjusting every 150 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.adjustSpeed();
            if (this.isDead()) {
                this.playEndbossDead();
            } else if (this.isHurt()) {
                this.playEndbossHurt();
            } else if (this.world.character.x >= 3700) {
                this.playEndbossAlert();         
            }  else if (this.hadFirstContact) {
                this.playEndbossWalking();
            }  
        }, 150);
    }

    /**
     * Plays the death animation for the endboss and triggers the end of the game after a short delay.
     */
    playEndbossDead(){
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.world.clearAllIntervals();
            this.world.gameWon();
        }, 500);
    }

    /**
     * Plays the hurt animation for the end boss and initiates an attack on the player.
     */
    playEndbossHurt(){
        this.playAnimation(this.IMAGES_HURT);
        this.attackPlayer();
    }

    /**
     * Handles the alert state of the end boss, transitioning it from alert to movement after the first contact with the player.
     */
    playEndbossAlert(){
        if (!this.hadFirstContact) {
            this.playAnimation(this.IMAGES_ALERT);
            this.world.draw();
            setTimeout(() => {
                this.hadFirstContact = true;
            }, 1200);
        } else if (this.hadFirstContact) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }
    }

    /**
     * Plays the walking animation for the end boss and moves it to the left.
     */
    playEndbossWalking(){
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
    }

    /**
     * Moves the end boss towards the player character to simulate an attack.
     */
    attackPlayer() {
        if (this.x > this.world.character.x) {
            this.x -= this.speed * 7;
        }
    }

    /**
     * Adjusts the speed of the end boss based on its current energy level.
     */
    adjustSpeed() {
        if (this.energy < 10) {
            this.speed = 10;
        } else if (this.energy < 20) {
            this.speed = 8
        } else {
            this.speed = 6;
        }
    }
}