class StatusbarEndboss extends DrawableObject{
    x = 220;
    y = 280;
    height = 150;
    width = 100;
    IMAGES =[
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];
    percentage = 25;

    /**
     * Initializes a new instance of a game object, setting its position, size, and initial state.
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 600;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(25);
    }

    /**
     * Determines the image index based on the current percentage value.
     */
    resolveImageIndex(){        
        if(this.percentage === 25){
        return 5;
        } else if(this.percentage >= 20){
            return 4;
        }  else if(this.percentage >= 15){
            return 3;
        }  else if(this.percentage >= 10){
            return 2;
        } else if(this.percentage >= 5){
            return 1;
        } else {
            return 0;
        }
    };
}