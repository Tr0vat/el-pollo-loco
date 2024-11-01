class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();
    throwableObjects = [];
    bottles = 3;
    coins = 0;
    soundtrack = new Audio('audio/soundtrack3.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    collect_sound = new Audio('audio/collect.mp3');
    chicken_hit_sound = new Audio('audio/chicken_hit.mp3');
    isGameOver = false;
    isGameWon = false;
    isMuted = false;
    character = new Character();
    endboss = new Endboss();
    level = level1;
    throwTimeout;
    
    /**
     * Initializes a new game instance, setting up the canvas, keyboard input, sounds, and starting the game loop.
     */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundtrack.volume = 0.2;
        this.bottle_sound.volume = 0.8;
        this.collect_sound.volume = 0.8;
        this.chicken_hit_sound.volume = 0.6;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world reference for the character and endboss objects.
     */
    setWorld(){
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Clears all active intervals in the application.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Manages the game's main loop by repeatedly checking and updating various game states and interactions.
     */
    run(){
        setInterval(() => {
            this.soundtrack.play();
            this.bottle_sound.pause();
            this.collect_sound.pause();
            this.chicken_hit_sound.pause();
            this.checkCollectionCoins();
            this.checkCollisions();
            this.checkCollectionBottles();
            this.checkThrowObjects();
            this.checkHitEnemy();
        }, 150);

        setInterval(() => {
            this.checkCharacterJumpOnEnemy();
        }, 20);
    }

    /**
     * Checks if the character has jumped on any enemies and plays a sound if successful.
     */
    checkCharacterJumpOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            const jumpedOn = this.character.jumpOnEnemy(enemy);
            if (jumpedOn) {
                this.chicken_hit_sound.play();
            }
        });
    }

    /**
     * Checks if the character collects any coins and updates the game state accordingly.
     */
    checkCollectionCoins(){
        this.level.coins = this.level.coins.filter(coin => {
            if(this.character.isCollecting(coin)){
                this.collect_sound.currentTime = 0;
                this.collect_sound.play();
                coin.collect();
                this.coins++;
                this.statusbarCoins.setCoins(this.coins);
                return false;
            }
            return true;
        });
    }

    /**
     * Checks if the character collects any salsa bottles and updates the game state accordingly.
     */
    checkCollectionBottles(){
        this.level.salsabottles = this.level.salsabottles.filter(bottle => {
            if(this.character.isColliding(bottle)  && this.bottles < 5){
                this.collect_sound.currentTime = 0;
                this.collect_sound.play();
                bottle.collect();
                this.bottles++;
                this.statusbarBottles.setBottles(this.bottles);
                return false;
            }
            return true;
        });
    }

    /**
     * Checks if the player is attempting to throw a bottle and handles the throwing action if possible.
     */
    checkThrowObjects(){
        if (this.keyboard.D && this.bottles > 0) {
            if (!this.throwTimeout) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.bottles--;
                this.statusbarBottles.setBottles(this.bottles);
                
                this.throwTimeout = setTimeout(() => {
                    this.throwTimeout = null;
                }, 1000);
            }
        }
    }

    /**
     * Checks for collisions between the character and various enemies, including the end boss.
     */
    checkCollisions(){
        this.collisionWithEnemy();
        this.collisionWithEndboss();
    }

    /**
     * Checks for collisions between the character and enemies, and reduces the character's energy if a collision occurs.
     */
    collisionWithEnemy(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && !this.character.isAboveGround()){
                this.character.hit(5)
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks for a collision between the character and the end boss, and reduces the character's energy if a collision occurs.
     */
    collisionWithEndboss(){
        if (this.character.isColliding(this.endboss)) {
            this.character.hit(15)
            this.statusbar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks if any thrown bottles hit an enemy or the end boss, and handles the corresponding actions.
     */
    checkHitEnemy(){
        this.bottleHitEnemy();
        this.bottleHitEndboss();
    }

    /**
     * Checks if any thrown bottles collide with standard enemies and applies the appropriate actions.
     */
    bottleHitEnemy(){
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if(bottle.isColliding(enemy)){
                    enemy.hitEnemy();
                    bottle.hitEnemy();
                    this.bottle_sound.play();
                    this.chicken_hit_sound.play();
                }
            });
        });
    }

    /**
     * Checks if any thrown bottles collide with the end boss and applies the appropriate actions.
     */
    bottleHitEndboss(){
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.endboss) && !bottle.hasCollided) {
                this.bottle_sound.play();
                this.chicken_hit_sound.play();
                this.endboss.hit(5);
                this.statusbarEndboss.setPercentage(this.endboss.energy);
                bottle.hitEnemy();
                bottle.hasCollided = true;
            }
        });
    }
    
    /**
     * Renders the entire game scene, including the background, status bars, movable objects, collectables, and the end screen.
     * Continuously updates the canvas by recursively calling itself using `requestAnimationFrame`.
     */
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawStatusbars();
        this.drawMovableObjects();
        this.drawCollectables();
        this.ctx.translate(-this.camera_x, 0)
        this.drawStatusbarEndboss();
        this.drawEndscreen();
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    /**
     * Draws the background elements of the game, including background objects and clouds, by adding them to the map.
     */
    drawBackground(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws the various status bars (e.g., health, coins, bottles) on the canvas by adding them to the map.
     */
    drawStatusbars(){
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.statusbar);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws all movable objects in the game, including throwable objects, the end boss, the character, and enemies, by adding them to the map.
     */
    drawMovableObjects(){
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.endboss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * Draws all collectable items in the game, including coins and salsa bottles, by adding them to the map.
     */
    drawCollectables(){
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsabottles);
    }

    /**
     * Draws the status bar for the end boss if the end boss has had its first contact with the player.
     */
    drawStatusbarEndboss(){
        if(this.endboss.hadFirstContact){  
            this.statusbarEndboss.x = this.canvas.width - this.statusbarEndboss.width - 10;
            this.addToMap(this.statusbarEndboss);
        }
    }

    /**
     * Draws the end screen based on the game's outcome, either a game over screen or a victory screen.
     */
    drawEndscreen(){
        if (this.isGameOver) {
            this.addToMap(new GameOver('img/9_intro_outro_screens/game_over/game over.png'));
        } else if (this.isGameWon) {
            this.addToMap(new GameOver('img/9_intro_outro_screens/win/won_2.png'));
        }
    }

    /**
     * Adds an array of objects to the map by iterating through each object and rendering it.
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Renders a single movable object on the canvas, handling image flipping if necessary.
     */
    addToMap(mo){
        if (mo) {
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
    
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
    
            if (mo.otherDirection) {
                this.flipImageBack(mo);
            }
        }
    }

    /**
     * Flips the image of a movable object horizontally by adjusting the canvas context.
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x *-1;
    }

    /**
     * Restores the original orientation of a movable object after its image has been flipped horizontally.
     */
    flipImageBack(mo){
        mo.x = mo.x *-1;
        this.ctx.restore();
    }

    /**
     * Sets the game state to 'game over' and triggers the drawing of the end screen.
     */
    gameOver() {
        this.isGameOver = true; 
        this.drawEndscreen();
    }

    /**
     * Sets the game state to 'game won' and triggers the rendering of the game screen to reflect the victory.
     */
    gameWon(){
        this.isGameWon = true; 
        this.drawEndscreen();
    }
}
