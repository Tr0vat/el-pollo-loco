class GameOver extends DrawableObject{
    height = 480;
    width = 720;
    x = 0;
    y = 0;

    /**
    * Creates an instance of the class and loads an image from the specified path.
    */
    constructor(imagePath){
        super().loadImage(imagePath);
    }
}