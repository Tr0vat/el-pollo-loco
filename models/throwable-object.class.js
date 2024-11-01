class ThrowableObject extends MovableObject{
    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Initializes a new instance of a throwable bottle object, setting its position, size, and animations.
     */
    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.throw();
        this.animate();
        this.hasCollided = false;
    }

    /**
     * Initiates the bottle's throw action by setting its horizontal and vertical speed
     * and applying gravity to simulate a realistic trajectory.
     */
    throw() {
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
    }

    /**
     * Plays an animation sequence using a specified array of images.
     */
    playAnimation(images){
        super.playAnimation(images);
    }

    /**
     * Animates the bottle's movement and splash sequence based on its state.
     */
    animate() {
        setInterval(() => {
            if (this.isActive && this.isAboveGround()) {
                this.x += 10;
                this.playAnimation(this.IMAGES);
            } else if (!this.isActive) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                if (this.currentImage >= this.IMAGES_BOTTLE_SPLASH.length) {
                    this.isActive = null;
                }
            }
        }, 50);
    }
}