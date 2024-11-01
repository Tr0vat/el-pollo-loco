class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 60;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imgDead = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    offset = {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15,
    }

    /**
     * Creates an instance of the enemy character with initial properties and animation.
     */
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.getNewPosition();
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.onCollisionCourse = true; 
    }

    /**
     * Generates a new random position for the enemy within a specific range.
     */
    getNewPosition() {
        let position = 500 + Math.random() * 3000;
        if (position > 300) {
            return position;
        }
    }

    /**
 * Starts the animation loops for the enemy character. 
 * First interval moves the enemy to the left if the enemy is not dead. 
 * Second interval handles the animation of the enemy (dead or walking).
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