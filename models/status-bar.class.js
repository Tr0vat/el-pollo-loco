class Statusbar extends DrawableObject {
    x = 220;
    y = 280;
    height = 150;
    width = 100;
    IMAGES =[
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

    /**
     * Initializes a new instance of an object, setting its position, size, and initial percentage.
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Determines the appropriate image index based on the current percentage value.
     */
    resolveImageIndex(){        
        if(this.percentage == 100){
        return 5;
        } else if(this.percentage > 80){
            return 4;
        }  else if(this.percentage > 60){
            return 3;
        }  else if(this.percentage > 40){
            return 2;
        } else if(this.percentage > 20){
            return 1;
        } else {
            return 0;
        }
    };
}