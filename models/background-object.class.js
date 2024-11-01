class BackgroundObject extends MovableObject{
    height = 480;
    width = 720;

    /**
     * Initializes a new instance of an object with a specified image and position.
     */
    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }

}