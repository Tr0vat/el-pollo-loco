let level1;

/**
 * Initializes the game level by hiding the start screen and setting up various game elements, including enemies, clouds, background objects, coins, and salsa bottles.
 */
function initLevel(){

    document.getElementById('start-screen').classList.add('d-none');

level1 = new Level(
        [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        ],
    
        [
        new Cloud(0),
        new Cloud(500),
        new Cloud(1000),
        new Cloud(1500),
        new Cloud(2000),
        new Cloud(2500),
        new Cloud(3000),
        new Cloud(3500),
        new Cloud(4000),
        new Cloud(4500),
        new Cloud(5000),
        ],
    
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
    
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
    
            new BackgroundObject('img/5_background/layers/air.png', 719*2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/air.png', 719*3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3), 
    
            new BackgroundObject('img/5_background/layers/air.png', 719*4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/air.png', 719*5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),
    
            new BackgroundObject('img/5_background/layers/air.png', 719*6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),
            new BackgroundObject('img/5_background/layers/air.png', 719*7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*7),
        ],
    
        (function() {
            let coins = [];
    
            for (let i = 0; i < 10; i++) {
                let x = 350 + i * 350;
                let y = 100 + Math.random() * 150;
                coins.push(new coin(x, y));
            }
            
            let angleStep = Math.PI / 10;
    
            for (let i = 0; i < 10; i++) {
                const x = 2400 + 200 * Math.cos(i * angleStep);
                const y = 250 - 200 * Math.sin(i * angleStep);
                coins.push(new coin(x, y));
            }
    
            return coins;
        })(),
        
        [
            new salsabottle(),
            new salsabottle(),
            new salsabottle(),
        ]
    )
}         