class CollectableObject extends MovableObject{

    /**
     * Initializes a new instance of an object with a specified image and sets its collision course status.
     */
    constructor(){
        super()
        this.onCollisionCourse = true; 
    }

    /**
     * Triggers the collection behavior of the object, which includes applying gravity to it.
     */
    collect(){
        this.applyGravity()
    }

    /**
     * Applies gravity to the object by continuously adjusting its vertical position and speed.
     */
    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }
}