class StatusbarCoins extends DrawableObject {
    x = 220;
    y = 280;
    height = 150;
    width = 100;
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    coins = 0;

    /**
     * Initializes a new instance of an object, setting its position, size, and initial coin count.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setCoins(0);
    }

    /**
     * Sets the number of coins for the object and updates the displayed image based on the current coin count.
     */
    setCoins(coins) {
        this.coins = coins;
        let path = this.IMAGES[this.resolveImageIndex(coins)];
        this.img = this.imageCache[path];
    }
}