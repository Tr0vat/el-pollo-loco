class DrawableObject{
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];
    currentImage = 0;
    percentage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /**
     * Loads an image from a specified path and assigns it to this.img.
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the image on the canvas at the specified coordinates and dimensions.
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a rectangular frame around the object for debugging purposes.
     */
    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof smallChicken || this instanceof CollectableObject || this instanceof ThrowableObject){
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.rect(this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Loads multiple images from an array of image paths and caches them.
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }    
    
    /**
    * Sets the percentage value and updates the corresponding image based on the percentage.
    */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    /**
    * Resolves the image index based on the given amount.
    */
    resolveImageIndex(amount){        
        if(amount >= 5){
        return 5;
        } else if(amount === 4){
            return 4;
        }  else if(amount === 3){
            return 3;
        }  else if(amount === 2){
            return 2;
        } else if(amount === 1){
            return 1;
        } else {
            return 0;
        }
    };
}