class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;

    /**
     * Initializes a new cloud object, setting its initial position and starting its animation.
     */
    constructor(startX){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = startX;
        this.animate();
    }

    /**
     * Starts the animation of the cloud by moving it to the left at a consistent interval.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
    * Moves the cloud object to the left based on its speed. If the cloud moves off the screen (to the left),
    * it resets its position to the right side of the screen to reappear and continue the movement.
    */
    moveLeft() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = 5000;
        }
    }
}