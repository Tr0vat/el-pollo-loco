class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    enemyEnergy = 100;
    lastHit = 0;
    isActive = true;
    offsetX = 0;
    offsetY = 0; 

    /**
    * Applies gravity to the object, updating its vertical position and speed.
    */
    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Determines if the object is above the ground.
     * It checks if the vertical position (`y`) of the object is less than 180 units. 
     * If the position is below this threshold, it returns `false`, meaning the object is not above the ground.
     */
    isAboveGround(){
        if (this instanceof ThrowableObject || this instanceof  CollectableObject || this instanceof Chicken || this instanceof smallChicken) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Applies damage to the object by reducing its energy.
     * 
     * This method decreases the object's `energy` by the specified `damage` amount. 
     * If the resulting `energy` is less than zero, it is set to zero to prevent negative values.
     * The method also updates the `lastHit` timestamp to the current time, indicating when the object was last damaged.
     */
    hit(damage){
        this.energy -= damage;
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Processes the logic when the enemy is hit.
     * This method sets the enemy's energy to zero an deactivates the enemy.
     * The enemy will no longer be active or able to collide with other objects once this method is called.
     */
    hitEnemy() {
        this.enemyEnergy = 0;
        this.isActive = false;
        this.onCollisionCourse = false;
    }

    /**
     * Determines if the object is currently in a "hurt" state.
     * The method checks if the time elapsed since the last hit is less than 1 second.
     * If the object was hit within the last second, it is considered "hurt".
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * The method checks if the object's energy has been depleted. An object is considered
     * dead if its energy is equal to zero.
     */
    isDead(){
        return this.energy == 0;
    }

    /**
     * The method checks if the enemy's energy has been depleted. An enemy is considered
     * dead if its energy is equal to zero.
     */
    isEnemyDead(){
        return this.enemyEnergy == 0;
    }

    /**
     * Checks if the current object is colliding with another object.
     * The method performs a rectangular collision detection based on the object's dimensions and offset values.
     * It determines if the bounding box of the current object intersects with the bounding box of the given object.
     */
    isColliding (obj) {
        return  this.x + this.width - this.offset.right > obj.x && 
                this.y + this.height - this.offset.bottom > obj.y &&
                this.x + this.offset.left < obj.x + obj.width && 
                this.y + this.offset.top < obj.y + obj.height
    }

    /**
     * Determines if the current object is collecting another object.
     * The method checks if the bounding box of the current object intersects with the bounding box of the target object,
     * considering an adjusted vertical position for the collection process.
     */
    isCollecting(obj){
        let adjustedY = this.y + this.height - 100;
        return  (this.x + this.width) >= obj.x && 
        this.x <= (obj.x + obj.width) && 
        (this.y + this.offsetY + this.height) >= obj.y &&
        adjustedY <= (obj.y + obj.height);
    }

    /**
     * Updates the current image to create an animation effect by cycling through a sequence of images.
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by updating its horizontal position.
     */
    moveRight(){
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by updating its horizontal position.
     */
    moveLeft(){
        this.x -= this.speed;
    }

    /**
     * Initiates a jump by setting the vertical speed of the object.
     */
    jump(){
        this.speedY = 30;
    }
}