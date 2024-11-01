class StatusbarBottles extends DrawableObject {
    x = 220;
    y = 280;
    height = 150;
    width = 100;
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    bottles = 3;

    /**
     * Initializes a new instance of an object, setting its position, size, and the number of bottles.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setBottles(3);
    }

    /**
     * Initializes a new instance of an object, setting its position, size, and the number of bottles.
     */
    setBottles(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES[this.resolveImageIndex(bottles)];
        this.img = this.imageCache[path];
    }
}