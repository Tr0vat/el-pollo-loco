class Character extends MovableObject {
    x = 120;
    y = 80;
    speed = 10;
    height = 250;
    width = 150;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    movement = 0;
    offset = {
        top: 120,
        bottom: 30,
        left: 40,
        right: 30,
    }
    isJumpingAnimationPlaying = false; 

    /**
     * Initializes a new character object, loading its images, applying gravity, and starting its animations.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts the animation of the character by setting up multiple intervals that control different aspects of the character's behavior.
     */
    animate() {
        this.characterFirstInterval();
        this.characterSecondInterval();
        this.characterThirdInterval();
    }

    /**
     * Sets up an interval that handles the character's movement and camera adjustments based on user input.
     * This interval runs at 60 frames per second.
     */
    characterFirstInterval(){
        setInterval(() => {
            this.walking_sound.pause();
            this.jumping_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.characterMoveRight();
            } else if (this.world.keyboard.LEFT && this.x > 0) {
                this.characterMoveLeft();
            } else if (this.world.keyboard.D) {
                this.movement = 0;
            } else {
                this.movement += 1 / (1000 / 60);
            } if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.characterJump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }
    
    /**
     * Sets up an interval that handles the character's animations based on its current state, such as being dead, hurt, jumping, or walking.
     * This interval runs every 50 milliseconds.
     */
    characterSecondInterval(){
        setInterval(() => {
            if (this.isDead()) {
                this.characterDead();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.characterJumpAnimation();
            }  else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.movement < 15) {
                this.img = this.imageCache[this.IMAGES_IDLE[0]];
            }
        }, 50);
    }

    /**
     * Sets up an interval that handles the character's idle animations based on its movement value, switching between idle and long idle animations.
     * This interval runs every 300 milliseconds.
     */
    characterThirdInterval(){
        setInterval(() => {
            if (this.movement >= 45) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else if (this.movement >= 15) {
                this.playAnimation(this.IMAGES_IDLE);
            } 
        }, 300);
    }

    /**
     * Moves the character to the right, updates its direction, plays the walking sound, and resets the movement value.
     */
    characterMoveRight(){
        this.moveRight();
        this.otherDirection = false;  
        this.walking_sound.play();
        this.movement = 0;
    }

    /**
     * Moves the character to the left, updates its direction, plays the walking sound, and resets the movement value.
     */
    characterMoveLeft(){
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
        this.movement = 0;
    }

    /**
     * Initiates the character's jump, plays the jumping sound, and updates movement and animation states.
     */
    characterJump(){
        this.jump();
        this.movement = 0;
        this.jumping_sound.play();
        this.isJumpingAnimationPlaying = true; 
    }

    /**
     * Handles the character's death state by playing the death animation, stopping all game intervals, and triggering the game over state.
     */
    characterDead(){
        this.playAnimation(this.IMAGES_DEAD);
        this.world.clearAllIntervals();
        this.world.gameOver();
    }

    /**
     * Handles the character's jumping animation by toggling the animation state based on whether the jumping animation is already playing.
     */
    characterJumpAnimation(){
        if (!this.isJumpingAnimationPlaying) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.isJumpingAnimationPlaying = true;
        } else {
            this.isJumpingAnimationPlaying = false;
        }
    }
    
    /**
     * Handles the interaction when the character jumps on an enemy. The method checks if the character is colliding from the top with the enemy,
     * applies damage to the enemy, makes the character jump, and returns true if the interaction was successful.
     */
    jumpOnEnemy(enemy) {
        if (this.isCollidingFromTop(enemy)) {
            enemy.hitEnemy();
            this.jump();
            return true;
        }
    }

    /**
     * Checks if the character is colliding with the enemy from the top.
     * This is used to determine if the character has landed on the enemy and can perform actions such as damaging the enemy.
     */
    isCollidingFromTop(enemy) {
        return this.isColliding(enemy) && this.speedY < 0 &&
        (this.y + this.height) <= (enemy.y + enemy.height) &&
        (this.y + this.height) >= enemy.y &&
        this.x + this.width*2 >= enemy.x + enemy.width;
    }
}