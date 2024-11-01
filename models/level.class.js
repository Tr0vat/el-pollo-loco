class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    salsabottles;
    level_end_x = 5000;

    /**
     * Initializes a new level instance with specified game objects, including enemies, clouds, background objects, coins, and salsa bottles.
     *
     * @constructor
     * @param {Array} enemies - An array of enemy objects present in the level.
     * @param {Array} clouds - An array of cloud objects present in the level.
     * @param {Array} backgroundObjects - An array of background objects present in the level.
     * @param {Array} coins - An array of coin objects that can be collected in the level.
     * @param {Array} salsabottles - An array of salsa bottle objects that can be collected in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, salsabottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.salsabottles = salsabottles;
    }
}