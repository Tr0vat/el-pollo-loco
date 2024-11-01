class coin extends CollectableObject{
    height = 100;
    width = 100;
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Initializes a new coin object, setting its position, loading its images, and starting its animation.
     */
    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Starts the animation of the coin by cycling through a set of images at regular intervals.
     */
    animate(){

        setInterval(() => {
                this.playAnimation(this.IMAGES);
        }, 200);
    }
}

