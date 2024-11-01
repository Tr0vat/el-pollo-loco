class smallChicken extends MovableObject {
    y = 380;
    height = 40;
    width = 40;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    imgDead = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    }

    /**
    * Creates an instance of a `smallChicken` object.
    */
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.getNewPosition();
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.onCollisionCourse = true; 
    }

    /**
     * Calculates and returns a new random position within predefined areas for the chicken.
     */
    getNewPosition() {
        const numberOfAreas = 5;
        const areaWidth = 4000 / numberOfAreas;
        const areaStart = Math.floor(Math.random() * numberOfAreas) * areaWidth;
        let position = areaStart + Math.random() * areaWidth;
        if (position > 300) {
            return position;
        }
    }

    /**
     * Starts the animation loop for the enemy character. First interval updates the enemy's horizontal position by moving it to the left.
     * Second interval updates the enemy's appearance based on its state (dead or walking).
     */
    animate(){
        setInterval(() => {
            if (!this.isEnemyDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isEnemyDead()) {
                this.loadImage(this.imgDead);
                this.applyGravity();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}
