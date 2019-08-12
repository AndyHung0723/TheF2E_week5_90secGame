const w = 720;
const h = 540;

// 隨機
const getRandom = (max, min) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// 簡單模式下球的y座標
const getEasyRandomPosY = () =>{
    let exist = [];
    let val = getRandom(10, 1);
    while(exist.length < 5) {
        if(exist.indexOf(val) != -1) {
            val = getRandom(10, 1);
        }else {
            exist.push(val);
        }
    }
    return exist;
};



const gameStart = {
    key: 'gameStart',
    preload: function(){
        // 載入圖片
        this.load.image('bg', './img/bg.svg');
        this.load.image('ball_1', './img/Ball_01.svg');
        this.load.image('ball_2', './img/Ball_02.svg');
        this.load.image('ball_3', './img/Ball_03.svg');
        //this.load.image('ball_4', '../img/Ball_04.svg');
        this.load.image('ball_5', './img/Ball_05.svg');
        this.load.image('duck', './img/duck_normal_03.svg');
        this.load.image('boss', './img/Boss_01.svg');
        this.load.image('star', './img/SuperStar.svg');
        this.load.image('btn', './img/btn_start_off.svg');
    },
    create: function(){
        // 把圖片放到畫面上
        this.bg = this.add.tileSprite(w/2, h/2, 1200, 900 ,'bg');
        this.bg.setScale(0.6);
        this.ball_1 = this.add.image(w-180, h/2+120, 'ball_1'); 
        this.ball_1.setScale(0.6);
        this.ball_2 = this.add.image(180, h-80, 'ball_2');
        this.ball_2.setScale(0.6);
        this.ball_3 = this.add.image(w-300, h-50, 'ball_3'); 
        this.ball_3.setScale(0.6);
        this.ball_5 = this.add.image(w/2-120, h/2+80, 'ball_5'); 
        this.ball_5.setScale(0.6);
        this.duck = this.add.image(w/2, h/2+100, 'duck'); 
        this.duck.setScale(0.6);
        this.boss = this.add.image(w/3, h/3-50, 'boss'); 
        this.boss.setScale(0.6);
        this.star = this.add.image(w/2+130, h/2+10, 'star'); 
        this.star.setScale(0.6);
        this.btn = this.add.image(w/2+120, h/3, 'btn'); 
        this.btn.setScale(0.8); 
        this.btn.setInteractive();
        this.btn.on('pointerdown', () => {
            this.scene.start('gamePlay');
        });
        // 標題
        this.add.text(w-360, h/3-100, '90Sec Game', {color: '#FFF', fontSize: '42px', fontWeight: 'bold'});
        // 按鈕文字
        this.add.text(w/2+85, h/3-15, 'Start', {color: '#FFF', fontSize: '25px'});
    },
    update: function(){
        // 背景移動
        this.bg.tilePositionY -= 2;
    }
}

const gamePlay = {
    key: 'gamePlay',
    preload: function(){
        // 載入圖片
        this.load.image('bg', './img/bg.svg');
        this.load.image('ball_1', './img/Ball_01.svg');
        this.load.image('ball_2', './img/Ball_02.svg');
        this.load.image('ball_3', './img/Ball_03.svg');
        this.load.image('ball_4', './img/Ball_04.svg');
        this.load.image('ball_5', './img/Ball_05.svg');
        this.load.image('duck_normal_1', './img/duck_normal_01.svg');
        this.load.image('duck_normal_2', './img/duck_normal_02.svg');
        this.load.image('duck_normal_3', './img/duck_normal_03.svg');
        this.load.image('boss', './img/Boss_01.svg');
        this.load.image('star', './img/SuperStar.svg');
        this.load.image('btn', './img/btn_start_off.svg');
    },
    create: function(){
        // 設定鴨子移動邊界
        this.physics.world.setBounds(100, h-200, w-200, 200);
        // 把圖片放到畫面上
        // 一格 90*90
        this.bg = this.add.tileSprite(w/2, h/2, 1200, 900 ,'bg');
        this.bg.setScale(0.6); 
        this.duck = this.physics.add.sprite(w/2, h-90, 'duck_normal_1');
        this.duck.setScale(0.6);
        this.duck.setCollideWorldBounds(true);
        // 設定鴨子動畫
        this.anims.create({
            key: 'swim',
            frames: [
                { key: 'duck_normal_1' },
                { key: 'duck_normal_2' },
                { key: 'duck_normal_3' }
            ],
            frameRate: 3,
            repeat: -1
        });
        this.duck.anims.play('swim', true);
        // 設定球座標：簡單
        this.easyY = getEasyRandomPosY();
        this.easyY_exist = [];
        this.ball_1 = this.add.sprite(w/2, -90*this.easyY[0], 'ball_1');
        this.ball_2 = this.add.sprite(w/2-104, -90*this.easyY[1], 'ball_2');
        this.ball_3 = this.add.sprite(w/2-208, -90*this.easyY[2], 'ball_3');
        this.ball_4 = this.add.sprite(w/2+104, -90*this.easyY[3], 'ball_4');
        this.ball_5 = this.add.sprite(w/2+208, -90*this.easyY[4], 'ball_5');
        this.ball_1.setScale(0.6);
        this.ball_2.setScale(0.6);
        this.ball_3.setScale(0.6);
        this.ball_4.setScale(0.6);
        this.ball_5.setScale(0.6);
        
        //this.duck.body.immovable = true;
        //this.duck.body.moves = false;
    },
    update: function(){
        // 背景移動
        this.bg.tilePositionY -= 1.5;
        // 球移動
        this.ball_1.y += 1.5;
        this.ball_2.y += 1.5;
        this.ball_3.y += 1.5;
        this.ball_4.y += 1.5;
        this.ball_5.y += 1.5;
        //this.ball_1.y += 2;
        // 檢測球是否超出邊界
        for (let i = 1; i <= 5; i++) {
            // 簡單
            if(this['ball_' + i].y >= (h+90)) {
                let idx = getRandom(4,0);
                while(this.easyY_exist.indexOf(idx) != -1) {
                    idx = getRandom(4,0);
                }
                this.easyY_exist.push(idx);
                if(this.easyY_exist.length >= 5) {
                    this.easyY_exist = [];
                }
                this['ball_' + i].y = (-90*this.easyY[idx]);
            }
        }
        // 操作物件
        const keyboard = this.input.keyboard.createCursorKeys();
        if(keyboard.right.isDown) {
            this.duck.setVelocityX(200);
            this.duck.setVelocityY(0);
        }else if(keyboard.left.isDown){
            this.duck.setVelocityX(-200);
            this.duck.setVelocityY(0);
        }else if(keyboard.up.isDown){
            this.duck.setVelocityX(0);
            this.duck.setVelocityY(-200);
        }else if(keyboard.down.isDown){
            this.duck.setVelocityX(0);
            this.duck.setVelocityY(200);
        }else {
            this.duck.setVelocityX(0);
            this.duck.setVelocityY(0);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: w,
    height: h,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: {
            //     y: 700
            // },
            debug: true
        }
    },
    scene: [gamePlay,gameStart, ]
}
const game = new Phaser.Game(config);